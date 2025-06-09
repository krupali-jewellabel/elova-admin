"use client";

import { cn } from "@/lib/utils";
import { ScrollspyMenu } from "./scrollspy-menu";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("welcome");
  const router = useRouter();

  const items = [
    { title: "Welcome", target: "welcome" },
    { title: "Business Details", target: "business-details" },
    { title: "Branding", target: "branding" },
    { title: "Website Preference", target: "website-preferences" },
    { title: "Product Categories", target: "product-categories" },
    { title: "Stock Selections", target: "stock-selections" },
    { title: "Margin Setup", target: "margin-setup" },
    { title: "Final Review", target: "final-review" },
  ].map((item) => ({
    ...item,
    active: item.target === activeItem,
  }));

  const handleClick = (target) => {
    setActiveItem(target);
    router.push(`/${target}`); // or navigate to `/page#section`
  };

  return (
    <div>
      <div
        className={cn(
          "bg-background lg:border-e lg:border-border lg:fixed lg:top-0 lg:bottom-0 lg:z-20 lg:flex flex-col items-stretch shrink-0"
        )}
      >
        <div className="p-[20px_40px] border-b border-b-muted-foreground">
          <Link href="/">
            <img
              src={"/app/logo.png"}
              className="default-logo w-[178px]"
              alt="Default Logo"
            />
          </Link>
        </div>
        <div className="overflow-hidden p-[25px]">
          <ScrollspyMenu items={items} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
