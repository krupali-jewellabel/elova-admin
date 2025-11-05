// "use client";

// import React, { useEffect, useState } from "react";
// import { useCustomMarginProductsColumns } from "@/components/commonPages/MarginSetup/hooks/useCustomMarginProductsColumns";
// import { ListWithCardToggle } from "@/components/common/ui/ListWithCardToggle";
// import { useFilteredStoreData } from "@/components/commonPages/StockSelections/hooks/useFilteredData";
// import { DataGridToolbar } from "@/components/commonPages/DataGridToolBar";
// import {
//   Sheet,
//   SheetBody,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/common/ui/sheet";
// import { ScrollArea } from "@/components/common/ui/scroll-area";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/common/ui/cards/card";

// import ReactApexChart from "react-apexcharts";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/common/ui/table";
// import { Button } from "@/components/common/ui/button";
// import { CalendarRangeIcon } from "lucide-react";
// import MetricBreakdownCard from "@/components/common/ui/cards/MetricBreakdownCard";
// import { Switch } from "@/components/common/ui/switch";
// import ProductCard from "../../ProductManagement/ProductMasterList/ProductCard";
// import { CUSTOM_MARGIN_PRODUCTS, PRODUCTS_IMAGES } from "../constant";
// import { useCrudApi } from "@/hooks/useCrudApi";
// import { useCrudList } from "@/hooks/useCrudList";

// const ByIndividual = ({ product }) => {
//   const [isOrderSheetOpen, setIsOrderSheetOpen] = useState(false);

//   const {
//     list,
//     loading,
//     error,
//     editData,
//     setEditData,
//     setDeleteId,
//     dialogOpen,
//     setDialogOpen,
//     confirmOpen,
//     setConfirmOpen,
//     fetchData,
//     handleDelete,
//   } = useCrudList("/api/pricing-margin/by-product");

//   console.log("list", list);

//   const handleView = (product) => {
//     setSelectedProduct(product);
//     setIsOrderSheetOpen(true);
//   };

//   const columns = useCustomMarginProductsColumns({
//     onClick: () => {},
//     onView: handleView,
//   });

//   const TOP_PERFORMING_STORE = [
//     { label: "Niora", value: "$3,660", color: "#F1416C" },
//     { label: "Elova", value: "$1,820", color: "#50CD89" },
//     { label: "Clara", value: "$250", color: "#E5E7EB" },
//   ];

//   const options = {
//     chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
//     colors: ["#22c55e", "#ef4444"],
//     fill: { type: "solid", opacity: [0.1, 0.2] },
//     stroke: { curve: "smooth", width: 2 },
//     dataLabels: { enabled: false },
//     legend: {
//       position: "top",
//       horizontalAlign: "left",
//       markers: { radius: 12 },
//     },
//     xaxis: {
//       categories: Array.from({ length: 14 }, (_, i) => i * 10),
//       labels: { style: { fontSize: "12px" } },
//     },
//     yaxis: {
//       min: 35,
//       max: 120,
//       tickAmount: 5,
//       labels: { style: { fontSize: "12px" } },
//     },
//     tooltip: { shared: true, intersect: false },
//   };

//   const series = [
//     {
//       name: "Views",
//       data: [80, 90, 85, 70, 65, 60, 80, 90, 88, 100, 95, 85, 70, 65],
//     },
//     {
//       name: "Orders",
//       data: [60, 70, 65, 55, 50, 40, 60, 65, 66, 75, 70, 60, 50, 45],
//     },
//   ];

//   // const CustomMarginProducts = ({ open, closeProductDetailSheet, product }) => {
//   const productData = product || {
//     designNo: "123",
//     category: "N/A",
//     style: "N/A",
//     shape: "N/A",
//     plan: "N/A",
//     collection: "N/A",
//     basePrice: "N/A",
//     gender: "N/A",
//     createdAt: "N/A",
//     lastUpdatedDate: "N/A",
//     grossWeight: "N/A",
//     netWeight: "N/A",
//     diamondWeight: "N/A",
//     diamondPiece: "N/A",
//     metal: "N/A",
//     diamond: "N/A",
//     laborRate: "N/A",
//     laborPrice: "N/A",
//     totalPrice: "N/A",
//     active: <Switch size="sm" />,
//   };

//   const detailsArray = [
//     { text: "Design No", info: productData.designNo },
//     { text: "Category", info: productData.category },
//     { text: "Style", info: productData.style },
//     { text: "Shape", info: productData.shape },
//     { text: "Plan", info: productData.plan },
//     { text: "Collection", info: productData.collection },
//     { text: "Base Price", info: productData.basePrice },
//     { text: "Gender", info: productData.gender },
//     { text: "Created At", info: productData.createdAt },
//     { text: "Last Updated", info: productData.lastUpdatedDate },
//     { text: "Gross Weight", info: productData.grossWeight },
//     { text: "Net Weight", info: productData.netWeight },
//     { text: "Diamond Weight", info: productData.diamondWeight },
//     { text: "Diamond Piece", info: productData.diamondPiece },
//     { text: "Metal", info: productData.metal },
//     { text: "Diamond", info: productData.diamond },
//     { text: "Labor Rate", info: productData.laborRate },
//     { text: "Labor Price", info: productData.laborPrice },
//     { text: "Total Price", info: productData.totalPrice },
//   ];

