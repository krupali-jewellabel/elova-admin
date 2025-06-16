import { useMemo } from "react";
import { DataGridColumnHeader } from "@/components/common/ui/data-grid-column-header";
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/common/ui/data-grid-table";
import { Skeleton } from "@/components/common/ui/skeleton";

export const useCustomMarginProductsColumns = (onClick) => {
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
            {/* View */}
            {/* <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => onClick(row.original)}View
            >
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button> */}
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => onClick(row.original)}
            >
              {/* Optional: Add label text if needed */}
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>


            {/* Edit */}
            <button className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            {/* Delete */}
            <button className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ),
        size: 100,
      },
    ],
  );
};
