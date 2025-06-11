"use client";

import React from "react";
import { Switch } from "@/components/common/ui/switch";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent } from "@/components/common/ui/cards/card";
import { BellRing, Link, CircleUser, Eye, Gem, LayoutGrid } from "lucide-react";
import { HexagonBadge } from "@/components/common/ui/badges/hexagon-badge";

const productCategories = [
  {
    icon: BellRing,
    title: "Engagement Rings",
    description:
      "Symbolic rings designed to celebrate love and the promise of a lifetime together.",
    actions: <Switch size="sm" id="auto-update" defaultChecked />,
  },
  {
    icon: Link,
    title: "Wedding Bands",
    description:
      "Elegant, timeless bands exchanged during marriage ceremonies to signify unity.",
    actions: <Switch size="sm" id="auto-update" defaultChecked />,
  },
  {
    icon: CircleUser,
    title: "Necklaces",
    description:
      "Graceful pieces worn around the neck to elevate any look with charm and elegance.",
    actions: <Switch size="sm" id="auto-update" defaultChecked />,
  },
  {
    icon: Eye,
    title: "Earrings",
    description:
      "Stylish accents for the ears, adding sparkle and sophistication to every outfit.",
    actions: <Switch size="sm" id="auto-update" defaultChecked />,
  },
  {
    icon: Gem,
    title: "Bracelets",
    description:
      "Chic wrist adornments that blend beauty and craftsmanship effortlessly.",
    actions: <Switch size="sm" id="auto-update" />,
  },
  {
    icon: LayoutGrid,
    title: "Mangalsutra",
    description:
      "A sacred necklace symbolizing marital commitment and cultural heritage.",
    actions: <Switch size="sm" id="auto-update" />,
  },
];

const ProductCategories = () => {
  return (
    <Card className="w-full p-6 sm:p-8 rounded-xl shadow-sm">
      <h2 className="text-center text-xl font-semibold mb-8">
        Product Categories Selection
      </h2>

      <div className="space-y-4 mx-auto">
        {productCategories.map((item, index) => (
          <Card key={index}>
            <CardContent
              key={index}
              className="border-b border-border flex items-center justify-between py-4 gap-2.5"
            >
              <div className="flex items-center gap-3.5">
                <HexagonBadge
                  stroke="stroke-input"
                  fill="fill-muted/30"
                  size="size-[50px]"
                  badge={
                    <item.icon className="text-xl text-muted-foreground" />
                  }
                />

                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                    {item.title}
                  </span>
                  <span className="text-sm text-secondary-foreground">
                    {item.description}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">{item.actions}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-10">
        <Button variant="ghost">Save Draft</Button>
        <Button variant="outline">Previous</Button>
        <Button>Next</Button>
      </div>
    </Card>
  );
};

export default ProductCategories;
