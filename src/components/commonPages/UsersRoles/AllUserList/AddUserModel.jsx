// "use client";

// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import { RiErrorWarningFill } from "@remixicon/react";

// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/common/ui/form";
// import { Input } from "@/components/common/ui/input";
// import { Alert, AlertIcon, AlertTitle } from "@/components/common/ui/alert";
// import BaseEditModal from "@/components/common/ui/BaseEditModal";
// import { useCrudApi } from "@/hooks/useCrudApi";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/common/ui/select";

// const UserSchema = z.object({
//   name: z.string().min(1, "User name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   role: z.string().min(1, "Role is required"),
//   department: z.string().min(1, "Department is required"),
// });

// const AddUserModal = ({ open, onClose, onSuccess, editData }) => {

//   const form = useForm({
//     resolver: zodResolver(UserSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       role: "",
//       department: "",
//     },
//   });

//   useEffect(() => {
//     if (editData) {
//       form.reset({
//         name: editData.name || "",
//         email: editData.email || "",
//         password: editData.password || "",
//         role: editData.role || "",
//         department: editData.department || "",
//       });
//     } else {
//       form.reset({
//         name: "",
//         email: "",
//         password: "",
//         role: "",
//         department: "",
//       });
//     }
//   }, [editData, form]);

//   const handleSubmit = async (values) => {
//     try {
//       const payload = { ...values, id: editData?.id };
//       await create(payload);

//       toast.success(
//         editData ? "User updated successfully" : "User added successfully"
//       );

//       if (onSuccess) await onSuccess();
//       onClose();
//     } catch (err) {
//       toast.custom(
//         () => (
//           <Alert variant="mono" icon="destructive" close={false}>
//             <AlertIcon>
//               <RiErrorWarningFill />
//             </AlertIcon>
//             <AlertTitle>{err?.message || "Something went wrong"}</AlertTitle>
//           </Alert>
//         ),
//         { position: "top-center" }
//       );
//     }
//   };

//   return (
//     <BaseEditModal
//       open={open}
//       onOpenChange={(val) => !val && onClose()}
//       title={`${editData ? "Edit" : "Add"} User`}
//       form={form}
//       onSubmit={handleSubmit}
//       //   loading={loading}
//       scrollContent={
//         <>
//           {/* Name */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>User Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter user name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Email */}
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter email address" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Password */}
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Enter password"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex flex-wrap gap-4">
//             {/* Role */}
//             <FormField
//               control={form.control}
//               name="role"
//               render={({ field }) => (
//                 <FormItem className="flex-1 min-w-[200px]">
//                   <FormLabel>Role</FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <SelectTrigger className="w-full px-2 py-1 border rounded">
//                         <SelectValue placeholder="Select role" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="admin">Admin</SelectItem>
//                           <SelectItem value="editor">Editor</SelectItem>
//                           <SelectItem value="viewer">Viewer</SelectItem>
//                           <SelectItem value="manager">Manager</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Department */}
//             <FormField
//               control={form.control}
//               name="department"
//               render={({ field }) => (
//                 <FormItem className="flex-1 min-w-[200px]">
//                   <FormLabel>Department</FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <SelectTrigger className="w-full px-2 py-1 border rounded">
//                         <SelectValue placeholder="Select department" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="sales">Sales</SelectItem>
//                           <SelectItem value="marketing">Marketing</SelectItem>
//                           <SelectItem value="hr">Human Resources</SelectItem>
//                           <SelectItem value="it">IT</SelectItem>
//                           <SelectItem value="finance">Finance</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </>
//       }
//     />
//   );
// };

// export default AddUserModal;

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
import { useCrudApi } from "@/hooks/useCrudApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";

import { handleGET } from "@/lib/apiHandler"; // ✅ add this import

// Validation schema
const UserSchema = z.object({
  name: z.string().min(1, "User name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
});

const AddUserModal = ({ open, onClose, onSuccess, editData }) => {
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      department: "",
    },
  });

  const { create } = useCrudApi("/api/store-admin/user"); // ✅ assume you use this for submission

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  // ✅ Fetch roles from API when modal opens
  useEffect(() => {
    if (open) {
      fetchRoles();
    }
  }, [open]);

  const fetchRoles = async () => {
    try {
      setLoadingRoles(true);
      const token = localStorage.getItem("token"); // adjust if your auth is different

      const headers = {
        Authorization: `Bearer ${token}`,
        "x-tenant-id": 5,
        Accept: "application/json",
      };

      const res = await handleGET("/api/user-roles", headers);

      if (res?.data) {
        setRoles(res.data);
      } else {
        console.error("Invalid response:", res);
      }
    } catch (err) {
      console.error("Failed to fetch roles:", err);
      toast.error("Failed to load roles");
    } finally {
      setLoadingRoles(false);
    }
  };

  // Reset form when editing or adding
  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData.name || "",
        email: editData.email || "",
        password: editData.password || "",
        role: editData.role || "",
        department: editData.department || "",
      });
    } else {
      form.reset({
        name: "",
        email: "",
        password: "",
        role: "",
        department: "",
      });
    }
  }, [editData, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = { ...values, id: editData?.id };
      await create(payload);

      toast.success(
        editData ? "User updated successfully" : "User added successfully"
      );

      if (onSuccess) await onSuccess();
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

  return (
    <BaseEditModal
      open={open}
      onOpenChange={(val) => !val && onClose()}
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

          {/* Role + Department side by side */}
          <div className="flex flex-wrap gap-4">
            {/* Role Dropdown (Dynamic) */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[200px]">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full px-2 py-1 border rounded">
                        <SelectValue
                          placeholder={
                            loadingRoles
                              ? "Loading..."
                              : roles.length
                              ? "Select role"
                              : "No roles available"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {roles.map((role) => (
                            <SelectItem
                              key={role.id}
                              value={role.name.toLowerCase()}
                            >
                              {role.name}
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

            {/* Department Dropdown */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[200px]">
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full px-2 py-1 border rounded">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      }
    />
  );
};

export default AddUserModal;
