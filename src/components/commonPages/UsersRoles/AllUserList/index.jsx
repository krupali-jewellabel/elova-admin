"use client";
import React, { useState } from "react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { Button } from "@/components/common/ui/button";
import { Plus } from "lucide-react";
import AddUserModal from "./AddUsersModel";
import { useUsersList } from "./hooks/useUsersList";
import { useCrudList } from "@/hooks/useCrudList";
import PermissionDialog from "./PermissionDialog";
import ConfirmDialog from "@/components/common/ui/ConfirmDialog";

const AllUserList = () => {
  const {
    list,
    confirmOpen,
    setConfirmOpen,
    handleDelete,
    setDeleteId,
    setList,
  } = useCrudList("/api/user-management");

  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
  const [viewingRoleId, setViewingRoleId] = useState(null);

  const permissions = [
    {
      module: "Workspace Settings",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: "Billing Management",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: "Integration Setup",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: "Map Creation",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: "Data Export",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: "User Roles",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: "Security Settings",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: "Insights Access",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: "Merchant List",
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
  ];

  const [rolePermissions, setRolePermissions] = useState({});

  const updatePermission = (roleId, index, type, value) => {
    setRolePermissions((prev) => {
      const arr = [...prev[roleId]];
      arr[index].permissions[type] = value;
      return { ...prev, [roleId]: arr };
    });
  };

  const handleUserCreated = (newUser) => {
    setList((prev) => ({
      ...prev,
      data: [newUser, ...(prev?.data || [])],
    }));
  };

  const [editData, setEditData] = useState(null);
  const { columns, dialogOpen, setDialogOpen } = useUsersList({
    onEdit: (user) => {
      setEditData(user);
      setDialogOpen(true);
    },
    onViewPermission: (user) => {
      const roleId = user.role_id ?? user.roleId ?? user.role;

      setViewingRoleId(roleId);

      setRolePermissions((prev) => {
        if (!prev[roleId]) {
          return {
            ...prev,
            [roleId]: permissions.map((p) => ({
              module: p.module,
              permissions: {
                view: p.view,
                modify: p.modify,
                publish: p.publish,
                configure: p.configure,
              },
            })),
          };
        }
        return prev; // already exists
      });

      setPermissionDialogOpen(true);
    },
    onDelete: (id) => {
      debugger;
      setDeleteId(id);
      setConfirmOpen(true);
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
        data={list?.data}
        columns={columns}
        createBtn={
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        }
      />

      <PermissionDialog
        permissionDialogOpen={permissionDialogOpen}
        setPermissionDialogOpen={setPermissionDialogOpen}
        roles={permissions}
        viewingRoleId={viewingRoleId}
        rolePermissions={rolePermissions}
        setRolePermissions={setRolePermissions}
        updatePermission={updatePermission}
      />

      <AddUserModal
        open={dialogOpen}
        onClose={handleClose}
        onSuccess={handleUserCreated}
        editData={editData}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
};

export default AllUserList;
