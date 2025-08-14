"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/cards/card";
import { ListWithCardToggle } from "@/components/common/ui/ListWithCardToggle";
import { useStockSelections } from "@/components/commonPages/StockSelections/hooks/useStockSelections";
import { useFilteredStoreData } from "@/components/commonPages/StockSelections/hooks/useFilteredData";
import { Button } from "@/components/common/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { useCrudApi } from "@/hooks/useCrudApi";
import { toTitleCase } from "@/lib/utils";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const { fetchAll } = useCrudApi("/api/stock-selection/categories");
  const { fetchAll: filterOptions } = useCrudApi(
    "/api/stock-selection/stock-filter-options"
  );
  const { fetchAll: products } = useCrudApi("/api/stock-selection/products");
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    debugger;
    try {
      const categoriesRes = await fetchAll();
      if (Array.isArray(categoriesRes?.data)) setCategories(categoriesRes.data);

      const filterOptionsRes = await filterOptions();
      if (filterOptionsRes?.data) {
        const dropdownData = Object.entries(filterOptionsRes.data).map(
          ([key, arr]) => ({
            key,
            label: key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            options: Array.isArray(arr)
              ? arr.map((item) => ({
                  value: String(item.id),
                  label: item.name || item.value,
                }))
              : [],
          })
        );
        setFilters({ data: dropdownData });
      }

      const productsRes = await products({
        category_id: 10,
      });
      setProductsData(productsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleView = useCallback((product) => {
    setSelectedProduct(product);
    setOpenProductDetailSheet(true);
  }, []);

  const handleColumnClick = (columnId) => {
    console.log("Column clicked:", columnId);
  };

  const columns = useStockSelections({
    onClick: handleColumnClick,
    onView: handleView,
  });

  return (
    <>
      <div className="flex flex-col space-y-[10px]">
        {/* Top Category Selector */}
        <div className="flex items-center gap-2 px-4 pt-4">
          <Button variant="ghost" size="icon">
            <img src="/images/icons/arrow-left.svg" alt="Back" />
          </Button>

          <div className="relative">
            <Select
              value={selectedCategory}
              onValueChange={(val) => setSelectedCategory(val)}
            >
              <SelectTrigger className="w-fit min-w-[150px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {toTitleCase(item.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-[25px] px-4 py-3 text-sm font-medium text-muted-foreground">
          {filters.data?.map((filter) => (
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
                      <SelectItem
                        key={`${filter.key}-${option.value}`}
                        value={option.value}
                      >
                        {toTitleCase(option.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="grid grid-cols-2 gap-4 w-full p-[30px] mt-[30px]">
        {productsData?.products?.map((product) => (
          <div key={product.product_id} className="p-4">
            <div className="flex flex-col">
              <div className="flex items-start text-start gap-[40px]">
                <img
                  src={product.product_image}
                  alt={product.ttitle}
                  className="rounded-lg h-[200px] object-contain border border-muted/30 mb-4 bg-[#FCFCFC]"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-medium">{product.design_no}</h3>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Style: {toTitleCase(product.sub_category)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Collection: {toTitleCase(product.collection)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Category: {toTitleCase(product.category)}
                  </p>
                </div>
              </div>
              <ListWithCardToggle
                title="Select Variants"
                data={product?.variants}
                columns={columns}
                useFilteredData={useFilteredStoreData}
                // ToolbarComponent={DataGridToolbar}
              />
            </div>
          </div>
        ))}
      </Card>

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
    </>
  );
};

export default StockSelections;