//   const statistics = [
//     { total: "8,924", description: "Total Views" },
//     { total: "10,1,154", description: "Total Add-to-Carts" },
//     { total: "397", description: "Total Orders" },
//     { total: "4.45%", description: "Conversion Rate" },
//     { total: "1.7%", description: "Return Rate" },
//     { total: "2,310", description: "Most Viewed by Niora" },
//     { total: "123", description: "Highest Seller Elova" },
//     { total: "38 Days", description: "Avg. Time Listed" },
//     { total: "10", description: "Days Until Next Bill" },
//     { total: "17 Aug, 2024", description: "Last Bill Date" },
//     { total: "17 Aug, 2024", description: "Next Bill Date" },
//   ];

//   const tables = [
//     {
//       srNo: "1",
//       material: "Metal",
//       metal: "Gold",
//       shape: "",
//       quality: "14K",
//       color: "R",
//       size: "",
//       setting: "",
//       pieces: "",
//       weight: "2.4",
//       rate: "5798.28",
//       amount: "13914.87",
//     },
//   ];

//   const renderItem = (table, index) => (
//     <TableRow key={index}>
//       <TableCell>{table.srNo}</TableCell>
//       <TableCell className="text-end">{table.material}</TableCell>
//       <TableCell className="text-end">{table.metal}</TableCell>
//       <TableCell className="text-end">{table.shape}</TableCell>
//       <TableCell className="text-end">{table.quality}</TableCell>
//       <TableCell className="text-end">{table.color}</TableCell>
//       <TableCell className="text-end">{table.size}</TableCell>
//       <TableCell className="text-end">{table.setting}</TableCell>
//       <TableCell className="text-end">{table.pieces}</TableCell>
//       <TableCell className="text-end">{table.weight}</TableCell>
//       <TableCell className="text-end">{table.rate}</TableCell>
//       <TableCell className="text-end">${table.amount}</TableCell>
//     </TableRow>
//   );

//   const renderProductPerformance = (statistic, index) => (
//     <div
//       key={index}
//       className="flex flex-col gap-1.5 px-2.75 py-2.25 border border-dashed border-input rounded-md"
//     >
//       <span className="text-mono text-sm leading-none font-medium">
//         {statistic.total}
//       </span>
//       <span className="text-secondary-foreground text-xs">
//         {statistic.description}
//       </span>
//     </div>
//   );

//   const handleButtonClick = () => {
//     console.log("Navigate to date selector");
//   };

//   return (
//     <>
//       {/* LIST VIEW */}
//       <div className="mt-5">
//         <ListWithCardToggle
//           title="Custom Margin Products"
//           // data={CUSTOM_MARGIN_PRODUCTS}
//           data={Array.isArray(list) ? list : []}
//           columns={columns}
//           useFilteredData={useFilteredStoreData}
//           ToolbarComponent={DataGridToolbar}
//           renderCardView={(item) => (
//             <ProductCard
//               key={item.id}
//               {...item}
//               title={item.title}
//               onClick={() => handleView(item)}
//             />
//           )}
//         />
//       </div>

//       {/* SHEET VIEW */}

//     </>
//   );
// };

// export default ByIndividual;

"use client";

import { useCrudList } from "@/hooks/useCrudList";
import React, { useState } from "react";
import { useCustomMarginProductsColumns } from "../../MarginSetup/hooks/useCustomMarginProductsColumns";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import ProductCard from "../../ProductManagement/ProductMasterList/ProductCard";

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
      // onClick={() => {
      //   setOpenProductDetailSheet(true);
      //   setSelectedProductId(item.id);
      // }}
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
  });

  const filterOptions = (data, query) => {
    const searchLower = query.toLowerCase();

    return data.filter((item) => {
      const category = item?.category?.toLowerCase() || "";

      return category.includes(searchLower);
    });
  };

  if (loading) return <ContentLoader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="By Individual"
        data={Array.isArray(list) ? list : []}
        columns={columns}
        filterOptions={filterOptions}
        renderCardView={renderStoreCardsView}
        filterDropdownProps={{
          value: selectedRole,
          onChange: setSelectedRole,
          options: [
            { id: "all", name: "All Roles" },
            { id: "admin", name: "Admin" },
            { id: "vendor", name: "Vendor" },
          ],
          placeholder: "Filter by role",
        }}
        filterFunction={filterOptions}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          fetchData(query);
        }}
      />

      {/* <ProductCardView
        open={openProductDetailSheet}
        onClose={() => setOpenProductDetailSheet(false)}
        products={editData}
        productId={selectedProductId}
      /> */}
    </>
  );
};

export default ByIndividual;
