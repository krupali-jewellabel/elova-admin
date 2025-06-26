"use client";

import SidebarSwitcher from "./sidebarswitcher";

export default function LayoutWrapper({ children }) {
  return (
    <div className="flex h-screen">
      <SidebarSwitcher />
      <main className="flex-1 overflow-auto p-6 bg-white">{children}</main>
    </div>
  );
}
