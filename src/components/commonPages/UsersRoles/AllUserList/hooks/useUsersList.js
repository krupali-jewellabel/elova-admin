import React, { useMemo, useState } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { Edit2Icon } from "lucide-react";
import { RiDeleteBin5Line } from "@remixicon/react";

export const useUsersList = ({ onEdit, onDelete } = {}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "select",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        size: 30,
      },
      {
        id: "id",
        header: ({ column }) => (
          <DataGridColumnHeader title="ID" column={column} />
        ),
        accessorFn: (row) => row.id,
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.getValue("id")}</span>
        ),
        size: 100,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[60px]" /> },
      },
      {
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader title="Name" column={column} />
        ),
        accessorFn: (row) => row.name,
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.getValue("name")}</span>
        ),
        size: 200,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      {
        id: "email",
        header: ({ column }) => (
          <DataGridColumnHeader title="Email" column={column} />
        ),
        accessorFn: (row) => row.email,
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.getValue("email")}</span>
        ),
        size: 200,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      {
        id: "password",
        header: ({ column }) => (
          <DataGridColumnHeader title="Password" column={column} />
        ),
        accessorFn: (row) => row.password,
        cell: ({ row }) => {
          const [visible, setVisible] = React.useState(false);
          const value = row.getValue("password");

          return (
            <span
              className="text-sm font-medium cursor-pointer select-none"
              title={
                visible ? "Click to hide password" : "Click to show password"
              }
              onClick={() => setVisible((prev) => !prev)}
            >
              {visible ? value : "••••••••"}
            </span>
          );
        },
        size: 200,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      {
        id: "role",
        header: ({ column }) => (
          <DataGridColumnHeader title="Role Name" column={column} />
        ),
        accessorFn: (row) => row.role,
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.getValue("role")}</span>
        ),
        size: 200,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      {
        id: "department",
        header: ({ column }) => (
          <DataGridColumnHeader title="Department Name" column={column} />
        ),
        accessorFn: (row) => row.department,
        cell: ({ row }) => (
          <span className="text-sm font-medium">
            {row.getValue("department")}
          </span>
        ),
        size: 200,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      {
        id: "action",
        header: ({ column }) => (
          <DataGridColumnHeader title="Action" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex gap-2.5">
            <Button
              mode="icon"
              variant="outline"
              onClick={() => onEdit && onEdit(row.original)}
            >
              <Edit2Icon />
            </Button>
            <Button
              mode="icon"
              variant="outline"
              className="!cursor-pointer"
              onClick={() => onDelete && onDelete(row.original.id)}
            >
              <RiDeleteBin5Line />
            </Button>
          </div>
        ),
        size: 120,
        enableSorting: false,
      },
    ],
    [onEdit, onDelete]
  );

  return { columns, dialogOpen, setDialogOpen };
};
