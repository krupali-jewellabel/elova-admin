import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { Edit2Icon, EyeIcon } from "lucide-react";

export const useOrderListColumns = ({ onEdit, onView }) => {
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
            <span className="text-sm font-medium">{row.original.id}</span>
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
        accessorFn: (row) => row.items[0]?.product?.image,
        cell: ({ row }) => (
          <img
            src={row.original.items[0]?.product?.image}
            className="w-[50px] h-[50px] p-[9px] rounded-[6px]"
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
        accessorFn: (row) => row.original?.items[0]?.product?.title || "",
        cell: ({ row }) => (
          <span>{row.original?.items[0]?.product?.title || ""}</span>
        ),
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
        accessorFn: (row) => row.created_at,
        cell: ({ row }) => {
          const date = row.original?.created_at;
          return date ? new Date(date).toLocaleDateString() : "-";
        },
        size: 135,
      },
      {
        id: "quantity",
        header: ({ column }) => (
          <DataGridColumnHeader title="Quantity" column={column} />
        ),
        accessorFn: (row) => row.items[0]?.quantity,
        cell: ({ row }) => <span>{row.original.items[0]?.quantity}</span>,
        size: 135,
      },
      {
        id: "totalValue",
        header: ({ column }) => (
          <DataGridColumnHeader title="Total Value" column={column} />
        ),
        accessorFn: (row) => row.subtotal,
        cell: ({ row }) => <span>{row.original.subtotal}</span>,
        size: 135,
      },

      {
        id: "paymentStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="Payment Status" column={column} />
        ),
        accessorFn: (row) => row.payment_status,
        cell: ({ row }) => <span>{row.original.payment_status}</span>,
        size: 135,
      },
      {
        id: "fulfilmentStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Status" column={column} />
        ),
        accessorFn: (row) => row.order_status,
        cell: ({ row }) => <span>{row.original.order_status}</span>,
        size: 135,
      },
      {
        id: "orderChannel",
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Channel" column={column} />
        ),
        accessorFn: (row) => row.payment_method,
        cell: ({ row }) => <span>{row.original.payment_method}</span>,
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
            <Button
              mode="icon"
              variant="outline"
              onClick={() => onEdit(row.original)}
            >
              <Edit2Icon />
            </Button>

            <Button
              mode="icon"
              variant="outline"
              onClick={() => {
                onView(row.original.id);
              }}
            >
              <EyeIcon />
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onView]
  );
};
