// "use client";

// import React from "react";
// import { Button } from "@/components/common/ui/button";
// import { Plus } from "lucide-react";
// import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
// import useCouponsList from "./useCouponsList";
// import ConfirmDialog from "@/components/common/ui/ConfirmDialog";
// import { COUPONS_DATA } from "./constant";
// import CouponAddDialog from "./CouponAddDialog";
// // import { ContentLoader } from "@/components/common/ui/Loader/content-loader";

// const CouponsManagement = ({
//   setEditData,
//   setDialogOpen,
//   setDeleteId,
//   setConfirmOpen,
//   dialogOpen,
//   confirmOpen,
// }) => {
//   //   const {
//   //     list,
//   //     loading,
//   //     error,
//   //     editData,
//   //     setEditData,
//   //     setDeleteId,
//   //     dialogOpen,
//   //     setDialogOpen,
//   //     confirmOpen,
//   //     setConfirmOpen,
//   //     fetchData,
//   //     handleDelete,
//   //   } = useCouponsList();

//   const columns = useCouponsList({
//     onEdit: (item) => {
//       setEditData(item);
//       setDialogOpen(true);
//     },
//     onDelete: (id) => {
//       setDeleteId(id);
//       setConfirmOpen(true);
//     },
//   });

//   const filterOptions = (data, query) => {
//     const searchLower = query.toLowerCase();
//     return data.filter((item) => {
//       const category = item?.name?.toLowerCase() || "";
//       return category.includes(searchLower);
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <ListWithCardToggle
//         title="Coupons Management"
//         data={COUPONS_DATA}
//         columns={columns}
//         filterFunction={filterOptions}
//         createBtn={
//           <Button onClick={() => setDialogOpen(true)}>
//             <Plus className="mr-2 h-4 w-4" />
//             Add Coupons
//           </Button>
//         }
//       />

//       {/* ✅ Now the dialog will show */}
//       <CouponAddDialog
//         open={dialogOpen}
//         onClose={() => {
//           setDialogOpen(false);
//           setEditData(null);
//         }}
//         // onSuccess={fetchData}
//         // editData={editData}
//       />

//       <ConfirmDialog
//         open={confirmOpen}
//         onClose={() => setConfirmOpen(false)}
//         // onConfirm={handleDelete}
//         title="Delete Coupon"
//         message="Are you sure you want to delete this coupon? This action cannot be undone."
//       />
//     </div>
//   );
// };

// export default CouponsManagement;

"use client";

import React from "react";
import { Button } from "@/components/common/ui/button";
import { Plus } from "lucide-react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import useCouponsList from "./useCouponsList";
import ConfirmDialog from "@/components/common/ui/ConfirmDialog";
// import { COUPONS_DATA } from "./constant";
import CouponAddDialog from "./CouponAddDialog";
import { DataGridToolbar } from "@/components/common/DataGridToolBar";
import { useCrudList } from "@/hooks/useCrudList";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";

const CouponsManagement = () => {
  // local state to control dialogs
  //   const [dialogOpen, setDialogOpen] = useState(false);
  //   const [confirmOpen, setConfirmOpen] = useState(false);
  //   const [editData, setEditData] = useState(null);
  //   const [deleteId, setDeleteId] = useState(null);

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
  } = useCrudList("/api/coupon-management");

  const columns = useCouponsList({
    onEdit: (item) => {
      setEditData(item);
      setDialogOpen(true);
    },
    onDelete: (id) => {
      setDeleteId(id);
      setConfirmOpen(true);
    },
  });

  const filterOptions = (data, query) => {
    const searchLower = query.toLowerCase();
    return data.filter((item) => {
      const category = item?.code?.toLowerCase() || "";
      return category.includes(searchLower);
    });
  };

  if (loading) return <ContentLoader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <ListWithCardToggle
        title="Coupons Management"
        data={list}
        columns={columns}
        filterFunction={filterOptions}
        createBtn={
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Coupons
          </Button>
        }
        ToolbarComponent={DataGridToolbar}
      />

      <CouponAddDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditData(null);
        }}
        onSuccess={fetchData}
        editData={editData}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        // onConfirm={() => {
        //   console.log("Delete ID:", deleteId);
        //   setConfirmOpen(false);
        // }}
        onConfirm={handleDelete}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon? This action cannot be undone."
      />
    </div>
  );
};

export default CouponsManagement;
