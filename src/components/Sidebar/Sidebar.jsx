"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollspyMenu } from "./scrollspy-menu";
import { cn } from "@/lib/utils";

export function Sidebar({ sideBarMenus }) {
  const [active, setActive] = useState("welcome");
  const router = useRouter();
  const isMobile = useIsMobile();
  if (isMobile) return null;

  const handleClick = (target) => {
    setActive(target);
    router.push(`/${target}`);
  };

  const items = sideBarMenus.map((key) => ({
    title: key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    target: key,
    active: key === active,
  }));

  return (
    <aside
      className={cn(
        "bg-background lg:border-e lg:border-border lg:fixed lg:top-0 lg:bottom-0 lg:z-20 lg:flex flex-col w-[280px]"
      )}
    >
      <div className="p-5 border-b border-muted-foreground">
        <Link href="/">
          <img src="/app/logo.png" alt="Logo" className="w-[178px]" />
        </Link>
      </div>
      <div className="p-6 overflow-hidden">
        <ScrollspyMenu items={items} onClick={handleClick} />
      </div>
    </aside>
  );
}
