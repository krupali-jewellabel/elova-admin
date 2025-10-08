"use client";

import React, { useState } from "react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { Button } from "@/components/common/ui/button";
import { Plus } from "lucide-react";
import { BLOG_POSTS_DATA } from "../../constant";
import { useBlogPostColumns } from "./hooks/useBlogPostColumns";
import BlogPostModel from "./BlogPostModel";

const BlogPosts = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Define table columns with edit/delete actions
  const columns = useBlogPostColumns({
    onEdit: (item) => {
      setEditData(item);
      setDialogOpen(true);
    },
    onDelete: (id) => console.log("Delete post ID:", id),
  });

  return (
    <div>
      <ListWithCardToggle
        title="Blog Posts"
        description="Manage your blog posts here."
        data={BLOG_POSTS_DATA}
        columns={columns}
        createBtn={
          <Button
            onClick={() => {
              setEditData(null); // reset edit mode
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Post
          </Button>
        }
      />

      {/* Blog Post Modal */}
      <BlogPostModel
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          setDialogOpen(false);
          console.log("Refetch or refresh post list");
        }}
        editData={editData}
      />
    </div>
  );
};

export default BlogPosts;
