// "use client";

// import React from "react";
// import { Button } from "@/components/common/ui/button";
// import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
// import { Plus } from "lucide-react";
// import { userDepartments } from "./hooks/userDepartments";
// import { useCrudList } from "@/hooks/useCrudList";
// import { ContentLoader } from "@/components/common/ui/Loader/content-loader";

// const Department = () => {
//   const {
//     departmentList,
//     loading,
//     error,
//     editData,
//     setEditData,
//     setDeleteId,
//     dialogOpen,
//     setDialogOpen,
//     confirmOpen,
//     setConfirmOpen,
//     fetchData,
//     handleDelete,
//   } = useCrudList("/api/departments");

//   const columns = userDepartments({
//     onEdit: (item) => {
//       setEditData(item);
//       setDialogOpen(true);
//     },
//     onDelete: (id) => {
//       setDeleteId(id);
//       setConfirmOpen(true);
//     },
//   });

//   const filterFunction = (data, searchTerm) => {
//     const lowerSearch = searchTerm.toLowerCase();
//     return data.filter((item) =>
//       item.name?.toLowerCase().includes(lowerSearch)
//     );
//   };

//   if (loading) return <ContentLoader />;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   return (
//     <div className="space-y-4">
//       <ListWithCardToggle
//         title="Departments"
//         data={departmentList}
//         columns={columns}
//         filterFunction={filterFunction}
//         createBtn={
//           <Button onClick={() => setDialogOpen(true)}>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Department
//           </Button>
//         }
//       />
//     </div>
//   );
// };

// export default Department;

"use client";

import React from "react";
import { Button } from "@/components/common/ui/button";
import { Plus } from "lucide-react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import { useCrudList } from "@/hooks/useCrudList";
import { userDepartments } from "./hooks/userDepartments";
import AddDepartmentModel from "./AddDepartmentsModel";
import ConfirmDialog from "@/components/common/ui/ConfirmDialog";

const Department = () => {
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
  } = useCrudList("/api/departments");

  const columns = userDepartments({
    onEdit: (item) => {
      setEditData(item);
      setDialogOpen(true);
    },
    onDelete: (id) => {
      setDeleteId(id);
      setConfirmOpen(true);
    },
  });

  const getListData = (response) => {
    if (!response) return [];
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data?.data)) return response.data.data;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.items)) return response.items;
    return [];
  };

  const filteredList = getListData(list);

  const filterFunction = (data, searchTerm) => {
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((item) =>
      item.name?.toLowerCase().includes(lowerSearch)
    );
  };

  if (loading) return <ContentLoader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <ListWithCardToggle
        title="Departments"
        data={filteredList}
        columns={columns}
        filterFunction={filterFunction}
        createBtn={
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        }
      />

      <AddDepartmentModel
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditData(null);
        }}
        editData={editData}
        onSuccess={fetchData}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Department"
        message="Are you sure you want to delete this department? This action cannot be undone."
      />
    </div>
  );
};

export default Department;
