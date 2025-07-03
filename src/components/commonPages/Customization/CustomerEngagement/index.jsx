"use client";

import React from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent } from "@/components/common/ui/cards/card";
import { RadioGroup, RadioGroupItem } from "@/components/common/ui/radio-group";
import { Label } from "@/components/common/ui/label";
import { Button } from "@/components/common/ui/button";
import { Checkbox } from "@/components/common/ui/checkbox";

export const CustomerEngagement = () => {
  const form = useForm();

  return (
    <Card className={"w-full p-6"}>
      <CardContent>
        <h2 className="text-center text-2xl font-semibold mb-6">
          Customer Engagement
        </h2>
        <FormProvider {...form}>
          <form>
            <div className="flex flex-col gap-3.5">
              <span className="text-base font-medium text-mono pb-0.5">
                Newsletter Subscription
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
                Contact Form Fields
              </span>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Name
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Phone Number
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" />
                <Label htmlFor="policy-own" variant="secondary">
                  Message
                </Label>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 mt-7">
              <span className="text-base font-medium text-mono pb-0.5">
                Live Chat Integration
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
                Social Proof Elements
              </span>
              <RadioGroup
                defaultValue="intermediate"
                className="flex flex-row gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="own" id="policy-own" />
                  <Label htmlFor="policy-own" variant="secondary">
                    Customer Reviews
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="help" id="policy-help" />
                  <Label htmlFor="policy-help" variant="secondary">
                    Instagram Gallery
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="help" id="policy-help" />
                  <Label htmlFor="policy-help" variant="secondary">
                    Both
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-3.5 mt-7">
              <span className="text-base font-medium text-mono pb-0.5">
                Loyalty/Referral Program
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
                Pop-ups or Offers
              </span>
              <div className="flex items-center space-x-2">
                <RadioGroup defaultValue="intermediate">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" />
                    <Label variant="secondary">Yes</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox value="own" id="policy-own" className="ml-5" />
                <Label htmlFor="policy-own" variant="secondary">
                  First order discount
                </Label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mb-5 mr-3 mt-5">
              <Link href="#" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  Save Draft
                </Button>
              </Link>
              <Link href="/product-shopping-experience" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-[#F1F1F2]"
                >
                  Previous
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button >Submit</Button>
              </Link>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default CustomerEngagement;
