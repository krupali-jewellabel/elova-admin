// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/common/ui/form";
// import { Input } from "@/components/common/ui/input";
// import { toast } from "sonner";
// import { RiErrorWarningFill } from "@remixicon/react";
// import { Alert, AlertIcon, AlertTitle } from "@/components/common/ui/alert";
// import { useCrudApi } from "@/hooks/useCrudApi";
// import BaseEditModal from "@/components/common/ui/BaseEditModal";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/common/ui/popover";
// import { Button } from "@/components/common/ui/button";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { CalendarDays } from "lucide-react";
// import { Calendar } from "@/components/common/ui/calendar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/common/ui/select";
// import { CouponSchema } from "./OnCouponSchema";

// const CouponAddDialog = ({ open, onClose, onSuccess, editData }) => {
//   const [loading, setLoading] = useState(false);
//   const { create, update } = useCrudApi("/api/coupon-management");

//   const form = useForm({
//     resolver: zodResolver(CouponSchema),
//     defaultValues: {
//       code: "",
//       type: "",
//       discount: "",
//       minOrderAmount: "",
//       maxDiscountAmount: "",
//       startDate: null,
//       endDate: null,
//       usageLimit: "",
//     },
//   });

//   //   useEffect(() => {
//   //     form.reset(editData ? { name: editData.name } : { name: "" });
//   //   }, [editData, form]); // ✅ fix dependency

//   // useEffect(() => {
//   //   const fetchCoupons = async () => {
//   //     try {
//   //       const res = await fetch("/api/coupon-management");
//   //       if (!res.ok) throw new Error("Failed to fetch coupons");
//   //       const data = await res.json();
//   //       console.log("Coupons:", data);
//   //       // setCoupons(data) if you keep state
//   //     } catch (err) {
//   //       toast.error(err.message);
//   //     }
//   //   };

