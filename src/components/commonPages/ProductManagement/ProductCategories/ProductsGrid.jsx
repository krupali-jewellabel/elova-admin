"use client";

import React from "react";
import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { Checkbox } from "@/components/common/ui/checkbox";
import { ImageWithFallback } from "@/components/common/ui/ImageWithFallback";
import { Label } from "@/components/common/ui/label";
import { Separator } from "@/components/common/ui/separator";
import { Edit, Eye, Info } from "lucide-react";
import { Card } from "@/components/common/ui/cards/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/common/ui/tooltip";

const ProductsGrid = ({
  products = [],
  selectedProducts = [],
  hoveredProduct,
  setHoveredProduct,
  handleSelectAll,
  handleProductSelect,
}) => {
  return (
    <div className="mt-6">
      {/* Select All */}
      {products.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            checked={selectedProducts.length === products.length}
            onCheckedChange={handleSelectAll}
            id="select-all"
          />
          <Label htmlFor="select-all" className="text-sm cursor-pointer">
            Select All ({products.length})
          </Label>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden rounded-xl border hover:shadow-xl hover:border-primary transition-all group"
          >
            {/* Product Image */}
            <div
              className="relative h-80 bg-gray-100 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <ImageWithFallback
                src={
                  hoveredProduct === product.id
                    ? product.hoverImage
                    : product.image
                }
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Checkbox */}
              <div className="absolute top-3 left-3 z-10">
                <div className="w-6 h-6 bg-white/95 rounded-lg shadow-lg flex items-center justify-center backdrop-blur-sm">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => handleProductSelect(product.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-lg h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-md"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-lg h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-md"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              {/* Collection Badge */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <Badge className="bg-white/95 text-gray-900 border-0 backdrop-blur-sm shadow-lg text-xs">
                  {product.collection}
                </Badge>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3">
              {/* Title + Code */}
              <div>
                <h3 className="text-gray-900 line-clamp-1 mb-1 text-[16px]">
                  {product.title}
                </h3>
                <code className="text-[12px] px-2 py-0.5 rounded-md border border-gray-300 bg-gray-50">
                  {product.designNumber}
                </code>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="px-2 py-0.5">{product.diamondShape}</span>

                <span className="px-2 py-0.5">{product.style}</span>

                <span className="px-2 py-0.5 rounded-md border border-gray-300 bg-gray-50">
                  {product.category}
                </span>
              </div>

              {/* Diamond Info */}
              <p className="text-[11px]">{product.diamondInfo}</p>

              {/* Metal Options */}
              <div className="flex flex-wrap gap-1">
                {product.metalOptions.slice(0, 2).map((metal, index) => (
                  <span
                    key={index}
                    className="text-[10px] px-2 py-0.5 rounded-md border border-gray-300 bg-gray-50"
                  >
                    {metal.replace("18K ", "").replace(" Gold", "")}
                  </span>
                ))}

                {product.metalOptions.length > 2 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md border border-gray-300 bg-gray-50">
                    +{product.metalOptions.length - 2}
                  </span>
                )}
              </div>
              <Separator />

              {/* Pricing */}
              <TooltipProvider>
                <div className="space-y-1.5">
                  {/* MRP */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-between items-center cursor-help">
                        <span className="text-xs flex items-center gap-1">
                          MRP <Info className="w-2.5 h-2.5" />
                        </span>
                        <span className="text-xs text-gray-900">
                          ₹{(product.mrp / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                      <p className="text-xs">
                        Market Retail Price - Suggested price
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  {/* PRP */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-between items-center cursor-help">
                        <span className="text-xs text-green-700 flex items-center gap-1">
                          PRP <Info className="w-2.5 h-2.5" />
                        </span>
                        <span className="text-xs text-green-700">
                          ₹{(product.prp / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                      <p className="text-xs">
                        Partner Retail Price - Your cost
                      </p>
                    </TooltipContent>
                  </Tooltip>

                  {/* SRP */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-between items-center px-2 py-1.5 bg-gradient-to-r rounded-lg border border-[#C2A676]/20 cursor-help">
                        <span className="text-xs text-[#C2A676] flex items-center gap-1">
                          SRP <Info className="w-2.5 h-2.5" />
                        </span>
                        <span className="text-sm text-[#C2A676]">
                          ₹{product.srp.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                      <p className="text-xs">
                        Store Retail Price - Selling price
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
