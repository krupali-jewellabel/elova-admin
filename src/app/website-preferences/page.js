import WebsitePreferences from "@/components/commonPages/WebsitePreferences";
import React from "react";

const page = () => {
  const items = [
    {
      avatar: {
        className:
          "size-[120px] in-[.authors-row]:size-[80px] shrink-0 relative",
        image: "images/website-banner.jpg",
        imageClass: "rounded-full",
        badgeClass:
          "flex size-3 bg-green-500 rounded-full ring-2 ring-white absolute bottom-2 start-[93px] in-[.authors-row]:start-[64px]",
      },
      bgImage: "images/website-banner.jpg",
      name: "Jenny Klabber",
      location: "Houston, Texas",
      url: "#",
      works: [
        {
          image: "6.jpg",
          title: "Geometric Patterns",
          id: 81023,
        },
        {
          image: "7.jpg",
          title: "Artistic Expressions",
          id: 67890,
        },
        {
          image: "24.jpg",
          title: "Duolingo Tech Hub",
          id: 59374,
        },
        {
          image: "27.jpg",
          title: "Duolingo Language",
          id: 34214,
        },
      ],
    },
    {
      avatar: {
        className:
          "size-[120px] in-[.authors-row]:size-[80px] shrink-0 relative",
        image: "300-3.png",
        imageClass: "rounded-full",
        badgeClass:
          "flex size-3 bg-green-500 rounded-full ring-2 ring-white absolute bottom-2 start-[93px] in-[.authors-row]:start-[64px]",
      },
      bgImage: "bg-8.png",
      name: "Ralph Edwards",
      location: "Sacramento, California",
      url: "",
      works: [
        {
          image: "1.jpg",
          title: "Geometric Patterns",
          id: 98472,
        },
        {
          image: "25.jpg",
          title: "Artistic Expressions",
          id: 20194,
        },
        {
          image: "3.jpg",
          title: "Geometric Patterns",
          id: 37649,
        },
        {
          image: "5.jpg",
          title: "Geometric Patterns",
          id: 47264,
        },
      ],
    },
    {
      avatar: {
        className:
          "size-[120px] in-[.authors-row]:size-[80px] shrink-0 relative",
        image: "300-17.png",
        imageClass: "rounded-full",
        badgeClass:
          "flex size-3 bg-accent rounded-full ring-2 ring-white absolute bottom-2 start-[93px] in-[.authors-row]:start-[64px]",
      },
      bgImage: "bg-9.png",
      name: "Jacob Jones",
      location: "Boston, Massachusetts",
      url: "",
      works: [
        {
          image: "27.jpg",
          title: "Geometric Patterns",
          id: 20495,
        },
        {
          image: "28.jpg",
          title: "Artistic Expressions",
          id: 73651,
        },
        {
          image: "29.jpg",
          title: "Geometric Patterns",
          id: 19482,
        },
        {
          image: "5.jpg",
          title: "Geometric Patterns",
          id: 39184,
        },
      ],
    },
    {
      avatar: {
        className:
          "size-[120px] in-[.authors-row]:size-[80px] shrink-0 relative",
        image: "300-5.png",
        imageClass: "rounded-full",
        badgeClass:
          "flex size-3 bg-accent rounded-full ring-2 ring-white absolute bottom-2 start-[93px] in-[.authors-row]:start-[64px]",
      },
      bgImage: "bg-10.png",
      name: "Kristin Watson",
      location: "Cleveland, Ohio",
      url: "",
      works: [
        {
          image: "30.jpg",
          title: "Geometric Patterns",
          id: 10382,
        },
        {
          image: "31.jpg",
          title: "Artistic Expressions",
          id: 49273,
        },
        {
          image: "32.jpg",
          title: "Geometric Patterns",
          id: 39104,
        },
        {
          image: "5.jpg",
          title: "Geometric Patterns",
          id: 49183,
        },
      ],
    },
  ];
  return items.map((item, index) => {
    return (
      <WebsitePreferences
        avatar={item.avatar}
        bgImage={item.bgImage}
        name={item.name}
        location={item.location}
        works={item.works}
        key={index}
      />
    );
  });
};

export default page;
