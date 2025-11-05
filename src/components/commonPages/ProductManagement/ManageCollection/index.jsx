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

  const handleCreate = () => {
    setEditData(null);
    setDialogOpen(true);
  };

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
      {/* Collection List */}
      <ListWithCardToggle
        title="Collection List"
        description="Manage and view all collections"
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
    </div>
  );
};

export default ManageCollection;
