import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { EyeIcon, ShoppingCart } from "lucide-react";

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
        id: "variants",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Variants"
            column={column}
            onClick={() => onClick("Variants")}
          />
        ),
        accessorFn: (row) => row.variantsimg,
        cell: ({ row }) => (
          <img src={row.original.variantsimg} className="w-[50px] h-[50px]" />
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
          <DataGridColumnHeader title="Name" column={column} />
        ),
        accessorFn: (row) => row.name,
        cell: ({ row }) => <p>{row.original.name}</p>,
        enableSorting: true,
        size: 135,
      },
      {
        id: "baseprice",
        header: ({ column }) => (
          <DataGridColumnHeader title="Base Price" column={column} />
        ),
        accessorFn: (row) => row.baseprice,
        cell: ({ row }) => <span>{row.original.baseprice}</span>,
        size: 135,
      },
      {
        id: "defaultmargin",
        header: ({ column }) => (
          <DataGridColumnHeader title="Default Margin " column={column} />
        ),
        accessorFn: (row) => row.defaultmargin,
        cell: ({ row }) => <span>{row.original.defaultmargin}</span>,
        size: 135,
      },
      {
        id: "sellingprice",
        header: ({ column }) => (
          <DataGridColumnHeader title="Selling Price" column={column} />
        ),
        accessorFn: (row) => row.sellingprice,
        cell: ({ row }) => row.original.sellingprice,
        size: 135,
      },
      {
        id: "metal",
        header: ({ column }) => (
          <DataGridColumnHeader title="Metal" column={column} />
        ),
        accessorFn: (row) => row.metal,
        cell: ({ row }) => {
          let metals = row.original.metal;

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
      {
        id: "action",
        header: ({ column }) => (
          <DataGridColumnHeader title="Action" column={column} />
        ),
        accessorFn: (row) => row.orderChannel,
        cell: ({ row }) => (
          <div className="flex items-center">
            <Button
              mode="icon"
              variant="outline"
              onClick={() => onView(row.original)}
            >
              <EyeIcon />
            </Button>

            {/* <Button variant="outline" className="ms-2 shrink-0">
              <ShoppingCart /> Add
            </Button> */}
          </div>
        ),
      },
    ],
    [onView]
  );
};
