// "use client";

// import React from 'react'
// import { useCustomMarginProductsColumns } from "@/components/commonPages/MarginSetup/hooks/useCustomMarginProductsColumns";
// import { CUSTOM_MARGIN_PRODUCTS } from './constant';
// import { ListWithCardToggle } from "@/components/common/ui/ListWithCardToggle";
// import { useFilteredStoreData } from "@/components/commonPages/StockSelections/hooks/useFilteredData";
// import { DataGridToolbar } from "@/components/commonPages/DataGridToolBar";
// import Link from "next/link";
// import { Button } from '@/components/common/ui/button';
// import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle } from '@/components/common/ui/sheet';

// export const CustomMarginProducts = () => {
//     const columns = useCustomMarginProductsColumns();

//     return (
//         <>
//             <div className="mt-5">
//                 <ListWithCardToggle
//                     title="Custom Margin Products"
//                     data={CUSTOM_MARGIN_PRODUCTS}
//                     columns={columns}
//                     useFilteredData={useFilteredStoreData}
//                     ToolbarComponent={DataGridToolbar}
//                 />
//             </div>

//             <div className="flex flex-col md:flex-row justify-end items-end gap-3 mt-8 px-4">
//                 <Link href="#" className="w-full md:w-auto">
//                     <Button variant="outline" className="w-full">Save Draft</Button>
//                 </Link>

//                 <Link href="#" className="w-full md:w-auto">
//                     <Button variant="outline" className="w-full bg-[#F1F1F2]">Previous</Button>
//                 </Link>

//                 <Link href="#" className="w-full md:w-auto">
//                     <Button className="w-full">Next</Button>
//                 </Link>
//             </div>

//             <Sheet open={openSheet} onOpenChange={setOpenSheet}>
//                 <SheetContent
//                     className="sm:w-[720px] fixed right-0 top-0 h-full p-0 border-l border-border animate-in slide-in-from-right-40 duration-300"
//                 >
//                     <SheetHeader className="border-b py-3.5 px-5">
//                         <SheetTitle>Product Detail</SheetTitle>
//                     </SheetHeader>
//                     <SheetBody className="px-5 py-4 overflow-y-auto">
//                         {selectedProduct ? (
//                             <div className="space-y-3">
//                                 <img
//                                     src={selectedProduct.productImg}
//                                     alt={selectedProduct.title}
//                                     className="w-full rounded-md"
//                                 />
//                                 <div>
//                                     <strong>Design No:</strong> {selectedProduct.designNo}
//                                 </div>
//                                 <div>
//                                     <strong>Title:</strong> {selectedProduct.title}
//                                 </div>
//                                 <div>
//                                     <strong>Jewellabel Price:</strong>{" "}
//                                     {selectedProduct.jewellabelPrice}
//                                 </div>
//                                 <div>
//                                     <strong>Niora Price:</strong> {selectedProduct.nioraPrice}
//                                 </div>
//                                 <div>
//                                     <strong>Margin:</strong> {selectedProduct.margin}%
//                                 </div>
//                             </div>
//                         ) : (
//                             <p>No product selected</p>
//                         )}
//                     </SheetBody>
//                 </SheetContent>
//             </Sheet>

//         </>
//     );
// };

// export default CustomMarginProducts;


