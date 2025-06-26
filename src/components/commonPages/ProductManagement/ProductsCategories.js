"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/ui/button";
import { SquarePlus, LayoutGrid, List } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/common/ui/toggle-group";
import { userProductListColumns } from "./hooks/userProductListColumns";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { PRODUCT_LIST_DATA } from "./constant";
import { useFilteredStoreData } from "./hooks/useFilteredStoreData";
import { DataGridToolbar } from "@/components/common/DataGridToolBar";
import { Card } from "@/components/common/ui/cards/card";

export const ProductsCategories = () => {
  const [activeView, setActiveView] = useState("cards");

  const categories = [
    { name: "Necklaces", products: "45 Products" },
    { name: "Bracelets", products: "32 Products" },
    { name: "Rings", products: "25 Products" },
    { name: "Earrings", products: "28 Products" },
    { name: "Wedding Bands", products: "45 Products" },
    { name: "Mangalsutra", products: "32 Products" },
    { name: "Pendants", products: "25 Products" },
  ];
  const columns = userProductListColumns();
  const renderCardView = (item) => (
    <StoreCardView
      key={item.id}
      logo={item.logo}
      name={item.name}
      status={item.status}
      products={item.no_of_products}
      budgetUsed={item.budget_used}
      margin={item.margin}
      lastUpdated={item.last_updated}
    />
  );

  return (
    <>
      <div className="flex justify-between items-center p-6">
        <h2 className="text-xl font-semibold">Product Categories</h2>
        <div className="flex items-center gap-4">
          <Button>
            <SquarePlus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
          <ToggleGroup
            type="single"
            value={activeView}
            onValueChange={(value) => value && setActiveView(value)}
          >
            <ToggleGroupItem value="cards" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {activeView === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {categories.map((category, index) => (
            <Card key={index}>
              <div className="relative p-6 flex flex-col items-center justify-center text-center gap-2">
                <img
                  src="/images/icons/files-folders.svg"
                  className="w-16 h-16 flex items-center justify-center mb-4"
                  alt={category.name}
                />
                <div className="absolute bottom-26 right-37 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                <h4 className="text-lg font-medium text-gray-800">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-500">{category.products}</p>
              </div>
              {/* <Link
                href={`/store-detail-view/assign-products/${encodeURIComponent(
                  category.name.toLowerCase().replace(/\s+/g, "-")
                )}`}
                className="relative p-6 flex flex-col items-center justify-center text-center gap-2"
              > */}

              {/* </Link> */}
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-6">
          <ListWithCardToggle
            data={PRODUCT_LIST_DATA}
            columns={columns}
            useFilteredData={useFilteredStoreData}
            ToolbarComponent={DataGridToolbar}
          />
        </div>
      )}
    </>
  );
};

export default ProductsCategories;
