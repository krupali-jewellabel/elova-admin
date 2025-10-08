"use client";

import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { Button } from "@/components/common/ui/button";
import { Plus } from "lucide-react";
import React, { use } from "react";
import { FAQ_DATA } from "../../constant";
import { useFAQColumns } from "./hooks/useFAQColums";

const FAQs = () => {
  const columns = useFAQColumns({
    onEdit: (item) => {
      setEditData(item);
      setDialogOpen(true);
    },
    onDelete: (id) => console.log("Delete FAQ ID:", id),
  });

  return (
    <div>
      <ListWithCardToggle
        title="FAQs"
        description="Manage your FAQs here."
        data={FAQ_DATA}
        columns={columns}
        createBtn={
          <Button
            onClick={() => {
              setEditData(null); // reset edit mode
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add FAQs
          </Button>
        }
      />
    </div>
  );
};

export default FAQs;