"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCustomMarginProductsColumns } from "@/components/commonPages/MarginSetup/hooks/useCustomMarginProductsColumns";
import { CUSTOM_MARGIN_PRODUCTS } from "./constant";
import { ListWithCardToggle } from "@/components/common/ui/ListWithCardToggle";
import { useFilteredStoreData } from "@/components/commonPages/StockSelections/hooks/useFilteredData";
import { DataGridToolbar } from "@/components/commonPages/DataGridToolBar";
import { Button } from "@/components/common/ui/button";
import {
    Sheet,
    SheetBody,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/common/ui/sheet";
import { ScrollArea } from "@/components/common/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/common/ui/cards/card";
import { TwoColCard } from "@/components/common/ui/cards/TwoColCard";

export const CustomMarginProducts = () => {
    const [orderListView, onCloseSheet] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenSheet = (product) => {
        setSelectedProduct(product);
        onCloseSheet(true);
    };

    const columns = useCustomMarginProductsColumns(handleOpenSheet);

    return (
        <>
            <div className="mt-5">
                <ListWithCardToggle
                    title="Custom Margin Products"
                    data={CUSTOM_MARGIN_PRODUCTS}
                    columns={columns}
                    useFilteredData={useFilteredStoreData}
                    ToolbarComponent={DataGridToolbar}
                    onRowClick={handleOpenSheet}
                />
            </div>

            <div className="flex flex-col md:flex-row justify-end items-end gap-3 mt-8 px-4">
                <Link href="#" className="w-full md:w-auto">
                    <Button variant="outline" className="w-full">
                        Save Draft
                    </Button>
                </Link>
                <Link href="#" className="w-full md:w-auto">
                    <Button variant="outline" className="w-full bg-[#F1F1F2]">
                        Previous
                    </Button>
                </Link>
                <Link href="#" className="w-full md:w-auto">
                    <Button className="w-full">Next</Button>
                </Link>
            </div>

            {/* Sliding Sheet for Product Detail */}
            {/* <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetContent className="sm:w-[720px] fixed right-0 top-0 h-full p-0 border-l border-border animate-in slide-in-from-right-40 duration-300">
                    <SheetHeader className="border-b py-3.5 px-5">
                        <SheetTitle>Product Detail</SheetTitle>
                    </SheetHeader>
                    <SheetBody className="px-5 py-4 overflow-y-auto">
                        {selectedProduct ? (
                            <div className="space-y-3">
                                <img
                                    src={selectedProduct.productImg}
                                    alt={selectedProduct.title}
                                    className="w-full rounded-md"
                                />
                                <div>
                                    <strong>Design No:</strong> {selectedProduct.designNo}
                                </div>
                                <div>
                                    <strong>Title:</strong> {selectedProduct.title}
                                </div>
                                <div>
                                    <strong>Jewellabel Price:</strong>{" "}
                                    {selectedProduct.jewellabelPrice}
                                </div>
                                <div>
                                    <strong>Niora Price:</strong> {selectedProduct.nioraPrice}
                                </div>
                                <div>
                                    <strong>Margin:</strong> {selectedProduct.margin}%
                                </div>
                            </div>
                        ) : (
                            <p>No product selected</p>
                        )}
                    </SheetBody>
                </SheetContent>
            </Sheet> */}
            {/* <Sheet open={orderListView} onOpenChange={onCloseSheet}>
                <SheetContent className="sm:w-[720px] inset-5 start-auto h-auto rounded-lg p-0 sm:max-w-none [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
                    <SheetHeader className="border-b py-3.5 px-5 border-border">
                        <SheetTitle>Order Info</SheetTitle>
                    </SheetHeader>
                    <SheetBody className="px-5 py-0">
                        <ScrollArea className="h-[calc(100dvh-11.5rem)] pe-3 -me-3">
                            <div className="grid xl:grid-cols-1 gap-5 lg:gap-9">
                                <div className="lg:col-span-1">
                                    <Card>
                                        <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                                            {[
                                                ["Order ID", "X319330-S24"],
                                                ["Order placed", "26 June, 2025"],
                                                ["Total", "$512.60"],
                                                ["Ship to", "Jeroen van Dijk"],
                                                ["Estimated Delivery", "07 July, 2025"],
                                            ].map(([label, value], i) => (
                                                <div key={i}>
                                                    <span className="text-xs text-secondary-foreground">
                                                        {label}
                                                    </span>
                                                    <div className="text-sm font-medium">{value}</div>
                                                </div>
                                            ))}
                                        </CardHeader>
                                        <CardContent className="p-5 lg:p-7.5 space-y-5">
                                            <TwoColCard items={CUSTOM_MARGIN_PRODUCTS} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </ScrollArea>
                    </SheetBody>
                </SheetContent>
            </Sheet> */}
        </>
    );
};

export default CustomMarginProducts;

