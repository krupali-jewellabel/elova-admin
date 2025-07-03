"use client";

import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/cards/card";
import { STOCK_DETAIL } from "./constant";
import { ListWithCardToggle } from "@/components/common/ui/ListWithCardToggle";
import { useStockSelections } from "@/components/commonPages/StockSelections/hooks/useStockSelections";
import { DataGridToolbar } from "@/components/commonPages/DataGridToolBar";
import { useFilteredStoreData } from "@/components/commonPages/StockSelections/hooks/useFilteredData";
import { Button } from "@/components/common/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { STOCK_PRODUCT_DETAIL } from "@/components/commonPages/StockSelections/constant";
import { ProductCardView } from "./ProductCardView";

// Single product card
const StockSelectionCard = ({ product, onView }) => {
  return (
    <Card
      onClick={() => onView(product)}
      className="w-full max-w-[240px] p-4 text-center border border-muted/30 shadow-sm hover:shadow-md transition rounded-xl cursor-pointer"
    >
      <img
        src={product.image}
        alt={product.title}
        className="mx-auto mb-4 h-[360px] object-contain border border-muted/30 shadow-sm hover:shadow-md transition rounded-lg"
      />
      <CardContent className="p-0 space-y-1 text-left">
        <div className="text-sm font-medium text-muted-foreground">
          {product.id}
        </div>
        <CardTitle>{product.title}</CardTitle>
        <div className="flex flex-col gap-5">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Style:</span>{" "}
            <span className="#27314B">{product.style}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Collection:</span>{" "}
            <span className="#27314B">{product.collection}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Category:</span>{" "}
            <span className="#27314B">{product.category}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StockSelections = ({ product }) => {
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

  const columns = useStockSelections({
    onClick: handleColumnClick,
    onView: handleView,
  });

  const renderStoreCardsView = (item) => (
    <ProductCard
      key={item.id}
      productImg={item.productImg}
      designNo={item.designNo}
      category={item.category}
      style={item.style}
      shape={item.shape}
      basePrice={item.basePrice}
      plan={item.plan}
      collection={item.collection}
      createdAt={item.createdAt}
      lastUpdatedDate={item.lastUpdatedDate}
      gender={item.gender}
      active={item.active}
      onClick={() => handleView(item)}
    />
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full">
        {STOCK_PRODUCT_DETAIL.map((product, index) => (
          <Card key={index} className="p-4">
            <div className="flex flex-col">
              <div className="flex items-center text-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-lg h-[200px] object-contain border border-muted/30 mb-4"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-medium">{product.id}</h3>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Style: {product.style}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Collection: {product.collection}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Category: {product.category}
                  </p>
                </div>
              </div>
              <ListWithCardToggle
                title="Select Variants"
                data={STOCK_DETAIL}
                columns={columns}
                useFilteredData={useFilteredStoreData}
                ToolbarComponent={DataGridToolbar}
                renderCardView={(item) => (
                  <ProductCard
                    key={item.id}
                    {...item}
                    onClick={() => handleView({ ...product, ...item })}
                  />
                )}
              />
            </div>
          </Card>
        ))}
        <Card className="">
          <div className="">
            {STOCK_PRODUCT_DETAIL.map((product, index) => (
              <Card key={index} className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center text-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="rounded-lg h-[200px] object-contain border border-muted/30 mb-4"
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-medium">{product.id}</h3>
                      <h2 className="text-lg font-semibold">{product.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        Style: {product.style}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Collection: {product.collection}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Category: {product.category}
                      </p>
                    </div>
                  </div>
                  <ListWithCardToggle
                    title="Select Variants"
                    data={STOCK_DETAIL}
                    columns={columns}
                    useFilteredData={useFilteredStoreData}
                    ToolbarComponent={DataGridToolbar}
                    renderCardView={(item) => (
                      <ProductCard
                        key={item.id}
                        {...item}
                        onClick={() => handleView(item)}
                      />
                    )}
                  />
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="sticky top-0 z-10 bg-white py-5 px-6 shadow-sm border rounded-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <span className="flex items-center gap-x-2 text-sm font-normal text-secondary-foreground">
              Variants Selected: 3/5
            </span>

            <span className="text-sm font-normal text-secondary-foreground text-center">
              Estimated Price: $2400.43
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
              <Link href="#" className="w-full sm:w-auto">
                <Button variant="outline" className="shrink-0">
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  Add all to Cart
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="w-full mt-4">
        <CardHeader className="sticky top-0 z-10 bg-white py-5 px-6 shadow-sm border border-primary rounded-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <span className="flex items-center gap-x-2 text-sm font-normal text-secondary-foreground">
              Total Products Selected: 45
              <img
                src="/images/information-2.svg"
                alt="Information"
                className="w-4 h-4"
              />
            </span>

            <span className="text-sm font-normal text-secondary-foreground text-center">
              Budget Used:{" "}
              <span className="font-semibold">15,45,000 / 4,00,00,000</span>
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
              <Link href="#" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  Save Draft
                </Button>
              </Link>
              <Link href="#" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-[#F1F1F2]"
                >
                  Previous
                </Button>
              </Link>
              <Link href="#" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-primary text-white">
                  Next
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      {selectedProduct && (
        <ProductCardView
          open={openProductDetailSheet}
          closeProductDetailSheet={handleClose}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default StockSelections;
