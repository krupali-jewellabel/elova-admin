"use client";

import { useCrudList } from "@/hooks/useCrudList";
import React, { useCallback, useState } from "react";
import { useCustomMarginProductsColumns } from "../../MarginSetup/hooks/useCustomMarginProductsColumns";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import ProductCard from "../../ProductManagement/ProductMasterList/ProductCard";
import { ProductCardView } from "../../ProductManagement/ProductMasterList/ProductCardView";

const ByIndividual = () => {
  const [openProductDetailSheet, setOpenProductDetailSheet] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState();

  const {
    list,
    loading,
    error,
    editData,
    setEditData,
    dialogOpen,
    setDialogOpen,
    fetchData,
    fetchById,
    pagination,
  } = useCrudList("/api/pricing-margin/by-product");
  console.log("list", list);
  const [selectedProductId, setSelectedProductId] = useState(
    editData?._id || null
  );

  const renderStoreCardsView = (item) => (
    <ProductCard
      key={item?.id}
      product_image={item?.product_image}
      design_no={item?.design_no}
      category={item?.category}
      style={item?.style}
      shape={item?.shape}
      basePrice={item?.base_price}
      salesPrice={item?.sales_price}
      collection={item?.collection}
      gender={item?.gender}
      hideRemove
      hideEdit
      hideActiveCell
    />
  );

  const columns = useCustomMarginProductsColumns({
    onView: async (item) => {
      try {
        setSelectedProductId(item?.id);
        const data = await fetchById(item?.id);
        setEditData(data?.data);
        setOpenProductDetailSheet(true);
      } catch (err) {}
    },
    onRefresh: fetchData,
  });

  const handleClose = useCallback(() => {
    setOpenProductDetailSheet(false);
    setSelectedProductId(null);
  }, []);

  const filterOptions = (data, query) => {
    debugger;
    const searchLower = query.toLowerCase();

    return data.filter((item) => {
      const category = item?.category?.toLowerCase() || "";

      return category?.includes(searchLower);
    });
  };

  if (loading) return <ContentLoader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="By Individual"
        data={list}
        columns={columns}
        filterOptions={filterOptions}
        renderCardView={renderStoreCardsView}
        searchQuery={searchQuery}
        showBulkMargin
        onSearchChange={(query) => {
          setSearchQuery(query);
          fetchData(query);
        }}
        onRefresh={fetchData}
      />

      <ProductCardView
        open={openProductDetailSheet}
        closeProductDetailSheet={handleClose}
        product={editData}
        productId={selectedProductId}
      />
    </>
  );
};

export default ByIndividual;
