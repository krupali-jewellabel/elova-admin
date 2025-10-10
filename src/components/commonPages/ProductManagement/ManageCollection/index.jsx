"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/ui/button";
import { Plus, Settings } from "lucide-react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import ManageCollectionModel from "./ManageCollectionModel";
import ConfirmDialog from "@/components/common/ui/ConfirmDialog";
import { useManageCollectionColumns } from "../hooks/useManageCollectionColumns";
import { useCrudList } from "@/hooks/useCrudList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";

const ManageCollection = () => {
  const {
    list,
    editData,
    setEditData,
    setDeleteId,
    dialogOpen,
    setDialogOpen,
    confirmOpen,
    setConfirmOpen,
    fetchData,
    handleDelete,
  } = useCrudList("/api/product-management/manage-collection");

  const [filters, setFilters] = useState({
    collection: "all",
    status: "show-all",
    visibility: "show-all",
  });

  const columns = useManageCollectionColumns({
    setEditingCell: (item) => {
      setEditData(item);
      setDialogOpen(true);
    },
    onDelete: (id) => {
      setDeleteId(id);
      setConfirmOpen(true);
    },
  });

  // Function to open modal for creating a new collection
  const handleCreate = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  // Function to reload data with filters and pagination
  const handleFetchData = (page) => {
    const pageIndex = page?.pageIndex ?? 0;
    const pageSize = page?.pageSize ?? 10;

    fetchData({
      pageIndex,
      pageSize,
      filters,
    });
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[700px]">
          {/* Collection Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="collection" className="text-sm font-medium w-24">
              Collection:
            </label>
            <Select defaultValue="all" id="collection">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="collection1">Collection 1</SelectItem>
                <SelectItem value="collection2">Collection 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="status" className="text-sm font-medium w-24">
              Status:
            </label>
            <Select defaultValue="show-all" id="status">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="show-all">Show all</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Visibility Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="visibility" className="text-sm font-medium w-24">
              Visibility:
            </label>
            <Select defaultValue="show-all" id="visibility">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="show-all">Show all</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Button variant="primary">Bulk Action</Button>
          <Settings className="h-5 w-5" />
          <Button variant="outline" onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" /> Create Collection
          </Button>
        </div>
      </div>

      {/* Collection List */}
      <ListWithCardToggle
        data={list}
        columns={columns}
        serverSidePagination
        pagination={{ pageIndex: 0, pageSize: 10 }}
        onPaginationChange={handleFetchData}
      />

      {/* Create / Edit Modal */}
      <ManageCollectionModel
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditData(null);
        }}
        onSuccess={handleFetchData}
        editData={editData}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Collection"
        message="Are you sure you want to delete this collection? This action cannot be undone."
      />
    </div>
  );
};

export default ManageCollection;
