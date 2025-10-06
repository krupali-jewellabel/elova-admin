"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useProductListColumns } from "./hooks/useProductListColumns";
import { ProductCardView } from "./ProductCardView";
import ProductCard from "./ProductCard";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import { DataGridToolbar } from "@/components/common/DataGridToolBar";
import { useCrudList } from "@/hooks/useCrudList";

const ProductMasterList = () => {
  const [openProductDetailSheet, setOpenProductDetailSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [pageInfo, setPageInfo] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const [editingCell, setEditingCell] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const { list, loading, error, editData, setEditData, fetchById, pagination } =
    useCrudList("/api/product-management", {
      page: pageInfo.pageIndex + 1,
      limit: pageInfo.pageSize,
      search: searchQuery,
    });

  const rows = (list?.result?.items || list?.items || list || []).map(
    (item) => ({
      id: item.id,
      title: item.title,
      productImg: item.product_img,
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

  const filteredRows = useMemo(() => {
    if (!searchQuery) return rows;
    const query = searchQuery.toLowerCase();
    return rows.filter(
      (r) =>
        r.category?.toLowerCase().includes(query) ||
        r.design_no?.toLowerCase().includes(query) ||
        r.style?.toLowerCase().includes(query)
    );
  }, [searchQuery, rows]);

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

  const handleSaveEdit = (id, field, value) => {
    setEditingCell(null);
  };

  const { columns } = useProductListColumns({
    editingCell,
    setEditingCell,
    editedValue,
    setEditedValue,
    handleSaveEdit,
    onClick: (field) => console.log("Sort by:", field),
    onView: handleView,
  });

  const renderStoreCardsView = (item) => (
    <ProductCard
      key={item.id}
      title={item.title}
      product_image={item.product_image}
      design_no={item.design_no}
      category={item.category}
      style={item.style}
      shape={item.shape}
      bsPrice={item.base_price}
      salesPrice={item.sales_price}
      collection={item.collection}
      created_at={item.created_at}
      updated_at={item.updated_at}
      gender={item.gender}
      active={item.active}
      onClick={() => {
        setOpenProductDetailSheet(true);
        setSelectedProduct(item);
      }}
    />
  );

  if (loading) return <ContentLoader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="Product Master List"
        data={filteredRows} // use filteredRows with search
        columns={columns}
        renderCardView={renderStoreCardsView}
        pagination={pageInfo}
        onPaginationChange={setPageInfo}
        pageCount={pagination?.totalPages}
        totalCount={pagination?.total}
        serverSidePagination={true} // keeps API-based pagination
        ToolbarComponent={(props) => (
          <DataGridToolbar
            {...props}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            pagination={pageInfo}
            setPagination={setPageInfo}
            searchPlaceholder="Search Products"
          />
        )}
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
