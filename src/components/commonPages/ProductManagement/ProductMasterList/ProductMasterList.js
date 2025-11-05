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

  // Fetch full list once (client-side)
  const { list, loading, error, editData, setEditData, fetchById } =
    useCrudList("/api/product-management");

  // Normalize list data
  const rows = (list || []).map((item) => ({
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
  }));

  // Filtering (Client-side)
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

  // CLIENT-SIDE PAGINATION
  const start = pageInfo.pageIndex * pageInfo.pageSize;
  const end = start + pageInfo.pageSize;
  const paginatedData = filteredRows.slice(start, end);
  const totalPages = Math.ceil(filteredRows.length / pageInfo.pageSize);

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

  const { columns } = useProductListColumns({
    onView: handleView,
  });

  const renderStoreCardsView = (item) => (
    <ProductCard key={item.id} {...item} onClick={() => handleView(item)} />
  );

  if (loading) return <ContentLoader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Dropdown filter props
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
        description="All products available in the store"
        data={paginatedData}
        columns={columns}
        renderCardView={renderStoreCardsView}
        pagination={pageInfo}
        onPaginationChange={setPageInfo}
        pageCount={totalPages}
        totalCount={filteredRows.length}
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
