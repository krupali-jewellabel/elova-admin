"use client";

import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import { Button } from "@/components/common/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { StatusBadge } from "@/components/common/ui/badge";

export const useSelectionColumns = (bestSellerIds = [], onView) => {
  const columns = useMemo(
    () => [
      {
        id: "collectionId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Collection ID" column={column} />
        ),
        accessorFn: (row) => row.collectionId,
        cell: ({ row }) => row.original.collectionId || "-",
        size: 100,
      },
      {
        id: "storeId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Store ID" column={column} />
        ),
        accessorFn: (row) => row.storeId,
        cell: ({ row }) => row.original.storeId || "-",
        size: 100,
      },
      {
        id: "productIds",
        header: ({ column }) => (
          <DataGridColumnHeader title="Product IDs" column={column} />
        ),
        accessorFn: (row) => row.productIds.join(", "),
        cell: ({ row }) => {
          const ids = row.original.productIds || [];
          return (
            <div className="flex flex-wrap gap-1">
              {ids.map((id) => (
                <StatusBadge
                  key={id}
                  size="sm"
                  appearance={bestSellerIds.includes(id) ? "solid" : "outline"}
                  status={`#${id}`}
                />
              ))}
            </div>
          );
        },
        size: 200,
      },
      {
        id: "sortOrder",
        header: ({ column }) => (
          <DataGridColumnHeader title="Sort Order" column={column} />
        ),
        accessorFn: (row) => row.sortOrder,
        cell: ({ row }) => row.original.sortOrder ?? "-",
        size: 80,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
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
              onClick={() => console.log("Delete", row.original.collectionId)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        ),
        size: 100,
      },
    ],
    [bestSellerIds, onView]
  );

  return columns;
};
