import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Edit2Icon, EyeIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/common/ui/button";

export const useCustomMarginProductsColumns = ({
  onClick = () => {},
  onView = () => {},
}) => {
  return useMemo(() => {
    return [
      {
        accessorKey: "id",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        size: 48,
      },
      {
        id: "id",
        header: ({ column }) => (
          <DataGridColumnHeader title="Id" column={column} />
        ),
        accessorFn: (row) => row.id,
        cell: ({ row }) => <p>{row.original.id}</p>,
        enableSorting: false,
        size: 100,
      },
      {
        id: "product_image",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Product Image"
            column={column}
            onClick={() => onClick("image")}
          />
        ),
        accessorFn: (row) => row.product_image,
        cell: ({ row }) => (
          <img src={row.original.product_image} className="w-[50px] h-[50px]" />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "design_no",
        header: ({ column }) => (
          <DataGridColumnHeader title="Design Number" column={column} />
        ),
        accessorFn: (row) => row.design_no,
        cell: ({ row }) => <p>{row.original.design_no}</p>,
        enableSorting: true,
        size: 135,
      },
      {
        id: "title",
        header: ({ column }) => (
          <DataGridColumnHeader title="Title" column={column} />
        ),
        accessorFn: (row) => row.title,
        cell: ({ row }) => <span>{row.original.title}</span>,
        size: 165,
      },
      {
        id: "base_price",
        header: ({ column }) => (
          <DataGridColumnHeader title="Jewellabel Price" column={column} />
        ),
        accessorFn: (row) => row.base_price,
        cell: ({ row }) => <span>${row.original.base_price}</span>,
        size: 135,
      },
      {
        id: "sales_price",
        header: ({ column }) => (
          <DataGridColumnHeader title="Niora Price" column={column} />
        ),
        accessorFn: (row) => row.sales_price,
        cell: ({ row }) => <span>${row.original.sales_price}</span>,
        size: 135,
      },
      {
        id: "margin",
        header: ({ column }) => (
          <DataGridColumnHeader title="Margin" column={column} />
        ),
        accessorFn: (row) => row.margin,
        cell: ({ row }) => <span>{row.original.store_margin}%</span>,
        size: 100,
      },
      {
        id: "actions",
        header: ({ column }) => (
          <DataGridColumnHeader title="Action" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              mode="icon"
              variant="outline"
              onClick={() => onView(row.original)}
            >
              <EyeIcon />
            </Button>
          </div>
        ),
        size: 125,
      },
    ];
  }, [onClick, onView]);
};
