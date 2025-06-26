// "use client";

// import { MENU_ITEMS } from "@/services/constant";
// import { MENU_ITEMS_2 } from "@/services/constant";
// import { usePathname } from "next/navigation";
// import { Sidebar } from "./Sidebar";

// export default function SidebarSwitcher() {
//   const pathname = usePathname();
//   const sideBarMenus = pathname.startsWith("/theme-customization")
//     ? MENU_ITEMS_2
//     : MENU_ITEMS;

//   return (
//     <div className="lg:w-[280px]">
//       <Sidebar sideBarMenus={sideBarMenus} />
//     </div>
//   );
// }

// "use client";

// import { MENU_ITEMS, MENU_ITEMS_2 } from "@/services/constant";
// import { usePathname } from "next/navigation";
// import { Sidebar } from "./Sidebar";

// export default function SidebarSwitcher() {
//   const pathname = usePathname();

//   // List of base routes that should use MENU_ITEMS_2
//   const customSidebarRoutes = [
//     "/content-branding",
//     "/customer-engagement",
//     "/policies-customer-assurance",
//     "/product-shopping-experience",
//     "/theme-customization",
//   ];

//   const shouldUseCustomSidebar = customSidebarRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   const sideBarMenus = shouldUseCustomSidebar ? MENU_ITEMS_2 : MENU_ITEMS;

//   return (
//     <div className="lg:w-[280px]" key={pathname}>
//       <Sidebar sideBarMenus={sideBarMenus} />
//     </div>
//   );
// }

"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import {
  MENU_ITEMS,
  THEME_CUSTOMIZATION_MENU,
  DASHBOARD,
  FORM_WIZARD_MENU,
  DASHBOARD_MENU,
} from "@/services/constant";
// import { MENU_SIDEBAR } from "@/config/menu.config";

// Recursively extract all paths from DASHBOARD
function extractPaths(menu) {
  return menu.flatMap((item) => {
    const childrenPaths = item.children ? extractPaths(item.children) : [];
    return item.path ? [item.path, ...childrenPaths] : childrenPaths;
  });
}

export default function SidebarSwitcher() {
  const pathname = usePathname();

  const dashboardPaths = extractPaths(DASHBOARD_MENU);
  const customSidebarPaths = THEME_CUSTOMIZATION_MENU.map((item) => item.path);

  const isDashboardRoute = dashboardPaths.some((path) =>
    pathname.startsWith(path)
  );

  const isCustomizationRoute = customSidebarPaths.some((path) =>
    pathname.startsWith(path)
  );

  let sideBarMenus;

  if (isDashboardRoute) {
    sideBarMenus = DASHBOARD_MENU;
  } else if (isCustomizationRoute) {
    sideBarMenus = THEME_CUSTOMIZATION_MENU;
  } else {
    sideBarMenus = FORM_WIZARD_MENU;
  }

  return (
    <div className="lg:w-[280px]" key={pathname}>
      <Sidebar sideBarMenus={sideBarMenus} />
    </div>
  );
}
