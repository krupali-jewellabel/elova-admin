"use client";

import React, { useEffect, useState } from "react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { useSelectionColumns } from "../hooks/useSelectionColumns";
import { useCrudApi } from "@/hooks/useCrudApi";
import { Button } from "@/components/common/ui/button";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";

const SelectionProducts = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [bestSellerIds, setBestSellerIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useSelectionColumns(bestSellerIds);

  const { create } = useCrudApi("/api/product-management/selection-products");

  const storeId = localStorage.getItem("storeId");
  const collectionId = params.id; // Replace with dynamic value if needed
  const SORT_ORDER = 5; // Replace with dynamic value if needed

  // Fetch existing best sellers
  useEffect(() => {
    const fetchBestSellers = async () => {
      setLoading(true);
      try {
        // API requires POST with payload
        const data = await create({
          store_id: storeId,
          collection_id: collectionId,
          product_ids: [],
          sort_order: SORT_ORDER,
        });

        const ids = data.product_ids || [];
        setBestSellerIds(ids);

        // Map IDs to product objects (replace with real fetch if available)
        const productsData = ids.map((id) => ({
          id,
          name: `Product #${id}`,
          price: `$${id * 10}`,
          category: "Rings",
        }));

        setProducts(productsData);
      } catch (err) {
        console.error("Failed to fetch best sellers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, [create]);

  // Simulate selecting new products
  const handleSelectProduct = (productId) => {
    setBestSellerIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Save updated best sellers
  const handleSave = async () => {
    if (bestSellerIds.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        store_id: STORE_ID,
        collection_id: COLLECTION_ID,
        product_ids: bestSellerIds,
        sort_order: SORT_ORDER,
      };

      const res = await create(payload);

      if (!res.status) {
        toast.error(res.message || "Failed to save best sellers");
        console.error(res.error);
      } else {
        toast.success("Best sellers saved successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong while saving best sellers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <ListWithCardToggle
        title="Selection Products"
        data={products}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default SelectionProducts;
