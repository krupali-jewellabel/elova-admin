"use client";

import React, { useState } from "react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { Button } from "@/components/common/ui/button";
import { BLOG_CATEGORIES_DATA } from "../../constant";
import { useBlogCategoriesColumns } from "./hooks/useBlogCategoriesColumns";
import { Plus } from "lucide-react";
import BlogCategoriesModel from "./BlogCategoriesModel";

const BlogCategories = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const columns = useBlogCategoriesColumns({
    onEdit: (item) => {
      setEditData(item);
      setDialogOpen(true);
    },
    onDelete: (id) => console.log("Delete category ID:", id),
  });

  return (
    <>
      <ListWithCardToggle
        title="Blog Categories"
        description="Manage your blog categories here."
        data={BLOG_CATEGORIES_DATA}
        columns={columns}
        createBtn={
          <Button
            onClick={() => {
              setEditData(null); // reset edit data for Add mode
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        }
      />

      {/* Modal */}
      <BlogCategoriesModel
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        editData={editData}
        onSuccess={() => {
          console.log("Category saved successfully!");
        }}
      />
    </>
  );
};

export default BlogCategories;
