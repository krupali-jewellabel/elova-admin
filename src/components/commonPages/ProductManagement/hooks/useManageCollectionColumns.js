"use client";

import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { Edit2Icon, EyeIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { toTitleCase } from "@/lib/utils";
import ActiveToggleCell from "@/components/common/ui/ActiveToggleCell";
import { StatusBadge } from "@/components/common/ui/badge";

// ✅ Default parameter added (= {})
export const useManageCollectionColumns = ({
  editingCell,
  setEditingCell,
  editedValue,
  handleSaveEdit,
  onClick,
  onView,
} = {}) => {
  const columns = useMemo(
    () => [
      {
        id: "id",
        header: ({ column }) => (
          <DataGridColumnHeader title="Id" column={column} />
        ),
        accessorFn: (row) => row.id,
        cell: ({ row }) => row.original.id || "-",
        size: 60,
      },
      {
        id: "collection",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Collection"
            column={column}
            onClick={() => onClick?.("collection")}
          />
        ),
        accessorFn: (row) => row.collection_name,
        cell: ({ row }) => {
          const { product_image, collection_name } = row.original;
          return (
            <div className="flex items-center gap-3">
              <img
                src={product_image || "/images/products/1.png"}
                className="w-[45px] h-[45px] object-cover"
                alt={collection_name}
                onError={(e) => {
                  e.currentTarget.src = "/images/products/1.png";
                }}
              />
              <span className="text-sm font-medium text-gray-800">
                {collection_name || "-"}
              </span>
            </div>
          );
        },
        enableSorting: true,
        size: 180,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "description",
        header: ({ column }) => (
          <DataGridColumnHeader title="Description" column={column} />
        ),
        accessorFn: (row) => row.description,
        cell: ({ row }) => toTitleCase(row.original.description) || "-",
        size: 120,
      },
      {
        id: "products",
        header: ({ column }) => (
          <DataGridColumnHeader title="Products" column={column} />
        ),
        accessorFn: (row) => row.products,
        cell: ({ row }) => row.original.products,
        size: 120,
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
        id: "is_active",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        accessorFn: (row) => row.is_active,
        cell: ({ row }) => (
          <ActiveToggleCell
            id={row.original.id}
            isActive={row.original.is_active}
            toggleStatus={() => console.log("Toggle", row.original.id)}
          />
        ),
        size: 100,
      },
      {
        id: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Visibility" column={column} />
        ),
        accessorFn: (row) => (row.status === 1 ? "published" : "draft"),
        cell: ({ row }) => {
          const isPublished = row.original.status === 1;
          const statusText = isPublished ? "published" : "draft";
          return (
            <StatusBadge
              size="lg"
              appearance="solid"
              className={
                isPublished
                  ? "bg-green-200 text-green-700"
                  : "bg-muted text-mono"
              }
              status={statusText}
            />
          );
        },
        size: 110,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-[5px]">
            <Button
              variant="outline"
              mode="icon"
              onClick={() => onView?.(row.original)}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              mode="icon"
              onClick={() => setEditingCell?.(row.original)} // ✅ opens modal
            >
              <Edit2Icon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              mode="icon"
              onClick={() => onView?.(row.original)}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              mode="icon"
              onClick={() => onView?.(row.original)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        ),
        size: 115,
      },
    ],
    [editingCell, setEditingCell, editedValue, handleSaveEdit, onView, onClick]
  );

  return columns;
};
