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
            title="Product Image"
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
          <DataGridColumnHeader title="Design Number" column={column} />
        ),
        accessorFn: (row) => row.designNo,
        cell: ({ row }) => <p>{row.original.designNo}</p>,
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
        id: "jewellabelPrice",
        header: ({ column }) => (
          <DataGridColumnHeader title="Jewellabel Price" column={column} />
        ),
        accessorFn: (row) => row.jewellabelPrice,
        cell: ({ row }) => <span>{row.original.jewellabelPrice}</span>,
        size: 135,
      },
      {
        id: "nioraPrice",
        header: ({ column }) => (
          <DataGridColumnHeader title="Niora Price" column={column} />
        ),
        accessorFn: (row) => row.nioraPrice,
        cell: ({ row }) => <span>{row.original.nioraPrice}</span>,
        size: 135,
      },
      {
        id: "margin",
        header: ({ column }) => (
          <DataGridColumnHeader title="Margin" column={column} />
        ),
        accessorFn: (row) => row.margin,
        cell: ({ row }) => <span>{row.original.margin}%</span>,
        size: 100,
      },
      {
        id: "active",
        header: ({ column }) => (
          <DataGridColumnHeader title="Active" column={column} />
        ),
        accessorFn: (row) => row.active,
        cell: ({ row }) => <span>{row.original.active}</span>,
        size: 135,
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
            <Button mode="icon" 
            variant="outline"
            onClick={() => onView(row.original)}
            >
              <Edit2Icon />
            </Button>
            <Button mode="icon" variant="outline">
              <Trash2Icon />
            </Button>
          </div>
        ),
        size: 125,
      },
    ],
    [onClick, onView]
  );
};
