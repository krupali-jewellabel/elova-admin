"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/cards/card";
import { STOCK_DETAIL } from "./constant";
import { ListWithCardToggle } from "@/components/common/ui/ListWithCardToggle";
import { useStockSelections } from "@/components/commonPages/StockSelections/hooks/useStockSelections";
import { DataGridToolbar } from "@/components/commonPages/DataGridToolBar";
import { useFilteredStoreData } from "@/components/commonPages/StockSelections/hooks/useFilteredData";
import { Button } from "@/components/common/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
    Sheet,
    SheetBody,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/common/ui/sheet";
import { ScrollArea } from "@/components/common/ui/scroll-area";
import { TwoColCard } from "@/components/common/ui/cards/TwoColCard";
import { STOCK_PRODUCT_DETAIL } from "@/components/commonPages/StockSelections/constant";

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
                <div className="text-sm font-medium text-muted-foreground">{product.id}</div>
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

// Main StockSelections component
const StockSelections = ({ product }) => {
    const [orderListView, onCloseSheet] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleView = (product) => {
        setSelectedProduct(product);
        onCloseSheet(true);
    };

    const columns = useStockSelections({ onClick: handleView });

    const renderStoreCardsView = (item, index) => (
        <ProductCard
            key={item.id}
            variantsimg={item.variantsimg}
            name={item.name}
            baseprice={item.baseprice}
            defaultmargin={item.defaultmargin}
            sellingprice={item.sellingprice}
            metal={item.metal}
            active={item.active}
            onClick={() => handleView(item)}
        />
    );

    return (
        <>
            <Card className="w-full">
                <div className="flex flex-col lg:flex-row w-full p-6 gap-6">
                    {/* Left: Product Image & Info */}
                    <div className="w-full lg:w-[280px] shrink-0 flex flex-col items-start justify-center">
                        <img
                            src={selectedProduct?.image || product[0]?.image}
                            alt={selectedProduct?.title || product[0]?.title || "Product Image"}
                            className="rounded-lg h-[240px] object-contain mb-4 border border-muted/30 shadow-sm"
                        />

                        <div className="text-sm text-muted-foreground">
                            {selectedProduct?.id || product[0]?.id}
                        </div>

                        <CardTitle className="text-lg font-semibold mt-1">
                            {selectedProduct?.title || product[0]?.title}
                        </CardTitle>

                        <div className="text-sm text-muted-foreground mt-4 space-y-4">
                            <p>
                                <span className="font-medium text-foreground">Style:</span>{" "}
                                <span className="text-[#27314B]">{selectedProduct?.style || product[0]?.style}</span>
                            </p>
                            <p>
                                <span className="font-medium text-foreground">Collection:</span>{" "}
                                <span className="text-[#27314B]">{selectedProduct?.collection || product[0]?.collection}</span>
                            </p>
                            <p>
                                <span className="font-medium text-foreground">Category:</span>{" "}
                                <span className="text-[#27314B]">{selectedProduct?.category || product[0]?.category}</span>
                            </p>
                        </div>
                    </div>


                    {/* Right: Variant List Table */}
                    <div className="flex-1 overflow-x-auto">
                        <ListWithCardToggle
                            title="Select Variants"
                            data={STOCK_DETAIL}
                            columns={columns}
                            useFilteredData={useFilteredStoreData}
                            ToolbarComponent={DataGridToolbar}
                            renderCardView={renderStoreCardsView}
                        />
                    </div>
                </div>

                <Card className="m-4">
                    <CardHeader >
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
            </Card>


            {/* Final Action Footer */}
            <Card className="w-full mt-4">
                <CardHeader className="sticky top-0 z-10 bg-white py-5 px-6 shadow-sm border border-[#F15A29] rounded-md">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                        <span className="flex items-center gap-x-2 text-sm font-normal text-secondary-foreground">
                            Total Products Selected: 45
                            <img src="/images/information-2.svg" alt="Information" className="w-4 h-4" />
                        </span>

                        <span className="text-sm font-normal text-secondary-foreground text-center">
                            Budget Used: <span className="font-semibold">15,45,000 / 4,00,00,000</span>
                        </span>

                        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                            <Link href="#" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto">Save Draft</Button>
                            </Link>
                            <Link href="#" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto bg-[#F1F1F2]">Previous</Button>
                            </Link>
                            <Link href="#" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto bg-[#F15A29] text-white">Next</Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Sheet open={orderListView} onOpenChange={onCloseSheet}>
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
                                            <TwoColCard items={STOCK_PRODUCT_DETAIL} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </ScrollArea>
                    </SheetBody>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default StockSelections;
