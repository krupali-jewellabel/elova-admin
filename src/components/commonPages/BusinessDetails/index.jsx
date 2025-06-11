"use client";
import { Button } from "@/components/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/cards/card";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import React, { useEffect, useState } from "react";

const BusinessDetails = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setMessage(data.message);
    };

    fetchData();
  }, []);

  console.log("message", message);
  return (
    <Card className="pb-2.5 w-full h-full justify-center">
      <div className="text-center mb-[32px] text-xl font-medium leading-none">
        Business Details
      </div>
      <div className="grid gap-5 lg:gap-7.5 xl:w-[38.75rem] w-full mx-auto">
        <CardContent className="grid gap-5">
          <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full">
              What is your official business name?
            </Label>
            <Input
              type="text"
              // value={nameInput}
              // onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g., Sparkle Gems Pvt. Ltd."
            />
          </div>
          <div className="w-full">
            <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <Label className="flex w-full items-center gap-1">
                What type of business do you run?
              </Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Spain</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full">
              Your GSTIN / PAN (for India only)
            </Label>
            <Input type="text" placeholder="e.g., 27ABCDE1234F1Z5" />
          </div>
          <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full">Business Email Address</Label>
            <Input
              type="text"
              // value={emailInput}
              // onChange={(e) => setEmailInput(e.target.value)}
              placeholder="email@email.com"
            />
          </div>
          <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full">
              Contact Number (WhatsApp Preferred)
            </Label>
            <Input
              type="text"
              // value={addressInput}
              // onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Contact Number"
            />
          </div>
          <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full">Business Address</Label>
            <Input
              type="text"
              // value={addressInput}
              // onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Address"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-10">
            <Button variant="ghost">Save Draft</Button>
            <Button variant="outline">Previous</Button>
            <Button>Next</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default BusinessDetails;
