import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";

export const useCustomerData = () => {
  return useMemo(() => [
    {
      accessorKey: "id",
      header: () => <DataGridTableRowSelectAll />,
      cell: ({ row }) => <DataGridTableRowSelect row={row} />,
      enableSorting: false,
      enableHiding: false,
      size: 48,
    },
    {
      id: "firstName",
      header: ({ column }) => (
        <DataGridColumnHeader title="First Name" column={column} />
      ),
      accessorFn: (row) => row.firstName,
      cell: ({ row }) => (
        <span className="text-sm font-medium">{row.getValue("firstName")}</span>
      ),
      enableSorting: true,
      size: 180,
      meta: {
        skeleton: <Skeleton className="h-4 w-[125px]" />,
      },
    },
    {
      id: "lastName",
      header: ({ column }) => (
        <DataGridColumnHeader title="Last Name" column={column} />
      ),
      accessorFn: (row) => row.lastName,
      cell: ({ row }) => (
        <span className="text-sm font-medium">{row.getValue("lastName")}</span>
      ),
      enableSorting: true,
      size: 180,
      meta: {
        skeleton: <Skeleton className="h-4 w-[125px]" />,
      },
    },
    {
      id: "email",
      header: ({ column }) => (
        <DataGridColumnHeader title="Email ID" column={column} />
      ),
      accessorFn: (row) => row.email,
      cell: ({ row }) => <span>{row.getValue("email")}</span>,
      size: 135,
      meta: {
        skeleton: <Skeleton className="h-4 w-[100px]" />,
      },
    },
  ], []);
};
