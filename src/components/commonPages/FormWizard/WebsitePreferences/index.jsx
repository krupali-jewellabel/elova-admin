"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/ui/button";
import { useWizardPaths } from "@/hooks/useWizardPaths";
import { useRouter } from "next/navigation";
import { PreferencesCard } from "@/components/common/ui/cards/PreferencesCard";
import { useCrudApi } from "@/hooks/useCrudApi";

const WebsitePreferences = () => {
  const [templateData, setTemplateData] = useState({ data: [] });

  const { fetchAll } = useCrudApi("/api/template");

  const router = useRouter();
  const { next, previous } = useWizardPaths();

  const fetchData = async () => {
    try {
      const res = await fetchAll();
      res?.data && Array.isArray(res.data) && setTemplateData(res);
    } catch (err) {
      console.log(err.message || "Error fetching data");
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="text-center mb-8 text-xl font-medium">
        Website Design Preferences
      </div>

      <div className="grid grid-cols-1 gap-5 lg:gap-7.5">
        {templateData.data?.length > 0 ? (
          templateData.data?.map((item, idx) => {
            return <PreferencesCard key={item.id} data={item} />;
          })
        ) : (
          <div className="text-center text-muted-foreground">
            Loading templates...
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8 px-4 fixed bottom-0">
        <Link href="#" className="w-full md:w-auto">
          <Button variant="outline" className="w-full">
            Save Draft
          </Button>
        </Link>

        <Button
          variant="outline"
          className="bg-[#F1F1F2]"
          onClick={() => router.push(previous.path)}
        >
          Previous
        </Button>
        <Button onClick={() => router.push(next.path)}>Next</Button>
      </div>
    </>
  );
};

export default WebsitePreferences;
