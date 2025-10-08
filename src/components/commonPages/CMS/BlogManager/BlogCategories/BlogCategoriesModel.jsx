"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";
import { toast } from "sonner";
import { useCrudApi } from "@/hooks/useCrudApi";
import BaseEditModal from "@/components/common/ui/BaseEditModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/ui/popover";
import { Button } from "@/components/common/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/common/ui/calendar";
import RichTextEditor from "@/components/common/RichTextEditor";
import { CalendarDays, ImageIcon } from "lucide-react";
import BlogCategories from "./BlogCategories";

const BlogCategoriesModel = ({ open, onClose, onSuccess, editData }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const fileRef = useRef(null);

  // CRUD API hook

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      category: "",
      description: "",
      file: [],
      is_active: true,
      publishedDate: null,
    },
  });

  const { setValue } = form;

  // Prefill data on edit
  //   useEffect(() => {
  //     if (editData?.id) {
  //       form.reset({
  //         category: editData.blog_category_id
  //           ? String(editData.blog_category_id)
  //           : "",
  //         title: editData.title || "",
  //         author: editData.author || "",
  //         description: editData.description || "",
  //         file: editData.file
  //           ? Array.isArray(editData.file)
  //             ? editData.file
  //             : [{ file: editData.file }]
  //           : [],
  //         is_active: !!editData.is_active,
  //         publishedDate: editData.publishedDate
  //           ? new Date(editData.publishedDate)
  //           : null,
  //       });
  //     } else {
  //       form.reset({
  //         title: "",
  //         author: "",
  //         category: "",
  //         description: "",
  //         file: [],
  //         is_active: true,
  //         publishedDate: null,
  //       });
  //     }
  //   }, [editData, form]);

  // File Upload
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    const mapped = await Promise.all(
      files.map(async (file) => {
        const base64 = await fileToBase64(file);
        return { file: base64 };
      })
    );
    setValue("file", mapped);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileClick = () => {
    fileRef.current?.click();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        blog_category_id: Number(values.category),
        title: values.title,
        author: values.author,
        description: values.description,
      };

      if (editData) {
        await update(editData.id, payload);
        toast.success("Blog Category Updated Successfully");
      } else {
        await create(payload);
        toast.success("Blog Category Created Successfully");
      }

      onClose();
      onSuccess?.();
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseEditModal
      open={open}
      onOpenChange={onClose}
      title={`${editData ? "Edit" : "Add"} Blog Category`}
      form={form}
      onSubmit={handleSubmit}
      loading={loading}
      scrollContent={
        <>
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.length === 0 ? (
                          <div className="text-center text-xs text-gray-500">
                            No categories available
                          </div>
                        ) : (
                          categories
                            .filter((e) => e.is_active)
                            .map((cat) => (
                              <SelectItem key={cat.id} value={String(cat.id)}>
                                {cat.title}
                              </SelectItem>
                            ))
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter slug name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Write your blog description..."
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

export default BlogCategoriesModel;
