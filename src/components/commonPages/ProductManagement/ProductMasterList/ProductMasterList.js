"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useProductListColumns } from "./hooks/useProductListColumns";
import { ProductCardView } from "./ProductCardView";
import ProductCard from "./ProductCard";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import { useCrudListWithPagination } from "@/hooks/useCrudListWithPagination";
import { toTitleCase } from "@/lib/utils";

const ProductMasterList = () => {
  const [openProductDetailSheet, setOpenProductDetailSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pageInfo, setPageInfo] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const {
    list,
    loading,
    error,
    editData,
    setEditData,
    fetchData,
    fetchById,
    pagination,
  } = useCrudListWithPagination("/api/product-management");

  const rows =
    list?.map((item) => ({
      id: item.id,
      title: item.title,
      product_image: item.product_image,
      design_no: item.design_no,
      category: item.category,
      style: item.style,
      shape: item.shape,
      mrp: item.mrp,
      srp: item.srp,
      collection: item.collection,
      gender: item.gender,
      created_at: item.created_at,
      updated_at: item.updated_at,
    })) ?? [];

  // Filtering (client-side but applied to currently fetched data only)
  const filteredRows = useMemo(() => {
    let data = rows;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (r) =>
          r.category?.toLowerCase().includes(q) ||
          r.design_no?.toLowerCase().includes(q) ||
          r.style?.toLowerCase().includes(q)
      );
    }

    return data;
  }, [rows, searchQuery]);

  const handleView = useCallback(
    async (product) => {
      setSelectedProduct(product);
      setOpenProductDetailSheet(true);
      try {
        const data = await fetchById(product.id);
        setEditData(data?.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    },
    [fetchById, setEditData]
  );

  const handleClose = () => {
    setOpenProductDetailSheet(false);
    setSelectedProduct(null);
  };

  const { columns } = useProductListColumns({ onView: handleView });

  const renderStoreCardsView = (item) => (
    <ProductCard key={item.id} {...item} onClick={() => handleView(item)} />
  );

  if (loading) return <ContentLoader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Dropdown filters (no change)
  const buildFilterOptions = (key, label) => [
    { value: "all", label: `All ${label}` },
    ...new Map(
      list
        ?.filter((item) => item?.[key])
        .map((item) => [
          item[key],
          { value: item[key], label: toTitleCase(item[key]) },
        ])
    ).values(),
  ];

  return (
    <>
      <ListWithCardToggle
        title="Product Master List"
        description="All products available in the store"
        data={filteredRows}
        columns={columns}
        renderCardView={renderStoreCardsView}
        pagination={pageInfo}
        onPaginationChange={(updater) => {
          const newPageInfo =
            typeof updater === "function" ? updater(pageInfo) : updater;
          setPageInfo(newPageInfo);
          fetchData({
            page: newPageInfo.pageIndex + 1,
            pageSize: newPageInfo.pageSize,
            search: searchQuery,
          });
        }}
        pageCount={pagination?.totalPages || 1}
        totalCount={pagination?.total || 0}
        paginationLinks={pagination?.links}
        serverSidePagination
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          fetchData({ search: query });
        }}
        filterDropdownProps={{
          category: {
            value: "",
            options: buildFilterOptions("category", "Categories"),
          },
        }}
      />

      <ProductCardView
        open={openProductDetailSheet}
        closeProductDetailSheet={handleClose}
        product={editData || selectedProduct}
        productId={selectedProduct?.id}
      />
    </>
  );
};

export default ProductMasterList;
