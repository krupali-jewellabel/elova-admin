"use client";

import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { toTitleCase } from "@/lib/utils";

export const useProductListColumns = ({
  editingCell,
  setEditingCell,
  editedValue,
  handleSaveEdit,
  onClick,
  onView,
}) => {
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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
              src={productImage}
              className="w-[55px] h-[70px] object-cover"
              alt="product"
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
        id: "title",
        header: ({ column }) => (
          <DataGridColumnHeader title="Title" column={column} />
        ),
        accessorFn: (row) => row.title,
        cell: ({ row }) => toTitleCase(row.original.title) || "-",
        size: 120,
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
        cell: ({ row }) => toTitleCase(row.original.category),
        size: 120,
      },
      {
        id: "style",
        header: ({ column }) => (
          <DataGridColumnHeader title="Style" column={column} />
        ),
        accessorFn: (row) => row.style,
        cell: ({ row }) => toTitleCase(row.original.style),
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
        id: "base_price",
        header: ({ column }) => (
          <DataGridColumnHeader title="Base Price" column={column} />
        ),
        accessorFn: (row) => row?.base_price,
        cell: ({ row }) => {
          return `${row?.original?.base_price || 0}`;
        },
        size: 120,
      },
      {
        id: "salesPrice",
        header: ({ column }) => (
          <DataGridColumnHeader title="Sales Price" column={column} />
        ),
        accessorFn: (row) => row.sales_price,
        cell: ({ row }) => `${row.original.sales_price || 0}`,
        size: 120,
      },
      {
        id: "collection",
        header: ({ column }) => (
          <DataGridColumnHeader title="Collection" column={column} />
        ),
        accessorFn: (row) => row.collection,
        cell: ({ row }) => toTitleCase(row.original.collection),
        size: 140,
      },
      {
        id: "createdAt",
        header: ({ column }) => (
          <DataGridColumnHeader title="Created At" column={column} />
        ),
        accessorFn: (row) => row.created_at,
        cell: ({ row }) => formatDate(row.original.created_at),
        size: 160,
      },
      {
        id: "lastUpdatedDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Updated" column={column} />
        ),
        accessorFn: (row) => row.updated_at,
        cell: ({ row }) => formatDate(row.original.updated_at),
        size: 160,
      },
      {
        id: "gender",
        header: ({ column }) => (
          <DataGridColumnHeader title="Gender" column={column} />
        ),
        accessorFn: (row) => row.gender,
        cell: ({ row }) => toTitleCase(row.original.gender),
        size: 100,
      },
      {
        id: "actions",
        header: "Actions",
        pinning: "right",
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-[10px] bg-white">
            <Button
              variant="outline"
              mode="icon"
              onClick={() => onView(row.original)}
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
            {/* <Button
              variant="outline"
              mode="icon"
              onClick={() => setEditingCell(row.original)}
            >
              <Edit2Icon className="h-4 w-4" />
            </Button> */}
          </div>
        ),
        size: 100,
      },
    ],
    [editingCell, setEditingCell, editedValue, handleSaveEdit, onView, onClick]
  );

  return { columns };
};
