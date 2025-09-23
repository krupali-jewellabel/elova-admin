// "use client";

// import { useMemo } from "react";
// import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
// import {
//   DataGridTableRowSelect,
//   DataGridTableRowSelectAll,
// } from "@/components/common/ui/data-grid-table";
// import { Skeleton } from "@/components/common/ui/skeleton";
// import { Button } from "@/components/common/ui/button";
// import { Edit2Icon, EyeIcon } from "lucide-react";
// import { useCrudApi } from "@/hooks/useCrudApi";

// export const useProductListColumns = ({
//   editingCell,
//   setEditingCell,
//   editedValue,
//   setEditedValue,
//   handleSaveEdit,
//   onClick,
//   onView,
// }) => {

//   return useMemo(
//     () => [
//       {
//         accessorKey: "id",
//         header: () => <DataGridTableRowSelectAll />,
//         cell: ({ row }) => <DataGridTableRowSelect row={row} />,
//         enableSorting: false,
//         enableHiding: false,
//         size: 48,
//       },
//       {
//         id: "image",
//         header: ({ column }) => (
//           <DataGridColumnHeader
//             title="Image"
//             column={column}
//             onClick={() => onClick("image")}
//           />
//         ),
//         accessorFn: (row) => row.productImg,
//         cell: ({ row }) => (
//           <img src={row.original.productImg} className="w-[50px] h-[50px]" />
//         ),
//         enableSorting: true,
//         size: 100,
//         meta: {
//           skeleton: <Skeleton className="h-4 w-[125px]" />,
//         },
//       },
//       {
//         id: "designNo",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Design No" column={column} />
//         ),
//         accessorFn: (row) => row.designNo,
//         cell: ({ row }) => {
//           const isEditing =
//             editingCell?.id === row.original.id &&
//             editingCell?.field === "designNo";
//           return isEditing ? (
//             <input
//               autoFocus
//               type="text"
//               className="border px-2 py-1 text-sm w-full"
//               value={editedValue}
//               onChange={(e) => setEditedValue(e.target.value)}
//               onBlur={() =>
//                 handleSaveEdit(row.original.id, "designNo", editedValue)
//               }
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleSaveEdit(row.original.id, "designNo", editedValue);
//                 } else if (e.key === "Escape") {
//                   setEditingCell(null);
//                 }
//               }}
//             />
//           ) : (
//             <span
//               onClick={() => {
//                 setEditingCell({ id: row.original.id, field: "designNo" });
//                 setEditedValue(row.original.designNo);
//               }}
//               className="cursor-pointer"
//             >
//               {row.original.designNo}
//             </span>
//           );
//         },
//         enableSorting: true,
//         size: 100,
//       },
//       {
//         id: "category",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Category" column={column} />
//         ),
//         accessorFn: (row) => row.category,
//         cell: ({ row }) => <span>{row.original.category}</span>,
//         size: 100,
//       },
//       {
//         id: "style",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Style" column={column} />
//         ),
//         accessorFn: (row) => row.style,
//         cell: ({ row }) => {
//           const isEditing =
//             editingCell?.id === row.original.id &&
//             editingCell?.field === "style";
//           return isEditing ? (
//             <input
//               autoFocus
//               type="text"
//               className="border px-2 py-1 text-sm w-full"
//               value={editedValue}
//               onChange={(e) => setEditedValue(e.target.value)}
//               onBlur={() =>
//                 handleSaveEdit(row.original.id, "style", editedValue)
//               }
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleSaveEdit(row.original.id, "style", editedValue);
//                 } else if (e.key === "Escape") {
//                   setEditingCell(null);
//                 }
//               }}
//             />
//           ) : (
//             <span
//               onClick={() => {
//                 setEditingCell({ id: row.original.id, field: "style" });
//                 setEditedValue(row.original.style);
//               }}
//               className="cursor-pointer"
//             >
//               {row.original.style}
//             </span>
//           );
//         },
//         size: 100,
//       },
//       {
//         id: "shape",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Shape" column={column} />
//         ),
//         accessorFn: (row) => row.shape,
//         cell: ({ row }) => <span>{row.original.shape}</span>,
//         size: 100,
//       },
//       {
//         id: "salesPrice",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Sales Price" column={column} />
//         ),
//         accessorFn: (row) => row.salesPrice,
//         cell: ({ row }) => {
//           const isEditing =
//             editingCell?.id === row.original.id &&
//             editingCell?.field === "salesPrice";
//           return isEditing ? (
//             <input
//               autoFocus
//               type="text"
//               className="border px-2 py-1 text-sm w-full"
//               value={editedValue}
//               onChange={(e) => setEditedValue(e.target.value)}
//               onBlur={() =>
//                 handleSaveEdit(row.original.id, "salesPrice", editedValue)
//               }
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleSaveEdit(row.original.id, "salesPrice", editedValue);
//                 } else if (e.key === "Escape") {
//                   setEditingCell(null);
//                 }
//               }}
//             />
//           ) : (
//             <span
//               onClick={() => {
//                 setEditingCell({ id: row.original.id, field: "salesPrice" });
//                 setEditedValue(row.original.salesPrice);
//               }}
//               className="cursor-pointer"
//             >
//               {row.original.salesPrice}
//             </span>
//           );
//         },
//         size: 100,
//       },
//       {
//         id: "plan",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Plan" column={column} />
//         ),
//         accessorFn: (row) => row.plan,
//         cell: ({ row }) => <span>{row.original.plan}</span>,
//         size: 100,
//       },
//       {
//         id: "collection",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Collection" column={column} />
//         ),
//         accessorFn: (row) => row.collection,
//         cell: ({ row }) => <span>{row.original.collection}</span>,
//         size: 115,
//       },
//       {
//         id: "createdAt",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Created At" column={column} />
//         ),
//         accessorFn: (row) => row.createdAt,
//         cell: ({ row }) => <span>{row.original.createdAt}</span>,
//         size: 125,
//       },
//       {
//         id: "lastUpdatedDate",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Last Updated Date" column={column} />
//         ),
//         accessorFn: (row) => row.lastUpdatedDate,
//         cell: ({ row }) => <span>{row.original.lastUpdatedDate}</span>,
//         size: 125,
//       },
//       {
//         id: "gender",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Gender" column={column} />
//         ),
//         accessorFn: (row) => row.gender,
//         cell: ({ row }) => <span>{row.original.gender}</span>,
//         size: 100,
//       },
//       {
//         id: "action",
//         header: ({ column }) => (
//           <DataGridColumnHeader title="Action" column={column} />
//         ),
//         accessorFn: (row) => row.orderChannel,
//         cell: ({ row }) => (
//           <div className="flex gap-[10px]">
//             <Button mode="icon" variant="outline">
//               <Edit2Icon />
//             </Button>
//             <Button
//               mode="icon"
//               variant="outline"
//               onClick={() => onView(row.original)}
//             >
//               <EyeIcon />
//             </Button>
//           </div>
//         ),
//         size: 100,
//       },
//     ],
//     [
//       editingCell,
//       setEditingCell,
//       editedValue,
//       setEditedValue,
//       handleSaveEdit,
//       onView,
//     ]
//   );
// };

