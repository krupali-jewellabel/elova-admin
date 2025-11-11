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
import { ToolbarActions } from "@/components/common/ui/toolbar";
import { Plus, Share2 } from "lucide-react";
import React, { useState } from "react";
import FilterChips from "./FilterChips";
import ProductsGrid from "./ProductsGrid";
import { PRODUCTS_DATA } from "./constant";
import ManualOrderModel from "./ManualOrderModel";
import ShareModel from "./ShareModel";

const CategoryProductsPage = ({ category }) => {
  console.log("category in page", category);
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [products] = useState(PRODUCTS_DATA); // ← using constant file
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    imagesWithTitle: false,
    includePrice: false,
    customPrice: "",
    includeDescription: false,
  });

  const handleGenerateShare = () => {
    console.log("Sharing with options:", shareOptions, selectedProducts);
    setShowShareModal(false);
  };

  return (
    <>
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
              <BreadcrumbPage>{capitalize(category)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {capitalize(category)} Products
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
            Create Manual Orders
          </Button>
        </div>
      </div>

      <div>
        <FilterChips />
      </div>

      <div>
        <ProductsGrid
          products={products}
          selectedProducts={[]}
          hoveredProduct={null}
          setHoveredProduct={() => {}}
          handleSelectAll={() => {}}
          handleProductSelect={() => {}}
        />
      </div>

      <div>
        <ManualOrderModel
          showOrderModal={showOrderModal}
          setShowOrderModal={setShowOrderModal}
          handleCreateOrder={handleCreateOrder}
          product={PRODUCTS_DATA[0]} // or the product user selected
        />
      </div>

      <div>
        <ShareModel
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
          shareOptions={shareOptions}
          setShareOptions={setShareOptions}
          handleGenerateShare={handleGenerateShare}
        />
      </div>
    </>
  );
};

export default CategoryProductsPage;
