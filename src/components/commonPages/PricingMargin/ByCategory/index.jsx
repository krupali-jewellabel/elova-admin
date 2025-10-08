"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/common/ui/cards/card";
import { Button } from "@/components/common/ui/button";
import { Label } from "@/components/common/ui/label";
import { Slider, SliderThumb } from "@/components/common/ui/slider";
import { Badge } from "@/components/common/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/common/ui/select";
import { useCrudApi } from "@/hooks/useCrudApi";
import { toTitleCase } from "@/lib/utils";
import MarginCard from "./MarginCard";
import { toast } from "sonner";

/* -------------------- SelectField -------------------- */
const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col gap-2.5">
    <Label className="w-full max-w-56">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt, idx) => (
          <SelectItem key={`${opt.value}-${idx}`} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

/* -------------------- SliderField -------------------- */
const SliderField = ({ label, value, onChange, disabled }) => (
  <div className="flex flex-col gap-2.5">
    <div className="flex justify-between">
      <Label>{label}</Label>
      <Badge size="md" appearance="outline">
        {value}%
      </Badge>
    </div>
    <Slider
      value={[value]}
      onValueChange={([val]) => onChange(val)}
      disabled={disabled}
      max={10}
      min={0}
      step={1}
    >
      <SliderThumb />
    </Slider>
  </div>
);

/* -------------------- Main Component -------------------- */
const ByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [productPricingList, setProductPricingList] = useState([]);
  const [marginPercentage, setMarginPercentage] = useState(0);

  const { fetchAll: getCategories } = useCrudApi(
    "/api/pricing-margin/by-category/categories"
  );
  const { fetchAll: getByCategory, create } = useCrudApi(
    "/api/pricing-margin/by-category"
  );

  /* Fetch categories only once */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cat = await getCategories();
        const list = cat?.data || [];
        setCategories(list);

        // Auto-select the first category
        if (list.length && !selectedCat) {
          setSelectedCat(String(list[0].id));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [getCategories]);

  /* Fetch product list only when a valid category is selected */
  useEffect(() => {
    if (!selectedCat) return;

    const fetchProducts = async () => {
      try {
        const res = await getByCategory({ category_id: selectedCat });
        setProductPricingList(res?.products || []);
      } catch (error) {
        console.error("Error fetching product pricing:", error);
      }
    };

    fetchProducts();
  }, [selectedCat, getByCategory]);

  /* Save margin changes */
  const handleSaveChanges = async () => {
    if (!selectedCat) {
      toast.error("Please select a category first.");
      return;
    }

    try {
      const payload = {
        margin_type: 1,
        store_margin: 10,
        categories: [
          {
            category_id: Number(selectedCat),
            store_margin: marginPercentage,
          },
        ],
      };

      await create(payload);
      toast.success("Margin configuration saved successfully!");
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error("Failed to save configuration.");
    }
  };

  /* Render product cards */
  const renderedMarginCards = productPricingList.map((item, index) => (
    <MarginCard
      key={item?.id || `product-${index}`}
      productImg={item?.image}
      designNo={item?.design_number}
      category={item?.category_name}
      diamondStorePrice={item?.diamond_store_price}
      diamondSellingPrice={item?.diamond_selling_price}
      metalStorePrice={item?.metal_store_price}
      metalSellingPrice={item?.metal_selling_price}
      labourStorePrice={item?.labour_store_price}
      labourSellingPrice={item?.labour_selling_price}
      totalStorePrice={item?.total_store_price}
      totalSellingPrice={item?.total_selling_price}
    />
  ));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        {/* LEFT PANEL */}
        <div>
          <Card className="mt-13 fixed w-[18%]">
            <CardHeader>Pricing Margin Configuration</CardHeader>
            <CardContent>
              <div className="space-y-6">
                <SelectField
                  label="Categories"
                  value={selectedCat}
                  onChange={setSelectedCat}
                  options={categories.map((cat) => ({
                    label: toTitleCase(cat.name),
                    value: String(cat.id),
                  }))}
                />

                {selectedCat && (
                  <SliderField
                    label={`${toTitleCase(
                      categories.find((cat) => String(cat.id) === selectedCat)
                        ?.name
                    )} Margin (%)`}
                    value={marginPercentage}
                    onChange={setMarginPercentage}
                  />
                )}

                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {renderedMarginCards}
        </div>
      </div>
    </>
  );
};

export default ByCategory;