//   //   fetchCoupons();
//   // }, []);

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const payload = {
//         code: String(values.code),
//         type: values.type,
//         discount_value: Number(values.discount),
//         min_order_amount: Number(values.minOrderAmount),
//         max_discount_amount: Number(values.maxDiscountAmount),
//         start_date: values.startDate,
//         end_date: values.endDate,
//         usage_limit: parseInt(values.usageLimit, 10),
//         usage_limit_per_user: parseInt(values.usageLimit, 10), // 👈 added this
//       };

//       if (editData) {
//         await update(editData.id, payload);
//         toast.success("Coupon Updated");
//       } else {
//         await create(payload);
//         toast.success("Coupon Created");
//       }
//       onClose();
//       if (onSuccess) onSuccess();
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
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <BaseEditModal
//       open={open}
//       onOpenChange={(val) => !val && onClose()}
//       title={`${editData ? "Edit" : "Add"} Coupons`}
//       form={form}
//       onSubmit={handleSubmit}
//       loading={loading}
//       scrollContent={
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <>
//               <div>
//                 <FormField
//                   control={form.control}
//                   name="code"
//                   render={({ field }) => (
//                     <FormItem className="mb-4">
//                       <FormLabel>Code</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter Code" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div>
//                 <FormField
//                   control={form.control}
//                   name="type"
//                   render={({ field }) => (
//                     <FormItem className="mb-4">
//                       <FormLabel>Type</FormLabel>
//                       <FormControl>
//                         <Select
//                           value={field.value}
//                           onValueChange={field.onChange}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select type" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="fixed">Fixed</SelectItem>
//                             <SelectItem value="percentage">
//                               Percentage
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div>
//                 <FormField
//                   control={form.control}
//                   name="discount"
//                   render={({ field }) => (
//                     <FormItem className="mb-4">
//                       <FormLabel>Discount</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="Enter discount"
//                           value={field.value ?? ""}
//                           onChange={(e) => field.onChange(e.target.value)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div>
//                 <FormField
//                   control={form.control}
//                   name="minOrderAmount"
//                   render={({ field }) => (
//                     <FormItem className="mb-4">
//                       <FormLabel>Minimum Order Amount</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="Enter minimum order amount"
//                           value={field.value ?? ""}
//                           onChange={(e) => field.onChange(e.target.value)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div>
//                 <FormField
//                   control={form.control}
//                   name="maxDiscountAmount"
//                   render={({ field }) => (
//                     <FormItem className="mb-4">
//                       <FormLabel>Maximum Discount Amount</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="Enter max discount amount"
//                           value={field.value ?? ""}
//                           onChange={(e) => field.onChange(e.target.value)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Validation Dates */}
//               <div className="mt-4">
//                 <FormLabel>Validity Coupons</FormLabel>

//                 {/* Start Date */}
//                 <FormField
//                   control={form.control}
//                   name="startDate"
//                   render={({ field }) => (
//                     <FormItem className="mb-4">
//                       <FormLabel>Start Date</FormLabel>
//                       <FormControl>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button
//                               mode="input"
//                               variant="outline"
//                               className={cn(
//                                 "w-full data-[state=open]:border-primary",
//                                 !field.value && "text-muted-foreground"
//                               )}
//                             >
//                               <CalendarDays className="-ms-0.5 mr-2" />
//                               {field.value ? (
//                                 format(new Date(field.value), "LLL dd, y")
//                               ) : (
//                                 <span>Pick a start date</span>
//                               )}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             {/* <Calendar
//                               initialFocus
//                               mode="single"
//                               selected={
//                                 field.value ? new Date(field.value) : undefined
//                               }
//                               onSelect={(val) =>
//                                 field.onChange(val?.toISOString() ?? null)
//                               }
//                             /> */}
//                             <Calendar
//                               initialFocus
//                               mode="single"
//                               selected={
//                                 field.value ? new Date(field.value) : undefined
//                               }
//                               onSelect={(val) =>
//                                 field.onChange(
//                                   val ? format(val, "yyyy-MM-dd") : null
//                                 )
//                               }
//                             />
//                           </PopoverContent>
//                         </Popover>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* End Date */}
//                 <FormField
//                   control={form.control}
//                   name="endDate"
//                   render={({ field }) => (
//                     <FormItem className="mb-4">
//                       <FormLabel>End Date</FormLabel>
//                       <FormControl>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button
//                               mode="input"
//                               variant="outline"
//                               className={cn(
//                                 "w-full data-[state=open]:border-primary",
//                                 !field.value && "text-muted-foreground"
//                               )}
//                             >
//                               <CalendarDays className="-ms-0.5 mr-2" />
//                               {field.value ? (
//                                 format(new Date(field.value), "LLL dd, y")
//                               ) : (
//                                 <span>Pick an end date</span>
//                               )}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             {/* <Calendar
//                               initialFocus
//                               mode="single"
//                               selected={
//                                 field.value ? new Date(field.value) : undefined
//                               }
//                               onSelect={(val) =>
//                                 field.onChange(val?.toISOString() ?? null)
//                               }
//                             /> */}
//                             <Calendar
//                               initialFocus
//                               mode="single"
//                               selected={
//                                 field.value ? new Date(field.value) : undefined
//                               }
//                               onSelect={(val) =>
//                                 field.onChange(
//                                   val ? format(val, "yyyy-MM-dd") : null
//                                 )
//                               }
//                             />
//                           </PopoverContent>
//                         </Popover>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div>
//                 <FormField
//                   control={form.control}
//                   name="usageLimit"
//                   render={({ field }) => (
//                     <FormItem className="mb-4">
//                       <FormLabel>Usage Limit</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="Enter usage limit"
//                           value={field.value ?? ""}
//                           onChange={(e) => field.onChange(e.target.value)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </>
//           )}
//         />
//       }
//     />
//   );
// };

// export default CouponAddDialog;

// "use client";

// import React, { use, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/common/ui/form";
// import { Input } from "@/components/common/ui/input";
// import { toast } from "sonner";
// import { RiErrorWarningFill } from "@remixicon/react";
// import { Alert, AlertIcon, AlertTitle } from "@/components/common/ui/alert";
// import { useCrudApi } from "@/hooks/useCrudApi";
// import BaseEditModal from "@/components/common/ui/BaseEditModal";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/common/ui/popover";
// import { Button } from "@/components/common/ui/button";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { CalendarDays } from "lucide-react";
// import { Calendar } from "@/components/common/ui/calendar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/common/ui/select";
// import { CouponSchema } from "./OnCouponSchema";

// const CouponAddDialog = ({ open, onClose, onSuccess, editData }) => {
//   const [loading, setLoading] = useState(false);
//   const { create, update } = useCrudApi("/api/coupon-management");

//   const form = useForm({
//     resolver: zodResolver(CouponSchema),
//     defaultValues: {
//       code: editData?.code || "",
//       type: editData?.type || "",
//       discount: editData?.discount || "",
//       minOrderAmount: editData?.minOrderAmount || "",
//       maxDiscountAmount: editData?.maxDiscountAmount || "",
//       startDate: editData?.startDate || null,
//       endDate: editData?.endDate || null,
//       usageLimit: editData?.usageLimit || "",
//     },
//   });

//   useEffect(() => {
//     form.reset(editData ? { name: editData.name } : { name: "" });
//   }, [editData, form]);

//   // const handleSubmit = async (values) => {
//   //   setLoading(true);
//   //   try {
//   //     const payload = {
//   //       code: String(values.code),
//   //       type: values.type,
//   //       discount_value: Number(values.discount),
//   //       min_order_amount: Number(values.minOrderAmount),
//   //       max_discount_amount: Number(values.maxDiscountAmount),
//   //       start_date: values.startDate,
//   //       end_date: values.endDate,
//   //       usage_limit: parseInt(values.usageLimit, 10),
//   //       usage_limit_per_user: parseInt(values.usageLimit, 10),
//   //     };

//   //     if (editData) {
//   //       await update(editData.id, payload);
//   //       toast.success("Coupon Updated");
//   //     } else {
//   //       await create(payload);
//   //       toast.success("Coupon Created");
//   //     }

//   //     onClose();
//   //     if (onSuccess) onSuccess();
//   //   } catch (err) {
//   //     toast.custom(
//   //       () => (
//   //         <Alert variant="mono" icon="destructive" close={false}>
//   //           <AlertIcon>
//   //             <RiErrorWarningFill />
//   //           </AlertIcon>
//   //           <AlertTitle>{err?.message || "Something went wrong"}</AlertTitle>
//   //         </Alert>
//   //       ),
//   //       { position: "top-center" }
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const payload = {
//         code: String(values.code),
//         type: values.type,
//         discount_value: Number(values.discount),
//         min_order_amount: Number(values.minOrderAmount),
//         max_discount_amount: Number(values.maxDiscountAmount),
//         start_date: values.startDate,
//         end_date: values.endDate,
//         usage_limit: parseInt(values.usageLimit, 10),
//         usage_limit_per_user: parseInt(values.usageLimit, 10),
//       };

//       if (editData) {
//         await update(editData.id, payload);
//         toast.success("Coupon Updated");
//       } else {
//         await create(payload);
//         toast.success("Coupon Created");
//       }

//       if (onSuccess) await onSuccess(); // ✅ refresh coupons
//       onClose(); // ✅ then close
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
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <BaseEditModal
//       open={open}
//       onOpenChange={(val) => !val && onClose()}
//       title={`${editData ? "Edit" : "Add"} Coupons`}
//       form={form}
//       onSubmit={handleSubmit}
//       loading={loading}
//       scrollContent={
//         <>
//           {/* Code */}
//           <FormField
//             control={form.control}
//             name="code"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Code</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter Code" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Type */}
//           <FormField
//             control={form.control}
//             name="type"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Type</FormLabel>
//                 <FormControl>
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="fixed">Fixed</SelectItem>
//                       <SelectItem value="percentage">Percentage</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Discount */}
//           <FormField
//             control={form.control}
//             name="discount"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Discount</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="Enter discount"
//                     value={field.value ?? ""}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Minimum Order Amount */}
//           <FormField
//             control={form.control}
//             name="minOrderAmount"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Minimum Order Amount</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="Enter minimum order amount"
//                     value={field.value ?? ""}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Maximum Discount Amount */}
//           <FormField
//             control={form.control}
//             name="maxDiscountAmount"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Maximum Discount Amount</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="Enter max discount amount"
//                     value={field.value ?? ""}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Start Date */}
//           <FormField
//             control={form.control}
//             name="startDate"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Start Date</FormLabel>
//                 <FormControl>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         mode="input"
//                         variant="outline"
//                         className={cn(
//                           "w-full data-[state=open]:border-primary",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarDays className="-ms-0.5 mr-2" />
//                         {field.value ? (
//                           format(new Date(field.value), "LLL dd, y")
//                         ) : (
//                           <span>Pick a start date</span>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         initialFocus
//                         mode="single"
//                         selected={
//                           field.value ? new Date(field.value) : undefined
//                         }
//                         onSelect={(val) =>
//                           field.onChange(val ? format(val, "yyyy-MM-dd") : null)
//                         }
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* End Date */}
//           <FormField
//             control={form.control}
//             name="endDate"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>End Date</FormLabel>
//                 <FormControl>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         mode="input"
//                         variant="outline"
//                         className={cn(
//                           "w-full data-[state=open]:border-primary",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarDays className="-ms-0.5 mr-2" />
//                         {field.value ? (
//                           format(new Date(field.value), "LLL dd, y")
//                         ) : (
//                           <span>Pick an end date</span>
//                         )}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         initialFocus
//                         mode="single"
//                         selected={
//                           field.value ? new Date(field.value) : undefined
//                         }
//                         onSelect={(val) =>
//                           field.onChange(val ? format(val, "yyyy-MM-dd") : null)
//                         }
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Usage Limit */}
//           <FormField
//             control={form.control}
//             name="usageLimit"
//             render={({ field }) => (
//               <FormItem className="mb-4">
//                 <FormLabel>Usage Limit</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="Enter usage limit"
//                     value={field.value ?? ""}
//                     onChange={(e) => field.onChange(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </>
//       }
//     />
//   );
// };

