"use client";

import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import React, { useState, useCallback } from "react";
import { PRODUCT_LIST_DETAILS, PRODUCT_MASTER_DATA } from "../constant";
import { useProductListColumns } from "./hooks/useProductListColumns";
import { useFilteredStoreData } from "../hooks/useFilteredStoreData";
import { DataGridToolbar } from "@/components/common/DataGridToolBar";
import ProductCard from "./ProductCard";
import { ProductCardView } from "./ProductCardView";

export const ProductMasterList = () => {
  const [row, setRow] = useState([PRODUCT_MASTER_DATA]);
  const [editingCell, setEditingCell] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [openProductDetailSheet, setOpenProductDetailSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleView = useCallback((product) => {
    setSelectedProduct(product);
    setOpenProductDetailSheet(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenProductDetailSheet(false);
    setSelectedProduct(null);
  }, []);

  const handleColumnClick = (columnId) => {
    console.log("Column clicked:", columnId);
  };

  // const handleSaveEdit = (id, field, value) => {
  //   console.log("Saving inline edit:", { id, field, value });
  //   setEditingCell(null);
  // };

  const handleSaveEdit = (id, field, value) => {
    setRow((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    setEditingCell(null);
    console.log("Saving inline edit:", { id, field, value });
  };

  const columns = useProductListColumns({
    editingCell,
    setEditingCell,
    editedValue,
    setEditedValue,
    handleSaveEdit,
    onClick: handleColumnClick,
    onView: handleView,
  });

  const renderStoreCardsView = (item) => {
    return (
      <ProductCard
        key={item.id}
        productImg={item.productImg}
        designNo={item.designNo}
        category={item.category}
        style={item.style}
        shape={item.shape}
        salesPrice={item.salesPrice}
        margin={item.margin}
        collection={item.collection}
        createdAt={item.createdAt}
        lastUpdatedDate={item.lastUpdatedDate}
        gender={item.gender}
        active={item.active}
        onClick={() => handleView(item)}
      />
    );
  };
  return (
    <>
      {" "}
      <ListWithCardToggle
        title="Product Master List"
        data={PRODUCT_MASTER_DATA}
        columns={columns}
        useFilteredData={useFilteredStoreData}
        ToolbarComponent={DataGridToolbar}
        renderCardView={renderStoreCardsView}
      />
      <ProductCardView
        open={openProductDetailSheet}
        closeProductDetailSheet={handleClose}
        product={selectedProduct || PRODUCT_LIST_DETAILS[0]}
        productId={selectedProduct?.id || PRODUCT_LIST_DETAILS[0]?.id}
      />
    </>
  );
};

export default ProductMasterList;
