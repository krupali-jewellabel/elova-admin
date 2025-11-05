"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useProductListColumns } from "./hooks/useProductListColumns";
import { ProductCardView } from "./ProductCardView";
import ProductCard from "./ProductCard";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import { useCrudList } from "@/hooks/useCrudList";
import { toTitleCase } from "@/lib/utils";

const ProductMasterList = () => {
  const [openProductDetailSheet, setOpenProductDetailSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pageInfo, setPageInfo] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  // Filters
  const [filters, setFilters] = useState({
    category: "",
    style: "",
    shape: "",
    collection: "",
  });

  const { list, loading, error, editData, setEditData, fetchById, pagination } =
    useCrudList("/api/product-management", {
      page: pageInfo.pageIndex + 1,
      limit: pageInfo.pageSize,
      search: searchQuery,
    });

  // Normalize list data
  const rows = (list?.result?.items || list?.items || list || []).map(
    (item) => ({
      id: item.id,
      title: item.title,
      product_image: item.product_image,
      design_no: item.design_no,
      category: item.category,
      style: item.style,
      shape: item.shape,
      base_price: item.base_price,
      sales_price: item.sales_price,
      collection: item.collection,
      gender: item.gender,
      created_at: item.created_at,
      updated_at: item.updated_at,
    })
  );

  // Filtering logic
  const filteredRows = useMemo(() => {
    let data = rows;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(
        (r) =>
          r.category?.toLowerCase().includes(query) ||
          r.design_no?.toLowerCase().includes(query) ||
          r.style?.toLowerCase().includes(query)
      );
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        data = data.filter(
          (r) => r[key]?.toLowerCase() === value.toLowerCase()
        );
      }
    });

    return data;
  }, [rows, searchQuery, filters]);

  // Helper to build dropdown options dynamically
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

  const handleClose = useCallback(() => {
    setOpenProductDetailSheet(false);
    setSelectedProduct(null);
  }, []);

  const handleSaveEdit = () => setEditingCell(null);

  const { columns } = useProductListColumns({
    handleSaveEdit,
    onView: handleView,
  });

  // Render product cards
  const renderStoreCardsView = (item) => (
    <ProductCard
      key={item.id}
      {...item}
      onClick={() => {
        setSelectedProduct(item);
        setOpenProductDetailSheet(true);
      }}
    />
  );

  if (loading) return <ContentLoader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const filterDropdownProps = {
    category: {
      value: filters.category,
      onChange: (val) =>
        setFilters((prev) => ({ ...prev, category: val === "all" ? "" : val })),
      options: buildFilterOptions("category", "Categories"),
    },
    style: {
      value: filters.style,
      onChange: (val) =>
        setFilters((prev) => ({ ...prev, style: val === "all" ? "" : val })),
      options: buildFilterOptions("style", "Styles"),
    },
    shape: {
      value: filters.shape,
      onChange: (val) =>
        setFilters((prev) => ({ ...prev, shape: val === "all" ? "" : val })),
      options: buildFilterOptions("shape", "Shapes"),
    },
    collection: {
      value: filters.collection,
      onChange: (val) =>
        setFilters((prev) => ({
          ...prev,
          collection: val === "all" ? "" : val,
        })),
      options: buildFilterOptions("collection", "Collections"),
    },
  };

  return (
    <>
      <ListWithCardToggle
        title="Product Master List"
        data={filteredRows}
        columns={columns}
        renderCardView={renderStoreCardsView}
        pagination={pageInfo}
        onPaginationChange={setPageInfo}
        pageCount={pagination?.totalPages}
        totalCount={pagination?.total}
        serverSidePagination
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterDropdownProps={filterDropdownProps}
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
