"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useBrowseColumns } from "./ProductMasterList/hooks/useBrowseColumns";
import { Button } from "@/components/common/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import {
  BROWSE_PRODUCTS,
  FILTERS,
  FILTERS_CONFIG,
  PRODUCTS_DETAILS,
} from "./constant";
import { toTitleCase } from "@/lib/utils";
import { Card, CardHeader } from "@/components/common/ui/cards/card";
import Link from "next/link";
import { useFilteredStoreData } from "../StockSelections/hooks/useFilteredData";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { ShoppingCart } from "lucide-react";
import { useCrudApi } from "@/hooks/useCrudApi";
import { Skeleton } from "@/components/common/ui/skeleton";

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

const BrowseProducts = () => {
  const [openProductDetailSheet, setOpenProductDetailSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const handleView = useCallback((product) => {
    setSelectedProduct(product);
    setOpenProductDetailSheet(true);
  }, []);

  const handleColumnClick = (columnId) => {
    console.log("Column clicked:", columnId);
  };

  const columns = useBrowseColumns({
    onClick: handleColumnClick,
    onView: handleView,
  });

  const { fetchAll } = useCrudApi("/api/product-management/category");

  const { fetchAll: filterOptions } = useCrudApi(
    "/api/stock-selection/stock-filter-options"
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoriesRes = await fetchAll();
      if (Array.isArray(categoriesRes?.data)) setCategories(categoriesRes.data);

      const filterOptionsRes = await filterOptions();
      if (filterOptionsRes?.data) {
        const dropdownData = Object.entries(filterOptionsRes.data).map(
          ([key, arr]) => ({
            key: key || `filter-${Math.random()}`,
            label: key
              ? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
              : "Unnamed Filter",
            options: Array.isArray(arr)
              ? arr.map((item, idx) => ({
                  value: String(item.id || idx),
                  label: item.name || item.value || `Option ${idx + 1}`,
                }))
              : [],
          })
        );
        setFilters({ data: dropdownData });
      }
    } catch (err) {
      console.error("Error fetching categories/filters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-[10px]">
        {/* Top Category Selector */}
        <div className="flex items-center gap-2 px-4 pt-4">
          <Button variant="ghost" size="icon">
            <img src="/images/icons/arrow-left.svg" alt="Back" />
          </Button>

          <div className="relative">
            {loading ? (
              <Skeleton className="h-10 w-[150px]" />
            ) : (
              <Select
                value={selectedCategory}
                onValueChange={(val) => {
                  setSelectedCategory(val);
                  setSelectedSubCategory("");
                  setProductsData({ products: [], sub_categories: [] });
                  console.log("Category selected:", val);
                }}
              >
                <SelectTrigger className="w-fit min-w-[150px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item, idx) => (
                    <SelectItem
                      key={item.id || `cat-${idx}`}
                      value={item.id?.toString() || `cat-${idx}`}
                    >
                      {toTitleCase(item.name || `Category ${idx + 1}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-[25px] px-4 py-3 text-sm font-medium text-muted-foreground">
          {FILTERS.map((filter) => (
            <div key={filter.key} className="flex items-center gap-2 relative">
              <label className="text-muted-foreground">{filter.label}</label>
              <div className="relative">
                <Select
                  onValueChange={(val) => console.log(`${filter.key}: ${val}`)}
                >
                  <SelectTrigger className="w-fit min-w-[150px]">
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {toTitleCase(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <Card className="grid grid-cols-2 gap-4 w-full p-[30px] mt-[30px]">
        {BROWSE_PRODUCTS.map((product) => (
          <div key={product.id} className="p-4">
            <div className="flex flex-col">
              <div className="flex items-start text-start gap-[40px]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-lg h-[200px] object-contain border border-muted/30 mb-4 bg-[#FCFCFC]"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-medium">{product.id}</h3>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Style: {toTitleCase(product.style)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Collection: {toTitleCase(product.collection)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Category: {toTitleCase(product.category)}
                  </p>
                </div>
              </div>

              {/* Variants table */}
              <ListWithCardToggle
                title="Select Product Variants"
                data={PRODUCTS_DETAILS}
                columns={columns}
                useFilteredData={useFilteredStoreData}
              />
            </div>
          </div>
        ))}
      </Card>

      {/* Summary Section */}
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

      {/* Footer Section */}
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
    </>
  );
};

export default BrowseProducts;
