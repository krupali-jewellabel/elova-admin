// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import { Container } from "@/components/common/ui/container";
// import {
//   Card,
//   CardFooter,
//   CardHeader,
//   CardTable,
//   CardToolbar,
// } from "@/components/common/ui/cards/card";
// import { DataGrid } from "@/components/common/ui/data-grid";
// import { DataGridPagination } from "@/components/common/ui/data-grid-pagination";
// import { DataGridTable } from "@/components/common/ui/data-grid-table";
// import { ScrollArea, ScrollBar } from "@/components/common/ui/scroll-area";
// import {
//   ToggleGroup,
//   ToggleGroupItem,
// } from "@/components/common/ui/toggle-group";
// import { LayoutGrid, List, Search, X } from "lucide-react";
// import {
//   ToolbarDescription,
//   ToolbarTitle,
// } from "@/components/common/ui/toolbar";
// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// export const ListWithCardToggle = ({
//   title,
//   description,
//   data,
//   columns,
//   pagination: externalPagination,
//   onPaginationChange,
//   pageCount,
//   totalCount,
//   paginationLinks,
//   renderCardView,
//   createBtn,
//   filterDropdownProps,
//   disableFooter,
//   disableDescription,
//   customCardHeader,
//   searchQuery: externalSearchQuery,
//   onSearchChange,
//   filterFunction,
//   serverSidePagination = false,
// }) => {
//   const [currentMode, setCurrentMode] = useState("list");
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
//   const [sorting, setSorting] = useState([{ id: "id", desc: true }]);
//   const [rowSelection, setRowSelection] = useState({});
//   const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");
//   const [deletePermissionIds, setDeletePermissionIds] = useState([]);
//   const [groupDeleteDialogOpen, setGroupDeleteDialogOpen] = useState(false);

//   const actualPagination = serverSidePagination
//     ? externalPagination
//     : pagination;

//   // Default filter function if none provided
//   const defaultFilterFunction = (data, query) => {
//     if (!query) return data;
//     const lowercaseQuery = query.toLowerCase();
//     return data.filter((item) =>
//       Object.values(item).some(
//         (value) =>
//           value && value.toString().toLowerCase().includes(lowercaseQuery)
//       )
//     );
//   };

//   const filteredData = useMemo(() => {
//     if (serverSidePagination || !searchQuery) return data;
//     const filterFunc = filterFunction || defaultFilterFunction;
//     return filterFunc(data, searchQuery);
//   }, [data, searchQuery, filterFunction, serverSidePagination]);

