"use client";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/common/ui/select";
import { Button } from "@/components/common/ui/button";
import { Plus, Settings } from "lucide-react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { MANAGE_COLLECTION_DATA } from "../constant";
import { useManageCollectionColumns } from "../hooks/useManageCollectionColumns";
import ManageCollectionModel from "./ManageCollectionModel";

const ManageCollection = () => {
  const [pageInfo, setPageInfo] = useState({ pageIndex: 0, pageSize: 10 });
  const [pagination, setPagination] = useState({ totalPages: 5, total: 50 });

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ Pass modal controls into columns hook
  const columns = useManageCollectionColumns({
    setEditingCell: (row) => {
      setEditData(row);
      setOpenModal(true);
    },
  });

  const handleCreate = () => {
    setEditData(null);
    setOpenModal(true);
  };

  const handleSuccess = () => {
    console.log("Collection list refreshed");
  };

  return (
    <>
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

      <ListWithCardToggle
        data={MANAGE_COLLECTION_DATA}
        columns={columns}
        pagination={pageInfo}
        onPaginationChange={setPageInfo}
        pageCount={pagination?.totalPages}
        totalCount={pagination?.total}
        serverSidePagination
      />

      <ManageCollectionModel
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
        editData={editData}
      />
    </>
  );
};

export default ManageCollection;
