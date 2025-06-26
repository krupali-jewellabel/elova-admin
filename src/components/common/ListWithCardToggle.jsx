"use client";
import React, { useState } from "react";
import { Container } from "@/components/common/ui/container";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardTitle,
} from "@/components/common/ui/cards/card";
import { DataGrid } from "@/components/common/ui/data-grid";
import { DataGridPagination } from "@/components/common/ui/data-grid-pagination";
import { DataGridTable } from "@/components/common/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/common/ui/scroll-area";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/common/ui/toggle-group";
import {
  ToolbarDescription,
  ToolbarHeading,
  ToolbarTitle,
} from "@/components/common/ui/toolbar";
import { LayoutGrid, List } from "lucide-react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const ListWithCardToggle = ({
  title,
  description,
  data,
  columns,
  useFilteredData,
  ToolbarComponent,
  renderCardView,
  disableFooter,
  disableDescription,
  customCardHeader,
}) => {
  const [currentMode, setCurrentMode] = useState("list");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState([{ id: "id", desc: true }]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useFilteredData(searchQuery, data);

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id),
    state: { pagination, sorting, rowSelection },
    columnResizeMode: "onChange",
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Container>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <div className="flex flex-wrap items-center gap-5 justify-between">
          <div>
            <ToolbarTitle>{title}</ToolbarTitle>
            {!disableDescription && (
              <ToolbarDescription>{description}</ToolbarDescription>
            )}
          </div>

          <ToggleGroup
            type="single"
            variant="outline"
            value={currentMode}
            onValueChange={(value) => {
              if (value) setCurrentMode(value);
            }}
          >
            <ToggleGroupItem value="list">
              <List size={16} />
            </ToggleGroupItem>
            {renderCardView && (
              <ToggleGroupItem value="cards">
                <LayoutGrid size={16} />
              </ToggleGroupItem>
            )}
          </ToggleGroup>
        </div>

        {renderCardView && currentMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
            {filteredData.map(renderCardView)}
          </div>
        )}

        {currentMode === "list" && (
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <DataGrid
              table={table}
              recordCount={filteredData.length || 0}
              tableLayout={{
                columnsPinnable: true,
                columnsMovable: true,
                columnsVisibility: true,
                cellBorder: true,
              }}
            >
              <Card>
                {ToolbarComponent && (
                  <ToolbarComponent
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    pagination={pagination}
                    setPagination={setPagination}
                  />
                )}
                {customCardHeader && (
                  <CardHeader>{customCardHeader}</CardHeader>
                )}
                <CardTable>
                  <ScrollArea>
                    <DataGridTable />
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardTable>
                {!disableFooter && (
                  <CardFooter>
                    <DataGridPagination />
                  </CardFooter>
                )}
              </Card>
            </DataGrid>
          </div>
        )}
      </div>
    </Container>
  );
};