// export default CouponAddDialog;

"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";
import { toast } from "sonner";
import { RiErrorWarningFill } from "@remixicon/react";
import { Alert, AlertIcon, AlertTitle } from "@/components/common/ui/alert";
import { useCrudApi } from "@/hooks/useCrudApi";
import BaseEditModal from "@/components/common/ui/BaseEditModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/ui/popover";
import { Button } from "@/components/common/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/common/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { CouponSchema } from "./OnCouponSchema";

const CouponAddDialog = ({ open, onClose, onSuccess, editData }) => {
  const [loading, setLoading] = useState(false);
  const { create, update } = useCrudApi("/api/coupon-management");

  const form = useForm({
    resolver: zodResolver(CouponSchema),
    defaultValues: {
      code: "",
      type: "",
      discount: "",
      minOrderAmount: "",
      maxDiscountAmount: "",
      startDate: null,
      endDate: null,
      usageLimit: "",
    },
  });

  // 🔹 Reset form values when editData changes
  useEffect(() => {
    if (editData) {
      form.reset({
        code: editData.code || "",
        type: editData.type || "",
        discount: editData.discount ?? editData.discount_value ?? "",
        minOrderAmount:
          editData.minOrderAmount ?? editData.min_order_amount ?? "",
        maxDiscountAmount:
          editData.maxDiscountAmount ?? editData.max_discount_amount ?? "",
        startDate: editData.startDate ?? editData.start_date ?? null,
        endDate: editData.endDate ?? editData.end_date ?? null,
        usageLimit: editData.usageLimit ?? editData.usage_limit ?? "",
      });
    } else {
      form.reset({
        code: "",
        type: "",
        discount: "",
        minOrderAmount: "",
        maxDiscountAmount: "",
        startDate: null,
        endDate: null,
        usageLimit: "",
      });
    }
  }, [editData, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        code: String(values.code),
        type: values.type,
        discount_value: Number(values.discount),
        min_order_amount: Number(values.minOrderAmount),
        max_discount_amount: Number(values.maxDiscountAmount),
        start_date: values.startDate,
        end_date: values.endDate,
        usage_limit: parseInt(values.usageLimit, 10),
        usage_limit_per_user: parseInt(values.usageLimit, 10),
      };

      if (editData) {
        await update(editData.id, payload);
        toast.success("Coupon Updated");
      } else {
        await create(payload);
        toast.success("Coupon Created");
      }

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseEditModal
      open={open}
      onOpenChange={(val) => !val && onClose()}
      title={`${editData ? "Edit" : "Add"} Coupons`}
      form={form}
      onSubmit={handleSubmit}
      loading={loading}
      scrollContent={
        <>
          {/* Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter discount"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Minimum Order Amount */}
          <FormField
            control={form.control}
            name="minOrderAmount"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Minimum Order Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter minimum order amount"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Maximum Discount Amount */}
          <FormField
            control={form.control}
            name="maxDiscountAmount"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Maximum Discount Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter max discount amount"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        mode="input"
                        variant="outline"
                        className={cn(
                          "w-full data-[state=open]:border-primary",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarDays className="-ms-0.5 mr-2" />
                        {field.value ? (
                          format(new Date(field.value), "LLL dd, y")
                        ) : (
                          <span>Pick a start date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(val) =>
                          field.onChange(val ? format(val, "yyyy-MM-dd") : null)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        mode="input"
                        variant="outline"
                        className={cn(
                          "w-full data-[state=open]:border-primary",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarDays className="-ms-0.5 mr-2" />
                        {field.value ? (
                          format(new Date(field.value), "LLL dd, y")
                        ) : (
                          <span>Pick an end date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(val) =>
                          field.onChange(val ? format(val, "yyyy-MM-dd") : null)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Usage Limit */}
          <FormField
            control={form.control}
            name="usageLimit"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Usage Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter usage limit"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
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

export default CouponAddDialog;
