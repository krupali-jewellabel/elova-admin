"use client";

import { AvatarSingle } from "@/components/common/ui/avatar-single";
import { Card, CardContent, CardFooter } from "@/components/common/ui/cards/card";
import Link from "next/link";
import React from "react";
import Content from "./content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common/ui/button";

const item = {
  bgImage: "/images/website-banner.jpg",
  name: "Velin",
  location: "Minimal and modern layout ideal for contemporary jewelry",
  avatar: {
    className: "w-[50px] h-28 md:w-32 md:h-28 -mt-12 md:-mt-20 shrink-0 relative top-[2px]",
    image: "/images/brand-logo.png",
    imageClass: "rounded-[20px]",
    badgeClass: "",
  },
};

const WebsitePreferences = ({ avatar, name, location, bgImage }) => {
  return (
    <>
      <Content />

      <Card className="max-w-[75%] mx-auto overflow-hidden mt-10">
        <div
          className="relative h-[230px] w-full bg-cover bg-top rounded-t-xl"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <AvatarSingle
                  className={avatar?.className}
                  image={avatar?.image}
                  imageClass={cn("bg-white", avatar?.imageClass)}
                  badgeClass={avatar?.badgeClass}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Link
                    href="#"
                    className="text-lg font-semibold text-foreground hover:text-primary-active"
                  >
                    {name}
                  </Link>
                  <span className="inline-flex items-center justify-center rounded-full bg-red-50 p-1">
                    <img src="/images/verify.svg" alt="Verified Badge" className="w-5 h-5" />
                  </span>
                </div>
                {location && (
                  <span className="text-muted-foreground text-sm max-w-[400px]">
                    {location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
    
      </Card>

      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8 px-4">
        <Link href="#" className="w-full md:w-auto">
          <Button variant="outline" className="w-full">Save Draft</Button>
        </Link>

        <Link href="#" className="w-full md:w-auto">
          <Button variant="outline" className="w-full bg-[#F1F1F2]">Previous</Button>
        </Link>

        <Link href="#" className="w-full md:w-auto">
          <Button className="w-full">Next</Button>
        </Link>
      </div>
    </>
  );
};

const Page = () => <WebsitePreferences {...item} />;

export default Page;
