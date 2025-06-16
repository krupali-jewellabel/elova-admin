"use client";

import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/common/ui/cards/card";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { Switch } from "@/components/common/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/common/ui/radio-group";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/common/ui/select";
import Link from "next/link";
import { Button } from "@/components/common/ui/button";

export const StoreSettingsAndLaunchPrep = () => {
    const [diamondTier, setDiamondTier] = useState("intermediate");
    const [accounttype, setAccountType] = useState("savings");

    const RadioGroupField = ({ label, value, onChange, options }) => (
        <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">{label}</Label>
            <RadioGroup value={value} onValueChange={onChange} className="flex gap-6">
                {options.map((opt, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={opt.label.toLowerCase()}
                            id={`${label}-${opt.label}`.toLowerCase().replace(/\s/g, "-")}
                        />
                        <Label
                            htmlFor={`${label}-${opt.label}`.toLowerCase().replace(/\s/g, "-")}
                            className="text-sm font-normal"
                        >
                            {opt.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );

    return (
        <div className="flex justify-center px-4 py-10">
            <Card className="w-full max-w-4xl shadow-sm">
                <div className="pt-6 pb-2 text-center">
                    <CardTitle className="text-2xl">Store Settings & Launch Prep</CardTitle>
                </div>

                <CardContent>
                    {/* Contact Info */}
                    <div className="grid gap-6">
                        <CardTitle className="text-base">Store Contact Info:</CardTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contactEmail">Contact Email</Label>
                                <Input id="contactEmail" placeholder="Contact Email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp Support Number:</Label>
                                <Input id="whatsapp" placeholder="WhatsApp Support Number:" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="supportPhoneNumber">Support Phone Number:</Label>
                            <Input id="supportPhoneNumber" placeholder="Support Phone Number:" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="order-notes">
                                Enable Order Notes (gift message, custom instructions)
                            </Label>
                            <Switch id="order-notes" defaultChecked size="sm" />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="gift-packaging">Enable Gift Packaging</Label>
                            <Switch id="gift-packaging" defaultChecked size="sm" />
                        </div>
                    </div>

                    {/* Payment Gateway */}
                    <div className="grid gap-6 mt-5">
                        <CardTitle className="text-base">Payment Gateway Setup</CardTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Do You have a Payment Gateway</Label>
                                <RadioGroupField
                                    value={diamondTier}
                                    onChange={setDiamondTier}
                                    options={[
                                        { label: "Yes" },
                                        { label: "No" },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="gatewayname">Gateway Name:</Label>
                                <Input id="gatewayname" placeholder="Gateway Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="merchantapi">Merchant ID / API Key:</Label>
                                <Input id="merchantapi" placeholder="Merchant ID / API Key" />
                            </div>
                        </div>
                    </div>

                    {/* Payout & Bank Details */}
                    <div className="grid gap-6 mt-5">
                        <CardTitle className="text-base">Payout & Bank Details</CardTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="accountname">Account Holder Name:</Label>
                                <Input id="accountname" placeholder="Account Holder Name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bankname">Bank Name:</Label>
                                <Input id="bankname" placeholder="Bank Name" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="accountnumber">Account Number:</Label>
                                <Input id="accountnumber" placeholder="Account Number" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ifsccode">IFSC Code:</Label>
                                <Input id="ifsccode" placeholder="IFSC Code" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Account Type:</Label>
                                    <RadioGroupField
                                        value={accounttype}
                                        onChange={setAccountType}
                                        options={[
                                            { label: "Savings" },
                                            { label: "Current" },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gstnumber">PAN/GST Number (optional):</Label>
                            <Input id="gstnumber" placeholder="PAN/GST Number (optional)" />
                        </div>
                    </div>

                    {/* International & Localisation */}
                    <div className="grid gap-6 mt-5">
                        <CardTitle className="text-base">International & Localisation</CardTitle>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="internationalorders">Enable International Orders</Label>
                            <Switch id="internationalorders" defaultChecked size="sm" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="defaultcurrency">Default Currency</Label>
                                <Select defaultValue="1">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">₹ / $ / €</SelectItem>
                                        <SelectItem value="2">₹ / $ / €</SelectItem>
                                        <SelectItem value="3">₹ / $ / €</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="defaultlanguage">Default Language</Label>
                                <Select defaultValue="1">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">English, Hindi etc</SelectItem>
                                        <SelectItem value="2">English, Hindi etc</SelectItem>
                                        <SelectItem value="3">English, Hindi etc</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Account Type:</Label>
                                <RadioGroupField
                                    value={accounttype}
                                    onChange={setAccountType}
                                    options={[
                                        { label: "Savings" },
                                        { label: "Current" },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>

                <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mb-5 mr-3">
                    <Link href="#" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto">
                            Save Draft
                        </Button>
                    </Link>
                    <Link href="#" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto bg-[#F1F1F2]">
                            Previous
                        </Button>
                    </Link>
                    <Link href="#" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto bg-[#F15A29] text-white">Next</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default StoreSettingsAndLaunchPrep;
