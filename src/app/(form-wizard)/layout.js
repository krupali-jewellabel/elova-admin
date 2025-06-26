import { Sidebar } from "@/components/Sidebar/Sidebar";
import { FORM_WIZARD_MENU } from "@/services/constant";

export default function FormWizardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="lg:w-[280px]">
        <Sidebar sideBarMenus={FORM_WIZARD_MENU} />
      </div>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
