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
  const [bannerPreviewImage, setBannerPreviewImage] = useState(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [productPreviewImage, setProductPreviewImage] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  return (
    <Card>
      <h2 className="text-center text-2xl font-semibold mb-6 mt-5">
        Website Theme & Layout Customization
      </h2>
      <div className="flex flex-col space-y-4 ps-7">
        <div className="space-y-2">
          <ToolbarHeading className="font-semibold text-lg">
            Homepage Banner Preference
          </ToolbarHeading>
          <ToolbarDescription>
            What type of banner would you like on your homepage?
          </ToolbarDescription>
        </div>
      </div>
      {BANNER_PREFERENCE?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
          {BANNER_PREFERENCE?.map((work) => {
            const isSelected = selectedId === work.id;
            return (
              <Card
                key={work.id}
                onClick={() => {
                  setSelectedId(work.id);
                  setBannerPreviewImage(work.image);
                  setShowBannerModal(true);
                }}
                className={`relative rounded-lg group cursor-pointer overflow-hidden border-2 ${
                  isSelected ? "border-primary" : "border-transparent"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 rounded-full">
                    <img
                      src="/images/customization/right symbol.svg"
                      alt="Selected"
                      className="w-8 h-8"
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
      {showBannerModal && bannerPreviewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative">
            <button
              onClick={() => setShowBannerModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">Preview Banner</h3>
            <img
              src={bannerPreviewImage}
              alt="Banner Preview"
              className="w-full h-auto rounded border"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-2 ps-7">
        <ToolbarHeading className="font-semibold text-lg">
          Featured Collections Display
        </ToolbarHeading>
        <ToolbarDescription>
          Which collections should be highlighted on the homepage?
        </ToolbarDescription>
      </div>
      <div className="ps-5 mt-2">
        <div className="grid grid-cols-2">
          {FEATURED_COLLECTIONS.map((item) => (
            <div key={item.id} className="p-2">
              <span className="text-sm font-medium text-foreground flex gap-3">
                <Checkbox />
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-2 ps-7 mt-3.5">
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
                onClick={() => {
                  setSelectedId(work.id);
                  setProductPreviewImage(work.image);
                  setShowProductModal(true);
                }}
                className={`relative rounded-lg group cursor-pointer overflow-hidden border-2  ${
                  isSelected ? "border-primary" : "border-transparent"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 rounded-full">
                    <img
                      src="/images/customization/right symbol.svg"
                      alt="Selected"
                      className="w-8 h-8"
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
      {showProductModal && productPreviewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative">
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">
              Preview Product Display
            </h3>
            <img
              src={productPreviewImage}
              alt="Product Preview"
              className="w-full h-auto rounded border"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-2 ps-7">
        <ToolbarHeading className="font-semibold text-lg">
          Navigation Menu Structure
        </ToolbarHeading>
        <ToolbarDescription>
          Which categories should appear in your main navigation?
        </ToolbarDescription>
      </div>
      <div className="ps-5 mt-2">
        <div className="grid grid-cols-3">
          {NAVIGATION_MENU_STRUCTURE.map((item, index) => (
            <div key={item.id || index} className="p-2">
              <span className="text-sm font-medium text-foreground flex justify-space-between gap-3">
                <Checkbox />
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-2 ps-7 mt-3.5">
        <ToolbarHeading className="font-semibold text-lg">
          Footer Content
        </ToolbarHeading>
        <ToolbarDescription>
          What would you like to include in your website footer?
        </ToolbarDescription>
      </div>
      <div className="ps-5 mt-2">
        <div className="grid grid-cols-3 gap-4">
          {FOOTER_CONTENT.map((item, index) => (
            <div key={item.id || index} className="p-2">
              <span className="text-sm font-medium text-foreground flex justify-space-between gap-3">
                <Checkbox />
                {item.title}
              </span>
            </div>
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
