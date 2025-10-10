"use client";

import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { Button } from "@/components/common/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react"; // useState instead of use
import { FAQ_DATA } from "../../constant";
import { useFAQColumns } from "./hooks/useFAQColums";
import FAQModel from "./FAQModel";

const FAQs = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

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
              setDialogOpen(true); // open modal
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add FAQs
          </Button>
        }
      />

      {/* FAQ Modal */}
      <FAQModel
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        editData={editData}
        onSuccess={(newData) => {
          console.log("FAQ saved:", newData);
          setDialogOpen(false);
        }}
      />
    </div>
  );
};

export default FAQs;
