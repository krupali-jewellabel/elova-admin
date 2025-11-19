// "use client";

// import React, { useState } from "react";
// import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
// import { Button } from "@/components/common/ui/button";
// import { Plus } from "lucide-react";
// import { BLOG_POSTS_DATA } from "../../constant";
// import { useBlogPostColumns } from "./hooks/useBlogPostColumns";
// import BlogPostModel from "./BlogPostModel";

// const BlogPosts = () => {
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   // Define table columns with edit/delete actions
//   const columns = useBlogPostColumns({
//     onEdit: (item) => {
//       setEditData(item);
//       setDialogOpen(true);
//     },
//     onDelete: (id) => console.log("Delete post ID:", id),
//   });

//   return (
//     <div>
//       <ListWithCardToggle
//         title="Blog Posts"
//         description="Manage your blog posts here."
//         data={BLOG_POSTS_DATA}
//         columns={columns}
//         createBtn={
//           <Button
//             onClick={() => {
//               setEditData(null); // reset edit mode
//               setDialogOpen(true);
//             }}
//           >
//             <Plus className="mr-2 h-4 w-4" />
//             Add Post
//           </Button>
//         }
//       />

//       {/* Blog Post Modal */}
//       <BlogPostModel
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         onSuccess={() => {
//           setDialogOpen(false);
//           console.log("Refetch or refresh post list");
//         }}
//         editData={editData}
//       />
//     </div>
//   );
// };

// export default BlogPosts;

"use client";

import React, { useState } from "react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { Button } from "@/components/common/ui/button";
import { Plus } from "lucide-react";

import { useCrudList } from "@/hooks/useCrudList";
import ConfirmDialog from "@/components/common/ui/ConfirmDialog";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import BlogPostModel from "./BlogPostModel";
import { useBlogPostColumns } from "./hooks/useBlogPostColumns";

const BlogPosts = ({ storeId }) => {
  const {
    list,
    loading,
    error,
    editData,
    setEditData,
    setDeleteId,
    dialogOpen,
    setDialogOpen,
    confirmOpen,
    setConfirmOpen,
    fetchData,
    handleDelete,
    fetchById,
  } = useCrudList(`/api/cms/blog/5/posts`);

  const [selectedPostId, setSelectedPostId] = useState(null);

  // Columns (Edit / Delete Actions)
  const columns = useBlogPostColumns({
    onEdit: async (item) => {
      try {
        setDialogOpen(true);
        setSelectedPostId(item.id);

        const data = await fetchById(item.id);
        setEditData(data?.data);
      } catch (err) {
        console.error("Failed to fetch blog post for editing", err);
      }
    },
    onDelete: (id) => {
      setDeleteId(id);
      setConfirmOpen(true);
    },
    storeId,
  });

  // Search Filter
  const filterOptions = (data, query) => {
    const q = query.toLowerCase();
    return data.filter((item) => item?.title?.toLowerCase().includes(q));
  };

  if (loading) return <ContentLoader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <ListWithCardToggle
        title="Blog Posts"
        description="Manage your blog posts here."
        data={list}
        columns={columns}
        filterFunction={filterOptions}
        createBtn={
          <Button
            onClick={() => {
              setDialogOpen(true);
              setEditData(null);
              setSelectedPostId(null);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Post
          </Button>
        }
      />

      {/* Add/Edit Dialog */}
      <BlogPostModel
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditData(null);
          setSelectedPostId(null);
        }}
        onSuccess={fetchData}
        editData={editData}
        storeId={storeId}
        postId={selectedPostId}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </div>
  );
};

export default BlogPosts;
