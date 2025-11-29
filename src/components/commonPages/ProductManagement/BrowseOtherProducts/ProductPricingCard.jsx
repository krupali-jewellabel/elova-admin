"use client";

import React, { useEffect, useState } from "react";
import { useCrudApi } from "@/hooks/useCrudApi";
import { Tag, TrendingUp, DollarSign, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/common/ui/badge";

const ProductPricingCard = ({ subCategory, onBack }) => {
  const { fetchAll: fetchPricing } = useCrudApi(
    "/api/product-management/product-price"
  );

  const [products, setProducts] = useState([]);

  const category = subCategory?.category;

  const loadData = async () => {
    const res = await fetchPricing({
      category_id: category?.id, // ⭐ FIXED
      sub_category_id: subCategory?.id, // ⭐ FIXED
      occasion_id: null,
      limit: 10,
    });

    if (res?.status) setProducts(res.data || []);
  };

  useEffect(() => {
    if (category?.id && subCategory?.id) loadData();
  }, [category, subCategory]);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">{subCategory?.name} Products</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-5 space-y-4 rounded-xl bg-white border shadow-sm"
          >
            <div>
              <h3 className="text-gray-900 mb-1 line-clamp-1">
                {product.name}
              </h3>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                {product.sku}
              </code>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Tag className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">MRP</p>
                    <p className="text-sm text-gray-900">
                      ₹{product.mrp?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Base
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">D&L Discount Price</p>
                    <p className="text-sm text-green-700">
                      ₹{product.dlDiscountPrice?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs bg-green-50 text-green-700 border-green-200"
                >
                  -5%
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Store Price</p>
                    <p className="text-sm text-amber-700">
                      ₹{product.storePrice?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs bg-amber-50 text-amber-700 border-amber-200"
                >
                  +5%
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPricingCard;
