// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import { useBrowseColumns } from "./ProductMasterList/hooks/useBrowseColumns";
// import { Button } from "@/components/common/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/common/ui/select";
// import {
//   BROWSE_PRODUCTS,
//   FILTERS,
//   FILTERS_CONFIG,
//   PRODUCTS_DETAILS,
// } from "./constant";
// import { toTitleCase } from "@/lib/utils";
// import { Card, CardHeader } from "@/components/common/ui/cards/card";
// import Link from "next/link";
// import { useFilteredStoreData } from "../StockSelections/hooks/useFilteredData";
// import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
// import { ShoppingCart } from "lucide-react";
// import { useCrudApi } from "@/hooks/useCrudApi";
// import { Skeleton } from "@/components/common/ui/skeleton";

// const StockSelectionCard = ({ product, onView }) => {
//   return (
//     <Card
//       onClick={() => onView(product)}
//       className="w-full max-w-[240px] p-4 text-center border border-muted/30 shadow-sm hover:shadow-md transition rounded-xl cursor-pointer"
//     >
//       <img
//         src={product.image}
//         alt={product.title}
//         className="mx-auto mb-4 h-[360px] object-contain border border-muted/30 shadow-sm hover:shadow-md transition rounded-lg"
//       />
//       <CardContent className="p-0 space-y-1 text-left">
//         <div className="text-sm font-medium text-muted-foreground">
//           {product.id}
//         </div>
//         <CardTitle>{product.title}</CardTitle>
//         <div className="flex flex-col gap-5">
//           <div className="text-sm text-muted-foreground">
//             <span className="font-medium text-foreground">Style:</span>{" "}
//             <span className="#27314B">{product.style}</span>
//           </div>
//           <div className="text-sm text-muted-foreground">
//             <span className="font-medium text-foreground">Collection:</span>{" "}
//             <span className="#27314B">{product.collection}</span>
//           </div>
//           <div className="text-sm text-muted-foreground">
//             <span className="font-medium text-foreground">Category:</span>{" "}
//             <span className="#27314B">{product.category}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const BrowseProducts = () => {
//   const [openProductDetailSheet, setOpenProductDetailSheet] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [filters, setFilters] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [productsData, setProductsData] = useState([]);

//   const handleView = useCallback((product) => {
//     setSelectedProduct(product);
//     setOpenProductDetailSheet(true);
//   }, []);

//   const handleColumnClick = (columnId) => {
//     console.log("Column clicked:", columnId);
//   };

//   const columns = useBrowseColumns({
//     onClick: handleColumnClick,
//     onView: handleView,
//   });

//   const { fetchAll } = useCrudApi("/api/product-management/category");
//   const { fetchAll: products } = useCrudApi(
//     "/api/product-management/browse-product"
//   );

//   const { fetchAll: filterOptions } = useCrudApi(
//     "/api/stock-selection/stock-filter-options"
//   );

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const categoriesRes = await fetchAll();
//       if (Array.isArray(categoriesRes?.data)) setCategories(categoriesRes.data);

//       const filterOptionsRes = await filterOptions();
//       if (filterOptionsRes?.data) {
//         const dropdownData = Object.entries(filterOptionsRes.data).map(
//           ([key, arr]) => ({
//             key: key || `filter-${Math.random()}`,
//             label: key
//               ? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
//               : "Unnamed Filter",
//             options: Array.isArray(arr)
//               ? arr.map((item, idx) => ({
//                   value: String(item.id || idx),
//                   label: item.name || item.value || `Option ${idx + 1}`,
//                 }))
//               : [],
//           })
//         );
//         setFilters({ data: dropdownData });
//       }
//     } catch (err) {
//       console.error("Error fetching categories/filters:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!selectedCategory) return;
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         console.log(`Fetching products for category_id: ${selectedCategory}`);
//         const productsRes = await products({
//           category_id: Number(selectedCategory),
//           sub_category_id: selectedSubCategory
//             ? [Number(selectedSubCategory)]
//             : [],
//         });

//         setProductsData(productsRes.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory]);

