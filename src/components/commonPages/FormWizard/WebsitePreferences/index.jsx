"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/ui/button";
import { useWizardPaths } from "@/hooks/useWizardPaths";
import { useRouter } from "next/navigation";
import { PreferencesCard } from "@/components/common/ui/cards/PreferencesCard";
import { useCrudApi } from "@/hooks/useCrudApi";
import { toast } from "sonner";

const WebsitePreferences = () => {
  const [templateData, setTemplateData] = useState({ data: [] });
  const [selectedCardId, setSelectedCardId] = useState(null);

  const { fetchAll } = useCrudApi("/api/template");
  const { create } = useCrudApi("/api/store-template");
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

  // const handleNextClick = async () => {
  //   debugger;
  //   if (!selectedCardId) {
  //     alert("Please select a template before proceeding.");
  //     return;
  //   }

  //   try {
  //     await create({
  //       store_id: 1,
  //       template_id: selectedCardId,
  //     });

  //     router.push(next.path);
  //   } catch (error) {
  //     console.error("Failed to save template selection:", error.message);
  //     alert("Failed to save template. Please try again.");
  //   }
  // };
  const handleSubmit = async () => {
    // setLoading(true);
    try {
      const payload = {
        store_id: 1,
        template_id: 7,
      };

      await create(data.id, payload);
      toast.success("Updated successfully");
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error("422 error:", err.message);
      toast.error("Failed to update. Check input data.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-8 text-xl font-medium">
        Website Design Preferences
      </div>

      <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:max-w-[75%] mx-auto">
        {templateData.data?.length > 0 ? (
          templateData.data?.map((item, idx) => {
            const isSelected = selectedCardId === item.id;

            return (
              <div
                key={item.id || `template-${idx}`}
                onClick={() => setSelectedCardId(item.id)}
                className="cursor-pointer"
              >
                <PreferencesCard
                  key={item.id || `template-${idx}`}
                  data={item}
                  selected={isSelected}
                />
              </div>
            );
          })
        ) : (
          <div className="text-center text-muted-foreground">
            Loading templates...
          </div>
        )}
      </div>

      <div className="w-full fixed bottom-0 px-4 mt-8 max-w-[75%] mx-auto">
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Link href="#" className="w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto">
              Save Draft
            </Button>
          </Link>

          <Button
            variant="outline"
            className="bg-[#F1F1F2] w-full md:w-auto"
            onClick={() => router.push(previous.path)}
          >
            Previous
          </Button>

          <Button
            className="w-full md:w-auto"
            // onClick={() => router.push(next.path)}
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default WebsitePreferences;
