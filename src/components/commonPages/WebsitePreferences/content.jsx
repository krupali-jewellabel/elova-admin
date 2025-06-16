"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/ui/button";
import { CardAuthor } from "@/components/common/ui/cards/card-author";
import { CardAuthorRow } from "@/components/common/ui/cards/card-author-row";

const items = [
  {
    bgImage: "/images/website-banner.jpg",
    name: "Velin",
    location: "Minimal and modern layout ideal for contemporary jewelry",
    url: "#",
    avatar: {
      className: "w-[50px] h-28 md:w-32 md:h-28 -mt-12 md:-mt-20 shrink-0 relative top-[2px]",
      image: "/images/brand-logo.png",
      imageClass: "rounded-[20px]",
    },
    theme: {
      visualStyle: "Smooth, luxurious, understated",
      personality: "Deep burgundy, gold, cream, black",
      recommendedStyle: "Sophisticated serif with high contrast strokes",
    },
    works: [
      { image: "/images/homepage.png", title: "Homepage", id: 81023,},
      { image: "/images/productlisting.png", title: "Product Listing", id: 67890 },
      { image: "/images/productdetail.png", title: "Product Detail", id: 59374 },
      { image: "/images/aboutus.png", title: "About US", id: 34214 },
    ],
  },
];

const Content = () => {
  const [activeTab, setActiveTab] = useState("cards");

  const renderAuthors = () =>
    items.map((item, index) =>
      activeTab === "cards" ? (
        <CardAuthor key={index} {...item} />
      ) : (
        <CardAuthorRow key={index} {...item} />
      )
    );

  return (
    <>
      <div className="text-center mb-8 text-xl font-medium">
        Website Design Preferences
      </div>

      <div className="grid grid-cols-1 gap-5 lg:gap-7.5">
        {renderAuthors()}
      </div>

      
    </>
  );
};

export default Content;
