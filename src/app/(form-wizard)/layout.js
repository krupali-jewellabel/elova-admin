"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { FORM_WIZARD_MENU } from "@/services/constant";
import { WizardProvider } from "@/context/WizardContext";

export default function FormWizardLayout({ children }) {
  const [wizardData, setWizardData] = useState(null);

  useEffect(() => {
    const fetchWizardData = async () => {
      try {
        const res = await axios.get("/api/wizard-steps", {
          headers: {
            store_id: 1, // make dynamic later
          },
        });

        if (res?.data?.status && res.data?.data) {
          console.log("✅ Loaded wizard data:", res.data);
          setWizardData({
            ...res.data.data,
            wizard: res.data.wizard,
          });
        } else {
          console.error("❌ Unexpected API response", res.data);
        }
      } catch (error) {
        console.error("API error fetching wizard data", error);
      }
    };

    fetchWizardData();
  }, []);

  return (
    <WizardProvider initialData={wizardData}>
      <div className="flex h-screen">
        <div className="lg:w-[280px]">
          <Sidebar sideBarMenus={FORM_WIZARD_MENU} />
        </div>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </WizardProvider>
  );
}
