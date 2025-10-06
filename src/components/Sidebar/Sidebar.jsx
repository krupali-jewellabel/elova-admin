"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ScrollspyMenu } from "./ScrollspyMenu";
import { cn } from "@/lib/utils";
import SidebarMenu from "./SidebarMenu";
import SidebarHeader from "./SidebarHeader";
import { SettingsProvider } from "@/provider/settings-provider";

export function Sidebar({ sideBarMenus, dashboardSidebar }) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname.replace(/^\//, ""));
  }, [pathname]);

  if (isMobile) return null;

  const handleClick = (target) => {
    const cleaned = target.replace(/^\//, "");
    setActive(cleaned);
    router.push(target.startsWith("/") ? target : `/${target}`);
  };

  const items = sideBarMenus
    .filter((item) => item.path)
    .map((item) => ({
      title: item.title,
      target: item.path,
      active: pathname.startsWith(item.path),
    }));

  return (
    <aside
      className={cn(
        "bg-background lg:border-e lg:border-border lg:fixed lg:top-0 lg:bottom-0 lg:z-20 lg:flex flex-col w-[280px]"
      )}
    >
      {dashboardSidebar ? (
        <SettingsProvider>
          <SidebarHeader />
          <div className="overflow-hidden">
            <div className="w-(--sidebar-default-width)">
              <SidebarMenu />
            </div>
          </div>
        </SettingsProvider>
      ) : (
        <>
          <div className="p-5 border-b border-muted-foreground">
            <Link href="/">
              <img src="/app/elova-jewel.png" alt="Logo" className="w-[160px]" />
            </Link>
          </div>
          <div className="p-6 overflow-hidden">
            {
              <ScrollspyMenu
                items={items}
                onClick={handleClick}
                activeItem={active}
              />
            }
          </div>
        </>
      )}
    </aside>
  );
}