//   useEffect(() => {
//     if (!selectedCategory) return;
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         console.log(
//           `Fetching products for category: ${selectedCategory}, sub-category: ${selectedSubCategory}`
//         );
//         const productsRes = await products({
//           category_id: Number(selectedCategory),
//           sub_category_id: selectedSubCategory
//             ? [Number(selectedSubCategory)]
//             : [],
//         });
//         setProductsData(productsRes.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory, selectedSubCategory]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="flex flex-col space-y-[10px]">
//         {/* Top Category Selector */}
//         <div className="flex items-center gap-2 px-4 pt-4">
//           <Button variant="ghost" size="icon">
//             <img src="/images/icons/arrow-left.svg" alt="Back" />
//           </Button>

//           <div className="relative">
//             {loading ? (
//               <Skeleton className="h-10 w-[150px]" />
//             ) : (
//               <Select
//                 value={selectedCategory}
//                 onValueChange={(val) => {
//                   setSelectedCategory(val);
//                   setSelectedSubCategory("");
//                   setProductsData({ products: [], sub_categories: [] });
//                   console.log("Category selected:", val);
//                 }}
//               >
//                 <SelectTrigger className="w-fit min-w-[150px]">
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((item, idx) => (
//                     <SelectItem
//                       key={item.id || `cat-${idx}`}
//                       value={item.id?.toString() || `cat-${idx}`}
//                     >
//                       {toTitleCase(item.name || `Category ${idx + 1}`)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           </div>
//         </div>

//         {/* Filters Row */}
//         {/* <div className="flex flex-wrap items-center gap-[25px] px-4 py-3 text-sm font-medium text-muted-foreground">
//           {FILTERS.map((filter) => (
//             <div key={filter.key} className="flex items-center gap-2 relative">
//               <label className="text-muted-foreground">{filter.label}</label>
//               <div className="relative">
//                 <Select
//                   onValueChange={(val) => console.log(`${filter.key}: ${val}`)}
//                 >
//                   <SelectTrigger className="w-fit min-w-[150px]">
//                     <SelectValue placeholder={filter.label} />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {filter.options.map((option) => (
//                       <SelectItem key={option} value={option}>
//                         {toTitleCase(option)}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           ))}
//         </div> */}
//         <div className="flex flex-wrap items-center gap-[25px] px-4 py-3 text-sm font-medium text-muted-foreground">
//           {loading
//             ? Array.from({ length: 3 }).map((_, i) => (
//                 <Skeleton key={`filter-skel-${i}`} className="h-10 w-[150px]" />
//               ))
//             : filters.data?.map((filter, filterIdx) => (
//                 <div
//                   key={filter.key || `filter-${filterIdx}`}
//                   className="flex items-center gap-2 relative"
//                 >
//                   <label className="text-muted-foreground">
//                     {filter.label}
//                   </label>
//                   <div className="relative">
//                     <Select
//                       onValueChange={(val) =>
//                         setSelectedFilters((prev) => ({
//                           ...prev,
//                           [filter.key]: val,
//                         }))
//                       }
//                     >
//                       <SelectTrigger className="w-fit min-w-[150px]">
//                         <SelectValue placeholder={filter.label} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {filter.options.map((option, optIdx) => (
//                           <SelectItem
//                             key={`${filter.key || "filter"}-${
//                               option.value || optIdx
//                             }`}
//                             value={option.value || `opt-${optIdx}`}
//                           >
//                             {toTitleCase(option.label)}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               ))}
//         </div>
//       </div>

//       {/* Products Section */}
//       {/* <Card className="grid grid-cols-2 gap-4 w-full p-[30px] mt-[30px]">
//         {BROWSE_PRODUCTS.map((product) => (
//           <div key={product.id} className="p-4">
//             <div className="flex flex-col">
//               <div className="flex items-start text-start gap-[40px]">
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="rounded-lg h-[200px] object-contain border border-muted/30 mb-4 bg-[#FCFCFC]"
//                 />
//                 <div className="flex flex-col gap-2">
//                   <h3 className="text-base font-medium">{product.id}</h3>
//                   <h2 className="text-lg font-semibold">{product.title}</h2>
//                   <p className="text-sm text-muted-foreground">
//                     Style: {toTitleCase(product.style)}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Collection: {toTitleCase(product.collection)}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Category: {toTitleCase(product.category)}
//                   </p>
//                 </div>
//               </div>

//               <ListWithCardToggle
//                 title="Select Product Variants"
//                 data={PRODUCTS_DETAILS}
//                 columns={columns}
//                 useFilteredData={useFilteredStoreData}
//               />
//             </div>
//           </div>
//         ))}
//       </Card> */}

//       {/* Products Section */}
//       <Card className="grid grid-cols-2 gap-4 w-full p-[30px] mt-[30px]">
//         {productsData?.products?.length > 0 ? (
//           productsData.products.map((product) => (
//             <div key={product.product_id} className="p-4">
//               <div className="flex flex-col">
//                 <div className="flex items-start text-start gap-[40px]">
//                   <img
//                     src={product.product_image}
//                     alt={product.title}
//                     className="rounded-lg h-[200px] object-contain border border-muted/30 mb-4 bg-[#FCFCFC]"
//                   />
//                   <div className="flex flex-col gap-2">
//                     <h3 className="text-base font-medium">
//                       {product.design_no}
//                     </h3>
//                     <h2 className="text-lg font-semibold">{product.title}</h2>
//                     <p className="text-sm text-muted-foreground">
//                       Style: {product.occasion}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Collection: {product.collection}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Category: {product.category}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Sub Category: {product.sub_category}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Variants table (if needed) */}
//                 <ListWithCardToggle
//                   title="Select Product Variants"
//                   data={PRODUCTS_DETAILS}
//                   columns={columns}
//                   useFilteredData={useFilteredStoreData}
//                 />
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-2 text-center text-muted-foreground">
//             No products found.
//           </p>
//         )}
//       </Card>

//       {/* Summary Section */}
//       <Card className="w-full mt-4">
//         <CardHeader className="sticky top-0 z-10 bg-white py-5 px-6 shadow-sm border rounded-md">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
//             <span className="flex items-center gap-x-2 text-sm font-normal text-secondary-foreground">
//               Variants Selected: 3/5
//             </span>

//             <span className="text-sm font-normal text-secondary-foreground text-center">
//               Estimated Price: $2400.43
//             </span>

//             <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
//               <Link href="#" className="w-full sm:w-auto">
//                 <Button variant="outline" className="shrink-0">
//                   <ShoppingCart className="mr-1 h-4 w-4" />
//                   Add all to Cart
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </CardHeader>
//       </Card>

//       {/* Footer Section */}
//       <Card className="w-full mt-4">
//         <CardHeader className="sticky top-0 z-10 bg-white py-5 px-6 shadow-sm border border-primary rounded-md">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
//             <span className="flex items-center gap-x-2 text-sm font-normal text-secondary-foreground">
//               Total Products Selected: 45
//               <img
//                 src="/images/information-2.svg"
//                 alt="Information"
//                 className="w-4 h-4"
//               />
//             </span>

//             <span className="text-sm font-normal text-secondary-foreground text-center">
//               Budget Used:{" "}
//               <span className="font-semibold">15,45,000 / 4,00,00,000</span>
//             </span>

//             <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
//               <Link href="#" className="w-full sm:w-auto">
//                 <Button variant="outline" className="w-full sm:w-auto">
//                   Save Draft
//                 </Button>
//               </Link>
//               <Link href="#" className="w-full sm:w-auto">
//                 <Button
//                   variant="outline"
//                   className="w-full sm:w-auto bg-[#F1F1F2]"
//                 >
//                   Previous
//                 </Button>
//               </Link>
//               <Link href="#" className="w-full sm:w-auto">
//                 <Button className="w-full sm:w-auto bg-primary text-white">
//                   Next
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </CardHeader>
//       </Card>
//     </>
//   );
// };

// export default BrowseProducts;

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
import { Skeleton } from "@/components/common/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

const BrowseProducts = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category_id") || ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filters, setFilters] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState([]);

  const { fetchAll: fetchCategories } = useCrudApi(
    "/api/stock-selection/categories"
  );
  const { fetchAll: fetchFilterOptions } = useCrudApi(
    "/api/stock-selection/stock-filter-options"
  );

  const { fetchAll: fetchProducts } = useCrudApi(
    "/api/product-management/browse-product"
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoriesRes = await fetchCategories();
      if (Array.isArray(categoriesRes?.data)) setCategories(categoriesRes.data);

      const filterOptionsRes = await fetchFilterOptions();
      if (filterOptionsRes?.data) {
        const dropdownData = Object.entries(filterOptionsRes.data).map(
          ([key, arr]) => ({
            key: key || `filter-${Math.random()}`,
            label: key ? toTitleCase(key.replace(/_/g, " ")) : "Unnamed Filter",
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
    if (!selectedCategory) return;

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);

        // Build params object
        const params = {
          category_id: selectedCategory,
        };
        if (selectedSubCategory) {
          params.category_id = selectedSubCategory;
        }

        // Use fetchProducts from useCrudApi
        const productsRes = await fetchProducts({
          category_id: selectedCategory,
          sub_category_id: selectedSubCategory,
        });

        if (productsRes?.data) {
          setProductsData(productsRes.data);
          setSelectedVariants([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleColumnClick = (columnId) =>
    console.log("Column clicked:", columnId);

  const handleVariantSelection = (variants) => setSelectedVariants(variants);

  const columns = useStockSelections({
    onClick: handleColumnClick,
    onView: (product) => console.log("View product:", product),
  });

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);

    // Update search params in URL
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("category_id", val); // add or replace category_id
    params.delete("page");

    router.replace(`?${params.toString()}`);
  };

  const handleSubCategoryChange = (val) => {
    debugger;
    setSelectedSubCategory(val);

    // Update search params in URL
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("subcat", val); // add or replace category_id
    params.delete("page");

    router.replace(`?${params.toString()}`);
  };
  return (
    <>
      {/* Category & Sub-Category Selectors */}
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
              onValueChange={handleCategoryChange}
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

        {selectedCategory && productsData?.sub_categories?.length > 0 && (
          <div className="relative">
            <Select
              value={selectedSubCategory}
              onValueChange={handleSubCategoryChange}
            >
              <SelectTrigger className="w-fit min-w-[150px]">
                <SelectValue placeholder="Select Sub Category" />
              </SelectTrigger>
              <SelectContent>
                {productsData.sub_categories.map((sub, idx) => (
                  <SelectItem
                    key={sub.id || `sub-${idx}`}
                    value={sub.id?.toString() || `sub-${idx}`}
                  >
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-[25px] px-4 py-3 text-sm font-medium text-muted-foreground">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={`filter-skel-${i}`} className="h-10 w-[150px]" />
            ))
          : filters.data?.map((filter, idx) => (
              <div
                key={filter.key || `filter-${idx}`}
                className="flex items-center gap-2 relative"
              >
                <label className="text-muted-foreground">{filter.label}</label>
                <div className="relative">
                  <Select
                    onValueChange={(val) => {
                      debugger;
                      console.log("Filter selected:", val);
                    }}
                  >
                    <SelectTrigger className="w-fit min-w-[150px]">
                      <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option, optIdx) => (
                        <SelectItem
                          key={`${filter.key || "filter"}-${
                            option.value || optIdx
                          }`}
                          value={option.value || `opt-${optIdx}`}
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

      {/* Product List */}
      <Card className="grid grid-cols-2 gap-4 w-full p-[30px] mt-[30px]">
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={`prod-skel-${idx}`} className="p-4">
                <Skeleton className="h-[200px] w-full rounded-lg mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          : productsData?.products?.map((product, idx) => (
              <div key={product.product_id || `prod-${idx}`} className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-start text-start gap-[40px]">
                    <img
                      src={product.product_image}
                      alt={product.title || "Product"}
                      className="rounded-lg h-[200px] object-contain border border-muted/30 mb-4 bg-[#FCFCFC]"
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-medium">
                        {product.design_no || "N/A"}
                      </h3>
                      <h2 className="text-lg font-semibold">
                        {product.title || "Untitled Product"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Style: {toTitleCase(product.sub_category || "N/A")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Collection: {toTitleCase(product.collection || "N/A")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Category: {toTitleCase(product.category || "N/A")}
                      </p>
                    </div>
                  </div>

                  {/* Variants Table */}
                  <ListWithCardToggle
                    title="Select Variants"
                    data={product.variants}
                    columns={columns}
                    useFilteredData={useFilteredStoreData}
                    onSelectionChange={handleVariantSelection}
                  />
                </div>
              </div>
            ))}
      </Card>

      {/* Selected Variants Card */}
      {!loading && (
        <Card className="w-full mt-4">
          <CardHeader className="sticky top-0 z-10 bg-white py-5 px-6 shadow-sm border rounded-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
              <span className="flex items-center gap-x-2 text-sm font-normal text-secondary-foreground">
                Variants Selected: {selectedVariants.length} /{" "}
                {selectedVariants.length || 5}
              </span>

              <span className="text-sm font-normal text-secondary-foreground text-center">
                Estimated Price: $
                {selectedVariants
                  .reduce(
                    (total, v) => total + parseFloat(v.selling_price || 0),
                    0
                  )
                  .toFixed(2)}
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
      )}
    </>
  );
};

export default BrowseProducts;
