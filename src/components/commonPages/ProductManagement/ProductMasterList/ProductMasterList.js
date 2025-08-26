"use client";

import React, { useState, useCallback } from "react";
import { useProductListColumns } from "./hooks/useProductListColumns";
import { ProductCardView } from "./ProductCardView";
import ProductCard from "./ProductCard";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import { DataGridToolbar } from "@/components/common/DataGridToolBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { useCrudList } from "@/hooks/useCrudList";

const ProductMasterList = () => {
  const [openProductDetailSheet, setOpenProductDetailSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [pageInfo, setPageInfo] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const [editingCell, setEditingCell] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  // const { list, loading, error, editData, setEditData, fetchById, pagination } =
  //   useCrudList("/api/product-management");
  const { list, loading, error, editData, setEditData, fetchById, pagination } =
    useCrudList("/api/product-management", {
      page: pageInfo.pageIndex + 1, // 1-based
      limit: pageInfo.pageSize,
      // search: searchQuery,
    });

  const rows = (list?.result?.items || list?.items || list || []).map(
    (item) => ({
      id: item.id,
      productImg: item.product_img,
      design_no: item.design_no,
      category: item.category,
      style: item.style,
      shape: item.shape,
      sales_price: item.sales_price,
      collection: item.collection,
      gender: item.gender,
      created_at: item.created_at,
      updated_at: item.updated_at,
    })
  );

  console.log("Full API response:", list);

  const filteredRows = (data, query) => {
    const searchLower = query.toLowerCase();
    return data.filter((item) => {
      const category = item?.category?.toLowerCase() || "";
      return category.includes(searchLower);
    });
  };

  const handleView = useCallback(
    async (product) => {
      console.log("Fetching product with ID:", product.id);

      setSelectedProduct(product);
      setOpenProductDetailSheet(true);

      try {
        const data = await fetchById(product.id);
        console.log("Fetched product details:", data);
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
    console.log("Saving inline edit:", { id, field, value });
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
      product_image={item.product_image}
      design_no={item.design_no}
      category={item.category}
      style={item.style}
      shape={item.shape}
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

  // const filterOptions = (data, query) => {
  //   const searchLower = query.toLowerCase();
  //   return data.filter((item) => {
  //     const category = item?.code?.toLowerCase() || "";
  //     return category.includes(searchLower);
  //   });
  // };

  if (loading) return <ContentLoader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="Product Master List"
        data={rows} // use processed rows instead of raw list
        columns={columns}
        filterFunction={filteredRows}
        renderCardView={renderStoreCardsView}
        pagination={pageInfo}
        onPaginationChange={setPageInfo}
        pageCount={pagination?.totalPages}
        totalCount={pagination?.total}
        serverSidePagination={true}
        paginationLinks={pagination?.links}
        ToolbarComponent={(props) => (
          <div className="flex flex-wrap items-center gap-2">
            <DataGridToolbar
              {...props}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              pagination={pageInfo}
              setPagination={setPageInfo}
              searchPlaceholder="Search Products"
            />

            <Select onValueChange={(val) => console.log("Category:", val)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="RING">Rings</SelectItem>
                <SelectItem value="NECKLACE">Necklaces</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => console.log("Style:", val)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="SOLITAIRE">Solitaire</SelectItem>
                <SelectItem value="THREE STONE">Three Stone</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => console.log("Shape:", val)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="RND">Round</SelectItem>
                <SelectItem value="PRI">Princess</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
