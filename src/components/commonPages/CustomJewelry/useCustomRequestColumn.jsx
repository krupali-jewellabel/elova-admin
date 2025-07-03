"use client";
import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { StatusBadge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const useCustomRequestColumn = () => {
  const route = useRouter();
  const handleView = (row) => {
    route.push(`/custom-jewelary/${row.request_id}`);
  };
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
        id: "request_id",
        header: ({ column }) => (
          <DataGridColumnHeader title="Requested On" column={column} />
        ),
        accessorFn: (row) => row.request_id,
        cell: ({ row }) => <span>{row.original.request_id}</span>,
        size: 135,
      },
      {
        id: "type",
        header: ({ column }) => (
          <DataGridColumnHeader title="Type" column={column} />
        ),
        accessorFn: (row) => row.type,
        cell: ({ row }) => <span>{row.original.type}</span>,
        size: 135,
      },
      {
        id: "requestedOn",
        header: ({ column }) => (
          <DataGridColumnHeader title="Requested On" column={column} />
        ),
        accessorFn: (row) => row.requestedOn,
        cell: ({ row }) => row.original.requestedOn,
        size: 135,
      },
      {
        id: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        accessorFn: (row) => row.status,
        cell: ({ row }) => (
          <>
            <StatusBadge
              size="lg"
              appearance="outline"
              status={row.original.status}
            />
          </>
        ),
        enableSorting: true,
        size: 135,
      },

      {
        id: "assignedDesigner",
        header: ({ column }) => (
          <DataGridColumnHeader title="Assigned Designer" column={column} />
        ),
        accessorFn: (row) => row.assignedDesigner,
        cell: ({ row }) => <span>{row.original.assignedDesigner}</span>,
        size: 135,
      },

      {
        id: "action",
        header: ({ column }) => (
          <DataGridColumnHeader title="Action" column={column} />
        ),
        accessorFn: (row) => row.orderChannel,
        cell: ({ row }) => (
          <Button
            mode="icon"
            variant="outline"
            onClick={() => handleView(row.original)}
          >
            <EyeIcon />
          </Button>
        ),
      },
    ],
    []
  );
};

export default useCustomRequestColumn;
