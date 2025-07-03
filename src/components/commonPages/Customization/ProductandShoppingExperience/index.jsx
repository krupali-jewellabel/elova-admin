"use client";

import React from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent } from "@/components/common/ui/cards/card";
import { RadioGroup, RadioGroupItem } from "@/components/common/ui/radio-group";
import { Label } from "@/components/common/ui/label";
import { Button } from "@/components/common/ui/button";
import { Checkbox } from "@/components/common/ui/checkbox";

export const ProductandShoppingExperience = () => {
  const form = useForm();

  return (
    <Card className={"w-full p-6"}>
      <CardContent>
        <h2 className="text-center text-2xl font-semibold mb-6">
          Product & Shopping Experience
        </h2>
        <FormProvider {...form}>
          <form>
            <div className="flex flex-col gap-3.5">
              <span className="text-base font-medium text-mono pb-0.5">
                Custom Order Option
              </span>
              <div className="flex flex-col items-start gap-4">
                <RadioGroup defaultValue="intermediate">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" />
                    <Label variant="secondary">Yes</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 mt-7">
              <span className="text-base font-medium text-mono">
                Product Filtering Options
              </span>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Category
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Price Range
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Material
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Gemstone
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Occasion
                </Label>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 mt-7">
              <span className="text-base font-medium text-mono pb-0.5">
                Related Products Display
              </span>
              <div className="flex flex-col items-start gap-4">
                <RadioGroup defaultValue="intermediate">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" />
                    <Label variant="secondary">Yes</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 mt-7">
              <span className="text-base font-medium text-mono pb-0.5">
                Out-of-Stock Handling
              </span>
              <RadioGroup
                defaultValue="intermediate"
                className="flex flex-row gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="own" id="policy-own" />
                  <Label htmlFor="policy-own" variant="secondary">
                    Hide product
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="help" id="policy-help" />
                  <Label htmlFor="policy-help" variant="secondary">
                    Show “Out of Stock”
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="help" id="policy-help" />
                  <Label htmlFor="policy-help" variant="secondary">
                    Allow backorders
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-3.5 mt-7">
              <span className="text-base font-medium text-mono pb-0.5">
                Currency Preferences
              </span>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  USD
                </Label>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 mt-7">
              <span className="text-base font-medium text-mono pb-0.5">
                Payment Methods
              </span>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Credit/Debit Cards
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  PayPal
                </Label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mb-5 mr-3 mt-5">
              <Link href="#" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  Save Draft
                </Button>
              </Link>
              <Link href="/policies" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-[#F1F1F2]"
                >
                  Previous
                </Button>
              </Link>
              <Link href="customer-engagement" className="w-full sm:w-auto">
                <Button>Next</Button>
              </Link>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ProductandShoppingExperience;
