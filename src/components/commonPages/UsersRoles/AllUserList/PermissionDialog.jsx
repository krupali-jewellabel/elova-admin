"use client";

import React from "react";
import { Button } from "@/components/common/ui/button";
import { Checkbox } from "@/components/common/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/common/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/table";

const permissions = [
  {
    module: "Workspace Settings",
    view: true,
    modify: true,
    publish: true,
    configure: true,
  },
  {
    module: "Billing Management",
    view: true,
    modify: false,
    publish: false,
    configure: false,
  },
  {
    module: "Integration Setup",
    view: true,
    modify: true,
    publish: false,
    configure: false,
  },
  {
    module: "Map Creation",
    view: true,
    modify: true,
    publish: true,
    configure: true,
  },
  {
    module: "Data Export",
    view: true,
    modify: false,
    publish: false,
    configure: false,
  },
  {
    module: "User Roles",
    view: true,
    modify: false,
    publish: false,
    configure: false,
  },
  {
    module: "Security Settings",
    view: true,
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
    view: true,
    modify: true,
    publish: false,
    configure: false,
  },
];

const PermissionDialog = ({
  permissionDialogOpen,
  setPermissionDialogOpen,
  roles,
  viewingRoleId,
  rolePermissions,
  updatePermission,
}) => {
  const currentPermissions = rolePermissions[viewingRoleId] || [];

  return (
    <Dialog open={permissionDialogOpen} onOpenChange={setPermissionDialogOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Role Permissions
            {/* {roles.find((r) => r.id === viewingRoleId)?.name || "Unknown Role"} */}
          </DialogTitle>
          <DialogDescription>
            Manage permissions assigned to this role.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="min-w-[250px]">Module</TableHead>
                <TableHead className="text-center">View</TableHead>
                <TableHead className="text-center">Modify</TableHead>
                <TableHead className="text-center">Publish</TableHead>
                <TableHead className="text-center">Configure</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentPermissions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.module}</TableCell>

                  {/* View */}
                  <TableCell className="text-center">
                    <Checkbox
                      checked={item.permissions.view}
                      onCheckedChange={(v) =>
                        updatePermission(viewingRoleId, index, "view", v)
                      }
                    />
                  </TableCell>

                  {/* Modify */}
                  <TableCell className="text-center">
                    <Checkbox
                      checked={item.permissions.modify}
                      onCheckedChange={(v) =>
                        updatePermission(viewingRoleId, index, "modify", v)
                      }
                    />
                  </TableCell>

                  {/* Publish */}
                  <TableCell className="text-center">
                    <Checkbox
                      checked={item.permissions.publish}
                      onCheckedChange={(v) =>
                        updatePermission(viewingRoleId, index, "publish", v)
                      }
                    />
                  </TableCell>

                  {/* Configure */}
                  <TableCell className="text-center">
                    <Checkbox
                      checked={item.permissions.configure}
                      onCheckedChange={(v) =>
                        updatePermission(viewingRoleId, index, "configure", v)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setPermissionDialogOpen(false)}
          >
            Close
          </Button>
          <Button onClick={() => console.log("Saved!")}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionDialog;
