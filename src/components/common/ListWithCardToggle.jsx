"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/common/ui/container";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardToolbar,
} from "@/components/common/ui/cards/card";
import { DataGrid } from "@/components/common/ui/data-grid";
import { DataGridPagination } from "@/components/common/ui/data-grid-pagination";
import { DataGridTable } from "@/components/common/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/common/ui/scroll-area";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/common/ui/toggle-group";
import { Columns, LayoutGrid, List, Search, Settings2, X } from "lucide-react";
import {
  ToolbarDescription,
  ToolbarTitle,
} from "@/components/common/ui/toolbar";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMarginService } from "@/services/marginService";
import { DataGridColumnVisibility } from "./ui/data-grid-column-visibility";
import { Label } from "./ui/label";

export const ListWithCardToggle = ({
  title,
  description,
  data = [],
  columns = [],
  pagination: externalPagination,
  onPaginationChange,
  pageCount,
  totalCount,
  paginationLinks,
  renderCardView,
  createBtn,
  filterDropdownProps,
  disableFooter,
  disableDescription,
  customCardHeader,
  searchQuery: externalSearchQuery,
  onSearchChange,
  filterFunction,
  serverSidePagination = false,
  ToolbarComponent,
  showBulkMargin,
  onRefresh,
}) => {
  const [currentMode, setCurrentMode] = useState(
    renderCardView ? "cards" : "list"
  );
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "id", desc: true }]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");
  const [deletePermissionIds, setDeletePermissionIds] = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const { updateBulkMargin } = useMarginService();

  // Separate state for list view
  const [showBulkInputList, setShowBulkInputList] = useState(false);
  const [bulkLabourList, setBulkLabourList] = useState("");
  const [bulkDiamondList, setBulkDiamondList] = useState("");

  // Separate state for card view
  const [showBulkInputCard, setShowBulkInputCard] = useState(false);
  const [bulkLabourCard, setBulkLabourCard] = useState("");
  const [bulkDiamondCard, setBulkDiamondCard] = useState("");

  const [columnPinning, setColumnPinning] = useState({
    left: ["expand-column"],
    right: ["actions"],
  });

  const actualPagination = serverSidePagination
    ? externalPagination
    : pagination;

  // Default filter function if none provided
  const defaultFilterFunction = (data, query) => {
    if (!query) return data;
    const lowercaseQuery = query.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowercaseQuery)
      )
    );
  };

  const handleBulkSave = async (mode) => {
    const isListMode = mode === "list";
    const labour = isListMode ? bulkLabourList : bulkLabourCard;
    const diamond = isListMode ? bulkDiamondList : bulkDiamondCard;

    if ((!labour && !diamond) || deletePermissionIds.length === 0) return;

    setIsSaving(true);
    try {
      const selectedProducts = table
        .getRowModel()
        .rows.filter((row) => deletePermissionIds.includes(row.id))
        .map((row) => row.original);

      const success = await updateBulkMargin(selectedProducts, {
        labour,
        diamond,
      });

      if (success) {
        onRefresh?.();

        if (isListMode) {
          setShowBulkInputList(false);
          setBulkLabourList("");
          setBulkDiamondList("");
        } else {
          setShowBulkInputCard(false);
          setBulkLabourCard("");
          setBulkDiamondCard("");
        }

        setRowSelection({});
      }
    } finally {
      setIsSaving(false);
    }
  };

  const COLUMN_VISIBILITY_KEY = `${title}-column-visibility`;

  const [columnVisibility, setColumnVisibility] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(COLUMN_VISIBILITY_KEY)) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(
      COLUMN_VISIBILITY_KEY,
      JSON.stringify(columnVisibility)
    );
  }, [columnVisibility]);

  const filteredData = useMemo(() => {
    if (serverSidePagination || !searchQuery) return data;
    const filterFunc = filterFunction || defaultFilterFunction;
    return filterFunc(data, searchQuery);
  }, [data, searchQuery, filterFunction, serverSidePagination]);

  const table = useReactTable({
    columns,
    data: serverSidePagination ? data : filteredData,
    enablePinning: true,
    getRowId: (row) => String(row.id),
    state: {
      pagination: actualPagination,
      sorting,
      rowSelection,
      columnPinning,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      columnPinning: {
        left: ["expand-column"],
        right: ["actions"],
      },
    },
    onColumnPinningChange: setColumnPinning,
    onPaginationChange: serverSidePagination
      ? onPaginationChange
      : setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(serverSidePagination
      ? { manualPagination: true, pageCount }
      : {
          getPaginationRowModel: getPaginationRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
        }),
  });

  useEffect(() => {
    setDeletePermissionIds(Object.keys(rowSelection));
  }, [rowSelection]);

  // Sync external search query with internal state
  useEffect(() => {
    if (serverSidePagination && externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery);
    }
  }, [externalSearchQuery, serverSidePagination]);

  const handleSearchChange = (value) => {
    if (serverSidePagination) {
      onSearchChange?.(value);
    } else {
      setSearchQuery(value);
      // Reset to first page when searching
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  };

  const displayedData = serverSidePagination ? data : filteredData;
  const currentSearchValue = serverSidePagination
    ? externalSearchQuery ?? ""
    : searchQuery;

  return (
    <Container>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        {/* Header */}
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
            onValueChange={(value) => value && setCurrentMode(value)}
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

        {/* Card View */}
        {renderCardView && currentMode === "cards" && (
          <>
            {/* Bulk Action Toolbar for Cards */}
            {showBulkMargin && deletePermissionIds.length > 0 && (
              <div className="flex items-center justify-end gap-3 mb-4">
                {!showBulkInputCard ? (
                  <Button
                    variant="primary"
                    onClick={() => setShowBulkInputCard(true)}
                  >
                    Bulk Action
                  </Button>
                ) : (
                  <>
                    <Label>Labour</Label>
                    <input
                      type="number"
                      placeholder="margin"
                      className="border border-gray-300 rounded-md text-2sm px-3 py-1 w-20 text-center"
                      value={bulkLabourCard}
                      onChange={(e) => setBulkLabourCard(e.target.value)}
                    />
                    <Label>Diamond</Label>
                    <input
                      type="number"
                      placeholder="margin"
                      className="border border-gray-300 rounded-md text-2sm px-3 py-1 w-20 text-center"
                      value={bulkDiamondCard}
                      onChange={(e) => setBulkDiamondCard(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={() => handleBulkSave("card")}
                      disabled={
                        isSaving || (!bulkLabourCard && !bulkDiamondCard)
                      }
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowBulkInputCard(false);
                        setBulkLabourCard("");
                        setBulkDiamondCard("");
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
              {displayedData.map((item) => {
                const idStr = String(item.id);
                const isSelected = deletePermissionIds.includes(idStr);

                const toggleSelect = (e) => {
                  if (e && typeof e.stopPropagation === "function")
                    e.stopPropagation();

                  setRowSelection((prev) => {
                    const newSelection = { ...prev };
                    if (newSelection[idStr]) delete newSelection[idStr];
                    else newSelection[idStr] = true;
                    return newSelection;
                  });
                };

                return (
                  <div key={item.id}>
                    {renderCardView(item, { isSelected, toggleSelect })}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Table View */}
        {currentMode === "list" && (
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <DataGrid
              table={table}
              recordCount={
                serverSidePagination
                  ? totalCount || 0
                  : filteredData.length || 0
              }
              tableLayout={{
                columnsPinnable: true,
                columnsMovable: true,
                columnsVisibility: true,
                cellBorder: true,
              }}
            >
              <Card>
                <CardHeader className="flex-col sm:flex-row items-stretch sm:items-center py-5 gap-2.5 justify-between">
                  {/*Use custom Toolbar if passed */}
                  {ToolbarComponent ? (
                    <ToolbarComponent
                      searchQuery={currentSearchValue}
                      setSearchQuery={handleSearchChange}
                      pagination={pagination}
                      setPagination={setPagination}
                    />
                  ) : (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      {/* Search */}
                      <div className="relative">
                        <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                        <Input
                          placeholder="Search..."
                          value={currentSearchValue}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="ps-9 w-full"
                        />
                        {currentSearchValue && (
                          <Button
                            mode="icon"
                            variant="ghost"
                            className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                            onClick={() => handleSearchChange("")}
                          >
                            <X />
                          </Button>
                        )}
                      </div>

                      {/* Dropdown Filter */}
                      {filterDropdownProps && (
                        <div className="flex items-center gap-3">
                          {Object.entries(filterDropdownProps).map(
                            ([key, filter]) => (
                              <Select
                                key={key}
                                value={filter.value}
                                onValueChange={filter.onChange}
                              >
                                <SelectTrigger className="w-full sm:w-40">
                                  <SelectValue
                                    placeholder={filter.placeholder || key}
                                  />
                                </SelectTrigger>

                                <SelectContent>
                                  {filter.options.map((opt) => (
                                    <SelectItem
                                      key={opt.value}
                                      value={opt.value}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {showBulkMargin && deletePermissionIds.length > 0 && (
                      <div className="flex items-center gap-3">
                        {!showBulkInputList ? (
                          <Button
                            variant="primary"
                            onClick={() => setShowBulkInputList(true)}
                          >
                            Bulk Action
                          </Button>
                        ) : (
                          <>
                            <Label>Labour</Label>
                            <input
                              type="number"
                              placeholder="margin"
                              className="border border-gray-300 rounded-md text-2sm px-3 py-1 w-20 text-center"
                              value={bulkLabourList}
                              onChange={(e) =>
                                setBulkLabourList(e.target.value)
                              }
                            />
                            <Label>Diamond</Label>
                            <input
                              type="number"
                              placeholder="margin"
                              className="border border-gray-300 rounded-md text-2sm px-3 py-1 w-20 text-center"
                              value={bulkDiamondList}
                              onChange={(e) =>
                                setBulkDiamondList(e.target.value)
                              }
                            />
                            <Button
                              variant="primary"
                              onClick={() => handleBulkSave("list")}
                              disabled={
                                isSaving ||
                                (!bulkLabourList && !bulkDiamondList)
                              }
                            >
                              {isSaving ? "Saving..." : "Save"}
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setShowBulkInputList(false);
                                setBulkLabourList("");
                                setBulkDiamondList("");
                              }}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    )}

                    <CardToolbar className="flex items-center gap-2">
                      {/* Column Visibility Toggle */}
                      <DataGridColumnVisibility
                        table={table}
                        trigger={
                          <Button variant="outline" size="md">
                            <Settings2 className="mr-2 h-4 w-4" />
                            Columns
                          </Button>
                        }
                      />

                      {/* {deletePermissionIds.length > 0 && (
                      <Button
                        variant="destructive"
                        onClick={() => setGroupDeleteDialogOpen(true)}
                      >
                        Delete {deletePermissionIds.length} permissions
                      </Button>
                    )} */}
                      {createBtn && (
                        <div className="flex items-center justify-end">
                          {createBtn}
                        </div>
                      )}
                    </CardToolbar>
                  </div>
                </CardHeader>

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
                    <DataGridPagination
                      paginationLinks={paginationLinks}
                      totalCount={
                        serverSidePagination ? totalCount : filteredData.length
                      }
                    />
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