//   const table = useReactTable({
//     columns,
//     data: serverSidePagination ? data : filteredData,
//     getRowId: (row) => String(row.id),
//     state: {
//       pagination: actualPagination,
//       sorting,
//       rowSelection,
//     },
//     onPaginationChange: serverSidePagination
//       ? onPaginationChange
//       : setPagination,
//     onSortingChange: setSorting,
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     ...(serverSidePagination
//       ? {
//           manualPagination: true,
//           pageCount,
//         }
//       : {
//           getPaginationRowModel: getPaginationRowModel(),
//           getFilteredRowModel: getFilteredRowModel(),
//         }),
//   });

//   useEffect(() => {
//     setDeletePermissionIds(Object.keys(rowSelection));
//   }, [rowSelection]);

//   // Sync external search query with internal state
//   useEffect(() => {
//     if (serverSidePagination && externalSearchQuery !== undefined) {
//       setSearchQuery(externalSearchQuery);
//     }
//   }, [externalSearchQuery, serverSidePagination]);

//   const handleSearchChange = (value) => {
//     if (serverSidePagination) {
//       onSearchChange?.(value);
//     } else {
//       setSearchQuery(value);
//       // Reset to first page when searching
//       setPagination((prev) => ({ ...prev, pageIndex: 0 }));
//     }
//   };

//   const displayedData = serverSidePagination ? data : filteredData;
//   const currentSearchValue = serverSidePagination
//     ? externalSearchQuery ?? ""
//     : searchQuery;

//   return (
//     <Container>
//       <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
//         {/* Header */}
//         <div className="flex flex-wrap items-center gap-5 justify-between">
//           <div>
//             <ToolbarTitle>{title}</ToolbarTitle>
//             {!disableDescription && (
//               <ToolbarDescription>{description}</ToolbarDescription>
//             )}
//           </div>

//           <ToggleGroup
//             type="single"
//             variant="outline"
//             value={currentMode}
//             onValueChange={(value) => value && setCurrentMode(value)}
//           >
//             <ToggleGroupItem value="list">
//               <List size={16} />
//             </ToggleGroupItem>
//             {renderCardView && (
//               <ToggleGroupItem value="cards">
//                 <LayoutGrid size={16} />
//               </ToggleGroupItem>
//             )}
//           </ToggleGroup>
//         </div>

//         {/* Card View */}
//         {renderCardView && currentMode === "cards" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
//             {displayedData.map(renderCardView)}
//           </div>
//         )}

//         {/* Table View */}
//         {currentMode === "list" && (
//           <div className="flex flex-col gap-5 lg:gap-7.5">
//             <DataGrid
//               table={table}
//               recordCount={
//                 serverSidePagination
//                   ? totalCount || 0
//                   : filteredData.length || 0
//               }
//               tableLayout={{
//                 columnsPinnable: true,
//                 columnsMovable: true,
//                 columnsVisibility: true,
//                 cellBorder: true,
//               }}
//             >
//               <Card>
//                 <CardHeader className="flex-col sm:flex-row items-stretch sm:items-center py-5 gap-2.5 justify-between">
//                   <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
//                     {/* Search */}
//                     <div className="relative">
//                       <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
//                       <Input
//                         placeholder="Search..."
//                         value={currentSearchValue}
//                         onChange={(e) => handleSearchChange(e.target.value)}
//                         className="ps-9 w-full"
//                       />
//                       {currentSearchValue && (
//                         <Button
//                           mode="icon"
//                           variant="ghost"
//                           className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
//                           onClick={() => handleSearchChange("")}
//                         >
//                           <X />
//                         </Button>
//                       )}
//                     </div>

//                     {/* Dropdown Filter */}
//                     {filterDropdownProps && (
//                       <Select
//                         value={filterDropdownProps.value}
//                         onValueChange={filterDropdownProps.onChange}
//                       >
//                         <SelectTrigger className="w-full sm:w-36">
//                           <SelectValue
//                             placeholder={filterDropdownProps.placeholder}
//                           />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {filterDropdownProps.options.map((opt) => (
//                             <SelectItem key={opt.id} value={opt.id}>
//                               {opt.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   </div>

//                   <CardToolbar>
//                     {deletePermissionIds.length > 0 && (
//                       <Button
//                         variant="destructive"
//                         onClick={() => setGroupDeleteDialogOpen(true)}
//                       >
//                         Delete {deletePermissionIds.length} permissions
//                       </Button>
//                     )}
//                     {createBtn && (
//                       <div className="flex items-center justify-end">
//                         {createBtn}
//                       </div>
//                     )}
//                   </CardToolbar>
//                 </CardHeader>

//                 {customCardHeader && (
//                   <CardHeader>{customCardHeader}</CardHeader>
//                 )}

//                 <CardTable>
//                   <ScrollArea>
//                     <DataGridTable />
//                     <ScrollBar orientation="horizontal" />
//                   </ScrollArea>
//                 </CardTable>

//                 {!disableFooter && (
//                   <CardFooter>
//                     <DataGridPagination
//                       paginationLinks={paginationLinks}
//                       totalCount={
//                         serverSidePagination ? totalCount : filteredData.length
//                       }
//                     />
//                   </CardFooter>
//                 )}
//               </Card>
//             </DataGrid>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// };

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
import { LayoutGrid, List, Search, X } from "lucide-react";
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
}) => {
  const [currentMode, setCurrentMode] = useState("list");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "id", desc: true }]);
  const [rowSelection, setRowSelection] = useState({});
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");
  const [deletePermissionIds, setDeletePermissionIds] = useState([]);
  const [groupDeleteDialogOpen, setGroupDeleteDialogOpen] = useState(false);

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

  const filteredData = useMemo(() => {
    if (serverSidePagination || !searchQuery) return data;
    const filterFunc = filterFunction || defaultFilterFunction;
    return filterFunc(data, searchQuery);
  }, [data, searchQuery, filterFunction, serverSidePagination]);

  const table = useReactTable({
    columns,
    data: serverSidePagination ? data : filteredData,
    getRowId: (row) => String(row.id),
    state: {
      pagination: actualPagination,
      sorting,
      rowSelection,
    },
    onPaginationChange: serverSidePagination
      ? onPaginationChange
      : setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(serverSidePagination
      ? {
          manualPagination: true,
          pageCount,
        }
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
            {displayedData.map(renderCardView)}
          </div>
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
                        <Select
                          value={filterDropdownProps.value}
                          onValueChange={filterDropdownProps.onChange}
                        >
                          <SelectTrigger className="w-full sm:w-36">
                            <SelectValue
                              placeholder={filterDropdownProps.placeholder}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {filterDropdownProps.options.map((opt) => (
                              <SelectItem key={opt.id} value={opt.id}>
                                {opt.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )}

                  <CardToolbar>
                    {deletePermissionIds.length > 0 && (
                      <Button
                        variant="destructive"
                        onClick={() => setGroupDeleteDialogOpen(true)}
                      >
                        Delete {deletePermissionIds.length} permissions
                      </Button>
                    )}
                    {createBtn && (
                      <div className="flex items-center justify-end">
                        {createBtn}
                      </div>
                    )}
                  </CardToolbar>
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
