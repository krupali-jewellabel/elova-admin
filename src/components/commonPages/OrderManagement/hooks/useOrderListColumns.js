import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { Edit2Icon, EyeIcon } from "lucide-react";

export const useOrderListColumns = ({ orderListView, handleView }) => {
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
        id: "orderId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Id" column={column} />
        ),
        accessorFn: (row) => row.orderId,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.original.orderId}</span>
          </div>
        ),
        enableSorting: true,
        size: 180,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "image",
        header: ({ column }) => (
          <DataGridColumnHeader title="Image" column={column} />
        ),
        accessorFn: (row) => row.image,
        cell: ({ row }) => (
          <img
            src={row.original.image}
            className="w-[50px] h-[50px] p-[9px] bg-[#F1F1F2] rounded-[6px]"
          />
        ),
        enableSorting: true,
        size: 135,
      },
      {
        id: "productName",
        header: ({ column }) => (
          <DataGridColumnHeader title="Product Name" column={column} />
        ),
        accessorFn: (row) => row.productName,
        cell: ({ row }) => <span>{row.original.productName}</span>,
        size: 135,
      },
      // {
      //   id: "storeName",
      //   header: ({ column }) => (
      //     <DataGridColumnHeader title="Store Name" column={column} />
      //   ),
      //   accessorFn: (row) => row.storeName,
      //   cell: ({ row }) => <span>{row.original.storeName}</span>,
      //   size: 135,
      // },
      {
        id: "orderDate",
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Date" column={column} />
        ),
        accessorFn: (row) => row.orderDate,
        cell: ({ row }) => row.original.orderDate,
        size: 135,
      },
      {
        id: "quantity",
        header: ({ column }) => (
          <DataGridColumnHeader title="Quantity" column={column} />
        ),
        accessorFn: (row) => row.quantity,
        cell: ({ row }) => <span>{row.original.quantity}</span>,
        size: 135,
      },
      {
        id: "totalValue",
        header: ({ column }) => (
          <DataGridColumnHeader title="Total Value" column={column} />
        ),
        accessorFn: (row) => row.totalValue,
        cell: ({ row }) => <span>{row.original.totalValue}</span>,
        size: 135,
      },

      {
        id: "paymentStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="Payment Status" column={column} />
        ),
        accessorFn: (row) => row.paymentStatus,
        cell: ({ row }) => <span>{row.original.paymentStatus}</span>,
        size: 135,
      },
      {
        id: "fulfilmentStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="Fulfilment Status" column={column} />
        ),
        accessorFn: (row) => row.fulfilmentStatus,
        cell: ({ row }) => <span>{row.original.fulfilmentStatus}</span>,
        size: 135,
      },
      {
        id: "orderChannel",
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Channel" column={column} />
        ),
        accessorFn: (row) => row.orderChannel,
        cell: ({ row }) => <span>{row.original.orderChannel}</span>,
        size: 130,
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
              onClick={() => handleView(row.original)}
            >
              <EyeIcon />
            </Button>
          </div>
        ),
      },
    ],
    [handleView, orderListView]
  );
};
