"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { RiErrorWarningFill } from "@remixicon/react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";
import { Alert, AlertIcon, AlertTitle } from "@/components/common/ui/alert";
import BaseEditModal from "@/components/common/ui/BaseEditModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { fetchGET } from "@/lib/apiHandler";
import { useCrudApi } from "@/hooks/useCrudApi";
import { Switch } from "@/components/common/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/common/ui/radio-group";
import { Label } from "@/components/common/ui/label";

// Validation Schema
const UserSchema = z.object({
  name: z.string().min(1, "User name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
});

const AddUserModal = ({ open, onClose, onSuccess, editData }) => {
  console.log("editData", editData);
  const { create } = useCrudApi("/api/user-management");

  // Use fetchAll for roles
  const { fetchAll: fetchRolesAPI } = useCrudApi("/api/roles");

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  const UserSchema = z.object({
    name: z.string().min(1, "User name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().min(1, "Role is required"),
    department: z.string().min(1, "Department is required"),

    designation: z.string().min(1, "Designation is required"),

    is_manager: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      department: "",
      designation: "",
      is_manager: undefined,
    },
  });

  //  Fetch roles when modal opens
  useEffect(() => {
    if (open) loadRoles();
  }, [open]);

  const loadRoles = async () => {
    try {
      setLoadingRoles(true);

      // fetchAll automatically sends headers & token
      const res = await fetchRolesAPI();

      if (res?.data) {
        setRoles(res.data);
      } else {
        toast.error("Failed to load roles");
      }
    } catch (err) {
      toast.error("Failed to load roles");
    } finally {
      setLoadingRoles(false);
    }
  };

  // Reset form for edit/add
  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData?.name || "",
        email: editData?.email || "",
        password: "",
        role: editData?.roles?.[0]?.id ? String(editData.roles[0].id) : "",
        department: editData?.department?.id
          ? String(editData.department.id)
          : "",
        designation: editData?.designation || "",
        is_manager: editData?.is_manager ?? undefined,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        password: "",
        role: "",
        department: "",
        designation: "",
        is_manager: undefined,
      });
    }
  }, [editData, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        designation: values.designation || "",
        role_id: Number(values.role),
        department_id: Number(values.department),
        is_manager: values.is_manager === true ? 1 : 0,
      };

      const res = await create(payload);

      if (!res?.status) {
        toast.error(res?.error || res?.message || "Something went wrong");
        return;
      }

      toast.success(editData ? "User updated" : "User added");

      // ✅ Pass the created/updated user back to parent
      onSuccess?.(res.data);

      onClose();
    } catch (err) {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive" close={false}>
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{err?.message || "Something went wrong"}</AlertTitle>
          </Alert>
        ),
        { position: "top-center" }
      );
    }
  };

  const fetchDepartments = async () => {
    try {
      setLoadingDepartments(true);

      const token = localStorage.getItem("authTokenStoreAdmin");

      const headers = {
        Authorization: `Bearer ${token}`,
        "x-tenant-id": 5,
        Accept: "application/json",
      };

      const res = await fetchGET("/api/departments", headers);

      console.log("DEPARTMENT API RESPONSE:", res);

      //  Correct array path: res.data.data
      const list = res?.data?.data || [];

      if (!Array.isArray(list)) {
        console.log(" Not an array:", list);
        setDepartments([]);
      } else {
        console.log("Final Department List:", list);
        setDepartments(list);
      }
    } catch (err) {
      console.error("Department fetch error:", err);
      toast.error("Failed to load departments");
      setDepartments([]);
    } finally {
      setLoadingDepartments(false);
    }
  };
  // Fetch departments when modal opens
  useEffect(() => {
    if (open) fetchDepartments();
  }, [open]);

  return (
    <BaseEditModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={`${editData ? "Edit" : "Add"} User`}
      form={form}
      onSubmit={handleSubmit}
      scrollContent={
        <>
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          {!editData && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Role + Department */}
          <div className="flex flex-wrap gap-4">
            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[200px]">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full px-2 py-1 border rounded">
                        <SelectValue
                          placeholder={
                            loadingRoles
                              ? "Loading..."
                              : roles.length
                              ? "Select Role"
                              : "No roles found"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {roles.map((r) => (
                            <SelectItem key={r.id} value={String(r.id)}>
                              {r.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[200px]">
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full px-2 py-1 border rounded">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Array.isArray(departments) &&
                          departments.length > 0 ? (
                            departments.map((dept) => (
                              <SelectItem key={dept.id} value={String(dept.id)}>
                                {dept.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled>
                              No departments found
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Designation */}
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem className="mb-4 mt-4">
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter designation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_manager"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-[200px]">
                <FormLabel>Manager</FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={
                      field.value === 1
                        ? "true"
                        : field.value === 0
                        ? "false"
                        : undefined
                    }
                    className="flex items-center space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="manager-yes" />
                      <Label htmlFor="manager-yes">Yes</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="manager-no" />
                      <Label htmlFor="manager-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </>
      }
    />
  );
};

export default AddUserModal;
