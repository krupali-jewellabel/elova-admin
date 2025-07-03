import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";
import { Progress } from "@/components/common/ui/progress";

export const userProductListColumns = () => {
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
        id: "categories",
        header: ({ column }) => (
          <DataGridColumnHeader title="Categories" column={column} />
        ),
        accessorFn: (row) => row.name,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <img
              src={row.original.logo}
              className="w-[50px] h-[50px] p-[9px] rounded-[6px]"
            />
            <span className="text-sm font-medium">{row.original.name}</span>
          </div>
        ),
        enableSorting: true,
        size: 280,
        meta: {
          skeleton: <Skeleton className="h-4 w-[125px]" />,
        },
      },
      {
        id: "no_of_products",
        header: ({ column }) => (
          <DataGridColumnHeader title="No. Of Products" column={column} />
        ),
        accessorFn: (row) => row.no_of_products,
        cell: ({ row }) => <span>{row.original.no_of_products}</span>,
        enableSorting: true,
        size: 135,
      },
      {
        id: "budget_used",
        header: ({ column }) => (
          <DataGridColumnHeader title="Budget Used" column={column} />
        ),
        accessorFn: (row) => row.budget_used,
        cell: ({ row }) => {
          const raw = row.original.budget_used;

          let percent = 0;
          const maxBudget = 50;

          if (typeof raw === "string" && raw.endsWith("L")) {
            const numeric = parseFloat(raw.replace("L", ""));
            if (!isNaN(numeric)) {
              percent = Math.min((numeric / maxBudget) * 100, 100);
            }
          }

          return (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">{raw}</span>
              <Progress
                value={percent}
                indicatorClassName="bg-primary"
                className="h-1.5"
              />
            </div>
          );
        },
        size: 135,
      },
      {
        id: "margin",
        header: ({ column }) => (
          <DataGridColumnHeader title="Margin" column={column} />
        ),
        accessorFn: (row) => row.margin,
        cell: ({ row }) => <span>{row.original.margin}</span>,
        size: 135,
      },
      {
        id: "last_updated",
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Updated" column={column} />
        ),
        accessorFn: (row) => row.last_updated,
        cell: ({ row }) => row.original.last_updated,
        size: 135,
      },
      {
        id: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        accessorFn: (row) => row.status,
        cell: ({ row }) => (
          <div
            className={`px-3 py-1 rounded-sm text-sm font-medium inline-flex items-center justify-center ${
              row.original.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {row.original.status}
          </div>
        ),
        size: 135,
      },
    ],
    []
  );
};

export default userProductListColumns;
