"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/common/ui/cards/card";
import {
  ToolbarDescription,
  ToolbarHeading,
} from "@/components/common/ui/toolbar";
import {
  FEATURED_COLLECTIONS,
  NAVIGATION_MENU_STRUCTURE,
  FOOTER_CONTENT,
  BANNER_PREFERENCE,
  PRODUCT_DISPLAY,
} from "./constant";
import { Button } from "@/components/common/ui/button";
import { Checkbox } from "@/components/common/ui/checkbox";

export const ThemeCustomization = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <Card>
      <h2 className="text-center text-2xl font-semibold mb-6 mt-5">
        Website Theme & Layout Customization
      </h2>
      <div className="flex flex-col space-y-4 ps-5">
        <ToolbarHeading className="font-semibold text-lg">
          Homepage Banner Preference
        </ToolbarHeading>
        <ToolbarDescription>
          What type of banner would you like on your homepage?
        </ToolbarDescription>
      </div>
      {BANNER_PREFERENCE?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
          {BANNER_PREFERENCE?.map((work) => {
            const isSelected = selectedId === work.id;
            return (
              <Card
                key={work.id}
                onClick={() => setSelectedId(work.id)}
                className={`relative rounded-lg group cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                  isSelected ? "border-primary" : "border-transparent"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 rounded-full">
                    <img
                      src="/images/customization/right symbol.svg"
                      alt="Selected"
                      className="w-8 h-8"
                      key={work.id}
                      onClick={() => setSelectedId(work.id)}
                    />
                  </div>
                )}
                <div className="aspect-[16/9] relative">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-b-lg">
                  <Button mode="link" className="w-full justify-center">
                    <span className="text-sm font-medium text-foreground flex items-center flex-col">
                      {work.logo && (
                        <img
                          src={work.logo}
                          alt={work.title}
                          className="w-6 h-6 inline-block mr-2"
                        />
                      )}
                      {work.title}
                    </span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <div className="flex flex-col space-y-4 ps-5">
        <ToolbarHeading className="font-semibold text-lg">
          Featured Collections Display
        </ToolbarHeading>
        <ToolbarDescription>
          Which collections should be highlighted on the homepage?
        </ToolbarDescription>
      </div>{" "}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {FEATURED_COLLECTIONS.map((item) => (
            <Card key={item.id} className="p-4 cursor-pointer w-[540px] h-14">
              <span className="text-sm font-medium text-foreground flex gap-3">
                <Checkbox />
                {item.title}
              </span>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-4 ps-5">
        <ToolbarHeading className="font-semibold text-lg">
          Product Display Style
        </ToolbarHeading>
        <ToolbarDescription>
          How should your products be displayed?
        </ToolbarDescription>
      </div>
      {PRODUCT_DISPLAY?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
          {PRODUCT_DISPLAY?.map((work) => {
            const isSelected = selectedId === work.id;
            return (
              <div
                key={work.id}
                onClick={() => setSelectedId(work.id)}
                className={`relative rounded-lg group cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                  isSelected ? "border-primary" : "border-transparent"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 rounded-full">
                    <img
                      src="/images/customization/right symbol.svg"
                      alt="Selected"
                      className="w-8 h-8"
                      key={work.id}
                      onClick={() => setSelectedId(work.id)}
                    />
                  </div>
                )}
                <div className="aspect-[16/9] relative">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-fill absolute"
                  />
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-b-lg">
                  <Button mode="link" className="w-full justify-center">
                    <span className="text-sm font-medium text-foreground flex items-center flex-col">
                      {work.logo && (
                        <img
                          src={work.logo}
                          alt={work.title}
                          className="w-6 h-6 inline-block mr-2"
                        />
                      )}
                      {work.title}
                    </span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-col space-y-4 ps-5">
        <ToolbarHeading className="font-semibold text-lg">
          Navigation Menu Structure
        </ToolbarHeading>
        <ToolbarDescription>
          Which categories should appear in your main navigation?
        </ToolbarDescription>
      </div>{" "}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {NAVIGATION_MENU_STRUCTURE.map((item, index) => (
            <Card key={item.id || index} className="p-4 cursor-pointer h-14">
              <span className="text-sm font-medium text-foreground flex justify-space-between gap-3">
                <Checkbox />
                {item.title}
              </span>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-4 ps-5">
        <ToolbarHeading className="font-semibold text-lg">
          Footer Content
        </ToolbarHeading>
        <ToolbarDescription>
          What would you like to include in your website footer?
        </ToolbarDescription>
      </div>{" "}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {FOOTER_CONTENT.map((item, index) => (
            <Card key={item.id || index} className="p-4 cursor-pointer h-14">
              <span className="text-sm font-medium text-foreground flex justify-space-between gap-3">
                <Checkbox />
                {item.title}
              </span>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mb-5 mr-3 mt-5">
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
          <Button>Next</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ThemeCustomization;
