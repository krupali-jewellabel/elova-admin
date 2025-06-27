"use client";

import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { Badge, BadgeDot } from "@/components/common/ui/badge";

export const useReturnRepairColumns = () => {
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
        id: "returnId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Return ID" column={column} />
        ),
        accessorFn: (row) => row.returnId,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.original.returnId}</span>
          </div>
        ),
        enableSorting: true,
        size: 100,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "relatedOrderId",
        header: ({ column }) => (
          <DataGridColumnHeader title="Related Order ID" column={column} />
        ),
        accessorFn: (row) => row.relatedOrderId,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {row.original.relatedOrderId}
            </span>
          </div>
        ),
        enableSorting: true,
        size: 135,
      },
      {
        id: "storeName",
        header: ({ column }) => (
          <DataGridColumnHeader title="Store Name" column={column} />
        ),
        accessorFn: (row) => row.storeName,
        cell: ({ row }) => <span>{row.original.storeName}</span>,
        size: 135,
      },
      {
        id: "reason",
        header: ({ column }) => (
          <DataGridColumnHeader title="Reason" column={column} />
        ),
        accessorFn: (row) => row.reason,
        cell: ({ row }) => <span>{row.original.reason}</span>,
        size: 135,
      },
      {
        id: "image",
        header: ({ column }) => (
          <DataGridColumnHeader title="Image" column={column} />
        ),
        accessorFn: (row) => row.image,
        cell: ({ row }) => (
          <img src={row.original.image} className="w-[80px] h-[80px]" />
        ),
        enableSorting: true,
        size: 135,
      },
      {
        id: "product",
        header: ({ column }) => (
          <DataGridColumnHeader title="Product" column={column} />
        ),
        accessorFn: (row) => row.product,
        cell: ({ row }) => row.original.product,
        size: 135,
      },
      {
        id: "charge",
        header: ({ column }) => (
          <DataGridColumnHeader title="Charge" column={column} />
        ),
        accessorFn: (row) => row.charge,
        cell: ({ row }) => <span>{row.original.charge}</span>,
        size: 135,
      },
      {
        id: "returnStatus",
        header: ({ column }) => (
          <DataGridColumnHeader title="Return Status" column={column} />
        ),
        accessorFn: (row) => row.returnStatus,
        cell: ({ row }) => {
          const status = row.original.returnStatus;
          return status?.label ? (
            <Badge
              size="lg"
              variant={status.variant}
              appearance="outline"
              shape="circle"
            >
              <BadgeDot /> {status.label}
            </Badge>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          );
        },
        size: 135,
      },
      {
        id: "resolutionType",
        header: ({ column }) => (
          <DataGridColumnHeader title="Resolution Type" column={column} />
        ),
        accessorFn: (row) => row.resolutionType,
        cell: ({ row }) => <span>{row.original.resolutionType}</span>,
        size: 135,
      },
      {
        id: "productCondition",
        header: ({ column }) => (
          <DataGridColumnHeader title="Product Condition" column={column} />
        ),
        accessorFn: (row) => row.productCondition,
        cell: ({ row }) => <span>{row.original.productCondition}</span>,
        size: 135,
      },
      {
        id: "orderChannel",
        header: ({ column }) => (
          <DataGridColumnHeader title="Order Channel" column={column} />
        ),
        accessorFn: (row) => row.orderChannel,
        cell: ({ row }) => <span>{row.original.orderChannel}</span>,
        size: 135,
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
    []
  );
};
