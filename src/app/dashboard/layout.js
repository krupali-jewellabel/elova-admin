import { Sidebar } from "@/components/Sidebar/Sidebar";
import { DASHBOARD_MENU } from "@/services/constant";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="lg:w-[280px]">
        <Sidebar sideBarMenus={DASHBOARD_MENU} dashboardSidebar={true} />
      </div>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
