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
  setEditedValue,
  handleSaveEdit,
  onClick,
  onView,
}) => {
  return useMemo(
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
        id: "image",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Image"
            column={column}
            onClick={() => onClick("image")}
          />
        ),
        accessorFn: (row) => row.productImg,
        cell: ({ row }) => (
          <img src={row.original.productImg} className="w-[50px] h-[50px]" />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "designNo",
        header: ({ column }) => (
          <DataGridColumnHeader title="Design No" column={column} />
        ),
        accessorFn: (row) => row.designNo,
        cell: ({ row }) => {
          const isEditing =
            editingCell?.id === row.original.id &&
            editingCell?.field === "designNo";
          return isEditing ? (
            <input
              autoFocus
              type="text"
              className="border px-2 py-1 text-sm w-full"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onBlur={() =>
                handleSaveEdit(row.original.id, "designNo", editedValue)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveEdit(row.original.id, "designNo", editedValue);
                } else if (e.key === "Escape") {
                  setEditingCell(null);
                }
              }}
            />
          ) : (
            <span
              onClick={() => {
                setEditingCell({ id: row.original.id, field: "designNo" });
                setEditedValue(row.original.designNo);
              }}
              className="cursor-pointer"
            >
              {row.original.designNo}
            </span>
          );
        },
        enableSorting: true,
        size: 100,
      },
      {
        id: "category",
        header: ({ column }) => (
          <DataGridColumnHeader title="Category" column={column} />
        ),
        accessorFn: (row) => row.category,
        cell: ({ row }) => <span>{row.original.category}</span>,
        size: 100,
      },
      {
        id: "style",
        header: ({ column }) => (
          <DataGridColumnHeader title="Style" column={column} />
        ),
        accessorFn: (row) => row.style,
        cell: ({ row }) => {
          const isEditing =
            editingCell?.id === row.original.id &&
            editingCell?.field === "style";
          return isEditing ? (
            <input
              autoFocus
              type="text"
              className="border px-2 py-1 text-sm w-full"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onBlur={() =>
                handleSaveEdit(row.original.id, "style", editedValue)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveEdit(row.original.id, "style", editedValue);
                } else if (e.key === "Escape") {
                  setEditingCell(null);
                }
              }}
            />
          ) : (
            <span
              onClick={() => {
                setEditingCell({ id: row.original.id, field: "style" });
                setEditedValue(row.original.style);
              }}
              className="cursor-pointer"
            >
              {row.original.style}
            </span>
          );
        },
        size: 100,
      },
      {
        id: "shape",
        header: ({ column }) => (
          <DataGridColumnHeader title="Shape" column={column} />
        ),
        accessorFn: (row) => row.shape,
        cell: ({ row }) => <span>{row.original.shape}</span>,
        size: 100,
      },
      {
        id: "salesPrice",
        header: ({ column }) => (
          <DataGridColumnHeader title="Sales Price" column={column} />
        ),
        accessorFn: (row) => row.salesPrice,
        cell: ({ row }) => {
          const isEditing =
            editingCell?.id === row.original.id &&
            editingCell?.field === "salesPrice";
          return isEditing ? (
            <input
              autoFocus
              type="text"
              className="border px-2 py-1 text-sm w-full"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onBlur={() =>
                handleSaveEdit(row.original.id, "salesPrice", editedValue)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveEdit(row.original.id, "salesPrice", editedValue);
                } else if (e.key === "Escape") {
                  setEditingCell(null);
                }
              }}
            />
          ) : (
            <span
              onClick={() => {
                setEditingCell({ id: row.original.id, field: "salesPrice" });
                setEditedValue(row.original.salesPrice);
              }}
              className="cursor-pointer"
            >
              {row.original.salesPrice}
            </span>
          );
        },
        size: 100,
      },
      {
        id: "margin",
        header: ({ column }) => (
          <DataGridColumnHeader title="Margin" column={column} />
        ),
        accessorFn: (row) => row.margin,
        cell: ({ row }) => <span>{row.original.margin}</span>,
        size: 100,
      },
      {
        id: "collection",
        header: ({ column }) => (
          <DataGridColumnHeader title="Collection" column={column} />
        ),
        accessorFn: (row) => row.collection,
        cell: ({ row }) => <span>{row.original.collection}</span>,
        size: 115,
      },
      {
        id: "createdAt",
        header: ({ column }) => (
          <DataGridColumnHeader title="Created At" column={column} />
        ),
        accessorFn: (row) => row.createdAt,
        cell: ({ row }) => <span>{row.original.createdAt}</span>,
        size: 125,
      },
      {
        id: "lastUpdatedDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Updated Date" column={column} />
        ),
        accessorFn: (row) => row.lastUpdatedDate,
        cell: ({ row }) => <span>{row.original.lastUpdatedDate}</span>,
        size: 125,
      },
      {
        id: "gender",
        header: ({ column }) => (
          <DataGridColumnHeader title="Gender" column={column} />
        ),
        accessorFn: (row) => row.gender,
        cell: ({ row }) => <span>{row.original.gender}</span>,
        size: 100,
      },
      {
        id: "action",
        header: ({ column }) => (
          <DataGridColumnHeader title="Action" column={column} />
        ),
        accessorFn: (row) => row.orderChannel,
        cell: ({ row }) => (
          <div className="flex gap-[10px]">
            <Button mode="icon" variant="outline">
              <Edit2Icon />
            </Button>
            <Button
              mode="icon"
              variant="outline"
              onClick={() => onView(row.original)}
            >
              <EyeIcon />
            </Button>
          </div>
        ),
        size: 100,
      },
    ],
    [editingCell, setEditingCell, editedValue, setEditedValue, handleSaveEdit, onView],
  );
};
