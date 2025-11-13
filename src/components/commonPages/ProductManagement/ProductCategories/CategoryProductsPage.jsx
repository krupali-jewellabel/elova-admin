"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/common/ui/breadcrumb";
import { Button } from "@/components/common/ui/button";
import { Plus, Share2 } from "lucide-react";
import React, { useState } from "react";
import FilterChips from "./FilterChips";
import ProductsGrid from "./ProductsGrid";
import ManualOrderModel from "./ManualOrderModel";
import ShareModel from "./ShareModel";
import { useCrudListWithPagination } from "@/hooks/useCrudListWithPagination";
import { useCrudApi } from "@/hooks/useCrudApi";
import { toTitleCase } from "@/lib/utils";
import { toast } from "sonner";
import { PRODUCTS_DATA } from "./constant";
import { useSearchParams } from "next/navigation";

const CategoryProductsPage = ({ category }) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const { list: products } = useCrudListWithPagination(
    "/api/product-management",
    {
      category_id: Number(categoryId),
    }
  );

  console.log("list", products);
  const { create: createShare } = useCrudApi(
    "/api/store-admin/product-management/share-product"
  );

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
  };

  const handleProductSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Manual order form state
  const [orderData, setOrderData] = useState({
    metalColor: "",
    diamondType: "",
    carat: "",
    metalPurity: "",
    size: "",
    quantity: "1",
    customerName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleCreateOrder = () => {
    console.log("Order Created:", orderData);
    setShowOrderModal(false);
  };

  const [shareOptions, setShareOptions] = useState({
    imagesOnly: false,
    imagesWithTitle: true,
    includePrice: true,
    customPrice: "",
    includeDescription: true,
  });

  // Handle share product API call
  const handleGenerateShare = async (shareType = "pdf") => {
    try {
      if (selectedProducts.length === 0) {
        toast.error("Please select at least one product to share!");
        return;
      }

      setLoading(true);

      // Right now sending first selected product only
      const productId = selectedProducts[0];

      const payload = {
        product_id: productId,
        images_only: shareOptions.imagesOnly,
        include_title: shareOptions.imagesWithTitle,
        include_price: shareOptions.includePrice,
        custom_price: shareOptions.customPrice
          ? Number(shareOptions.customPrice)
          : null,
        include_description: shareOptions.includeDescription,
        share_type: shareType,
      };

      const response = await createShare(payload);

      if (response?.status) {
        toast.success(response.message || "Share generated successfully!");
        setShowShareModal(false);
      } else {
        throw new Error(response?.message || "Failed to share product");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong while sharing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔹 Breadcrumb */}
      <div className="ml-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/product-management/category">
                Product Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{toTitleCase(category)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 🔹 Header Actions */}
      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {toTitleCase(category)} Products
          </h1>
          <p className="text-sm text-gray-500">{products.length} Products</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowShareModal(true)}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Products
          </Button>

          <Button onClick={() => setShowOrderModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Manual Order
          </Button>
        </div>
      </div>

      {/* 🔹 Filters */}
      <div>
        <FilterChips />
      </div>

      {/* 🔹 Product Grid */}
      <div>
        <ProductsGrid
          products={products}
          selectedProducts={selectedProducts}
          hoveredProduct={hoveredProduct}
          setHoveredProduct={setHoveredProduct}
          handleSelectAll={handleSelectAll}
          handleProductSelect={handleProductSelect}
        />
      </div>

      {/* 🔹 Manual Order Modal */}
      <ManualOrderModel
        showOrderModal={showOrderModal}
        setShowOrderModal={setShowOrderModal}
        handleCreateOrder={handleCreateOrder}
        product={PRODUCTS_DATA[0]} // you can change this to selectedProducts[0] if you want dynamic
      />

      {/* 🔹 Share Modal */}
      <ShareModel
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        shareOptions={shareOptions}
        setShareOptions={setShareOptions}
        handleGenerateShare={handleGenerateShare}
        loading={loading}
        product={products.find((p) => p.id === selectedProducts[0])}
      />
    </>
  );
};

export default CategoryProductsPage;
