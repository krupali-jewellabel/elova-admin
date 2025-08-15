import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";

export const useStockSelections = ({ onClick, onView }) => {
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
            title="Variants"
            column={column}
            onClick={() => onClick("Variants")}
          />
        ),
        accessorFn: (row) => row.image,
        cell: ({ row }) => (
          <img src={row.original.image} className="w-[50px] h-[50px]" />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "variant_shape",
        header: ({ column }) => (
          <DataGridColumnHeader title="Name" column={column} />
        ),
        accessorFn: (row) => row.variant_shape,
        cell: ({ row }) => <p>{row.original.variant_shape}</p>,
        enableSorting: true,
        size: 135,
      },
      {
        id: "base_price",
        header: ({ column }) => (
          <DataGridColumnHeader title="Base Price" column={column} />
        ),
        accessorFn: (row) => row.base_price,
        cell: ({ row }) => <span>{row.original.base_price}</span>,
        size: 135,
      },
      {
        id: "store_margin",
        header: ({ column }) => (
          <DataGridColumnHeader title="Default Margin " column={column} />
        ),
        accessorFn: (row) => row.store_margin,
        cell: ({ row }) => <span>{row.original.store_margin}</span>,
        size: 135,
      },
      {
        id: "selling_price",
        header: ({ column }) => (
          <DataGridColumnHeader title="Selling Price" column={column} />
        ),
        accessorFn: (row) => row.selling_price,
        cell: ({ row }) => row.original.selling_price,
        size: 135,
      },
      {
        id: "metal_color",
        header: ({ column }) => (
          <DataGridColumnHeader title="Metal" column={column} />
        ),
        accessorFn: (row) => row.metal_color,
        cell: ({ row }) => {
          let metals = row.original.metal_color;

          if (typeof metals === "string") {
            metals = metals.split(",").map((c) => c.trim());
          }

          if (!Array.isArray(metals)) {
            metals = [];
          }

          return (
            <div className="flex gap-1">
              {metals.map((color, index) => (
                <span
                  key={index}
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          );
        },
        size: 135,
      },
    ],
    [onView]
  );
};
