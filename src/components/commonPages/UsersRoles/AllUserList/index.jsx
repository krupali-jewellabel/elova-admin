"use client";

import React, { useState } from "react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { Button } from "@/components/common/ui/button";
import { Plus } from "lucide-react";
import { useUsersList } from "./hooks/useUsersList";
import { USER_DATA } from "../constant";
import AddUserModal from "./AddUserModel";

const AllUserList = () => {
  const [editData, setEditData] = useState(null);
  const { columns, dialogOpen, setDialogOpen } = useUsersList({
    onEdit: (user) => {
      setEditData(user);
      setDialogOpen(true);
    },
  });

  const handleClose = () => {
    setDialogOpen(false);
    setEditData(null);
  };

  return (
    <div className="space-y-4">
      <ListWithCardToggle
        title="All Users List"
        data={USER_DATA}
        columns={columns}
        createBtn={
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        }
      />

      <AddUserModal
        open={dialogOpen}
        onClose={handleClose}
        onSuccess={() => console.log("User saved")}
        editData={editData}
      />
    </div>
  );
};

export default AllUserList;
