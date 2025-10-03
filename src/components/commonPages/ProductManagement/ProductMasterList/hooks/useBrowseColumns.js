import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";

export const useBrowseColumns = ({ onClick, onView }) => {
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
            title="Variant Image"
            column={column}
            onClick={() => onClick("Variants")}
          />
        ),
        accessorFn: (row) => row.image,
        cell: ({ row }) => (
          <img
            src={row.original.data ? row.original.data.product[0].image : ""} // this now comes from variant
            // alt={row.original.designno}
            className="w-[50px] h-[50px] object-cover rounded"
          />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader title="Variant Name" column={column} />
        ),
        accessorFn: (row) => row.category,
        cell: ({ row }) => <p>{row.original.category}</p>,
        enableSorting: true,
        size: 135,
      },
      {
        id: "base_price",
        header: ({ column }) => (
          <DataGridColumnHeader title="Base Price" column={column} />
        ),
        accessorFn: (row) => row.baseprice,
        cell: ({ row }) => <span>{row.original.baseprice}</span>,
        size: 135,
      },
      {
        id: "selling_price",
        header: ({ column }) => (
          <DataGridColumnHeader title="Selling Price" column={column} />
        ),
        accessorFn: (row) => row.selling_price,
        cell: ({ row }) => <span>{row.original.selling_price}</span>,
        size: 135,
      },
      {
        id: "metal",
        header: ({ column }) => (
          <DataGridColumnHeader title="Metal" column={column} />
        ),
        accessorFn: (row) => row.metal_color,
        cell: ({ row }) => {
          const metals = Array.isArray(row.original.metal_color)
            ? row.original.metal_color
            : [];

          return (
            <div className="flex gap-1">
              {metals.map((color, index) => (
                <span
                  key={index}
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor:
                      color.toLowerCase() === "yellow"
                        ? "#D6B34C"
                        : color.toLowerCase() === "white"
                        ? "#E8E8E8"
                        : color.toLowerCase() === "rose"
                        ? "#D8A083"
                        : color,
                  }}
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
