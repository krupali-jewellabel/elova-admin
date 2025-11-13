import React, { useMemo, useState } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";

import { Skeleton } from "@/components/common/ui/skeleton";
import { Button } from "@/components/common/ui/button";
import { Edit2Icon, Eye } from "lucide-react";
import { RiDeleteBin5Line } from "@remixicon/react";

export const useUsersList = ({ onEdit, onDelete, onViewPermission } = {}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        id: "id",
        header: ({ column }) => (
          <DataGridColumnHeader title="ID" column={column} />
        ),
        accessorFn: (row) => row.id,
        cell: ({ row }) => (
          <span className="text-sm font-medium">{row.getValue("id")}</span>
        ),
        size: 50,
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
        size: 100,
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
        size: 100,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      // {
      //   id: "password",
      //   header: ({ column }) => (
      //     <DataGridColumnHeader title="Password" column={column} />
      //   ),
      //   accessorFn: (row) => row.password,
      //   cell: ({ row }) => {
      //     const [visible, setVisible] = React.useState(false);
      //     const value = row.getValue("password");

      //     return (
      //       <span
      //         className="text-sm font-medium cursor-pointer select-none"
      //         title={
      //           visible ? "Click to hide password" : "Click to show password"
      //         }
      //         onClick={() => setVisible((prev) => !prev)}
      //       >
      //         {visible ? value : "••••••••"}
      //       </span>
      //     );
      //   },
      //   size: 100,
      //   enableSorting: false,
      //   meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      // },
      {
        id: "roles",
        header: ({ column }) => (
          <DataGridColumnHeader title="Role Name" column={column} />
        ),
        accessorFn: (row) => row.roles?.[0].name ?? "-",
        cell: ({ row }) => {
          return (
            <span className="text-sm font-medium">
              {row.original.roles?.[0].name}
            </span>
          );
        },
        size: 100,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      {
        id: "department",
        header: ({ column }) => (
          <DataGridColumnHeader title="Department Name" column={column} />
        ),
        accessorFn: (row) => row?.department?.name ?? "-",
        cell: ({ row }) => (
          <span className="text-sm font-medium">
            {row?.original?.department?.name}
          </span>
        ),
        size: 100,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      {
        id: "designation",
        header: ({ column }) => (
          <DataGridColumnHeader title="Designation Name" column={column} />
        ),
        accessorFn: (row) => row?.designation,
        cell: ({ row }) => (
          <span className="text-sm font-medium">
            {row.getValue("designation")}
          </span>
        ),
        size: 100,
        enableSorting: false,
        meta: { skeleton: <Skeleton className="h-4 w-[125px]" /> },
      },
      {
        id: "is_manager",
        header: ({ column }) => (
          <DataGridColumnHeader title="Manager" column={column} />
        ),
        accessorFn: (row) => (row?.is_manager ? "Yes" : "No"),
        cell: ({ row }) => (
          <span className="text-sm font-medium">
            {row.getValue("is_manager")}
          </span>
        ),
        size: 60,
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
              variant="outline"
              className="!cursor-pointer"
              onClick={() => onViewPermission && onViewPermission(row.original)}
            >
              <Eye /> View Permissions
            </Button>

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
              onClick={() => {
                onDelete(row.original.id);
              }}
            >
              <RiDeleteBin5Line />
            </Button>
          </div>
        ),
        size: 130,
        enableSorting: false,
      },
    ],
    [onEdit, onDelete, onViewPermission]
  );

  return { columns, dialogOpen, setDialogOpen };
};