"use client";

import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { Edit2Icon, EyeIcon } from "lucide-react";

export const useProductListColumns = ({
  editingCell,
  setEditingCell,
  editedValue,
  handleSaveEdit,
  onClick,
  onView,
}) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        size: 48,
      },
      {
        id: "product_image",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Image"
            column={column}
            onClick={() => onClick("image")}
          />
        ),
        accessorFn: (row) => row.product_image,
        cell: ({ row }) => {
          const productImage = row.original.product_image;

          return (
            <img
              src={productImage || "/images/products/1.png"}
              className="w-[50px] h-[50px] object-cover rounded"
              alt="product"
              onError={(e) => {
                e.currentTarget.src = "/images/products/1.png";
              }}
            />
          );
        },
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "design_no",
        header: ({ column }) => (
          <DataGridColumnHeader title="Design No" column={column} />
        ),
        accessorFn: (row) => row.design_no,
        cell: ({ row }) => row.original.design_no,
        size: 120,
      },
      {
        id: "category",
        header: ({ column }) => (
          <DataGridColumnHeader title="Category" column={column} />
        ),
        accessorFn: (row) => row.category,
        cell: ({ row }) => row.original.category,
        size: 120,
      },
      {
        id: "style",
        header: ({ column }) => (
          <DataGridColumnHeader title="Style" column={column} />
        ),
        accessorFn: (row) => row.style,
        cell: ({ row }) => row.original.style,
        size: 120,
      },
      {
        id: "shape",
        header: ({ column }) => (
          <DataGridColumnHeader title="Shape" column={column} />
        ),
        accessorFn: (row) => row.shape,
        cell: ({ row }) => row.original.shape,
        size: 120,
      },
      {
        id: "salesPrice",
        header: ({ column }) => (
          <DataGridColumnHeader title="Sales Price" column={column} />
        ),
        accessorFn: (row) => row.sales_price,
        cell: ({ row }) => `₹${row.original.sales_price || 0}`,
        size: 120,
      },
      {
        id: "collection",
        header: ({ column }) => (
          <DataGridColumnHeader title="Collection" column={column} />
        ),
        accessorFn: (row) => row.collection,
        cell: ({ row }) => row.original.collection,
        size: 140,
      },
      {
        id: "createdAt",
        header: ({ column }) => (
          <DataGridColumnHeader title="Created At" column={column} />
        ),
        accessorFn: (row) => row.created_at,
        cell: ({ row }) =>
          row.original.created_at
            ? new Date(row.original.created_at).toLocaleDateString()
            : "-",
        size: 160,
      },
      {
        id: "lastUpdatedDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Updated" column={column} />
        ),
        accessorFn: (row) => row.updated_at,
        cell: ({ row }) =>
          row.original.updated_at
            ? new Date(row.original.updated_at).toLocaleDateString()
            : "-",
        size: 160,
      },
      {
        id: "gender",
        header: ({ column }) => (
          <DataGridColumnHeader title="Gender" column={column} />
        ),
        accessorFn: (row) => row.gender,
        cell: ({ row }) => row.original.gender,
        size: 100,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-[10px]">
            <Button
              variant="outline"
              mode="icon"
              onClick={() => onView(row.original)}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              mode="icon"
              onClick={() => setEditingCell(row.original)}
            >
              <Edit2Icon className="h-4 w-4" />
            </Button>
          </div>
        ),
        size: 100,
      },
    ],
    [editingCell, setEditingCell, editedValue, handleSaveEdit, onView, onClick]
  );

  return { columns };
};
