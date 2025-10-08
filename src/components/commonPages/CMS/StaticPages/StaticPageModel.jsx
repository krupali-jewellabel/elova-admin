"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "@/components/common/RichTextEditor";
import BaseEditModal from "@/components/common/ui/BaseEditModal";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";
import { useCrudApi } from "@/hooks/useCrudApi";
import { toast } from "sonner";

const StaticPageModel = ({ open, onOpenChange, editRow, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { create, update } = useCrudApi("/api/cms/page-manager");

  const form = useForm({
    defaultValues: { title: "", description: "" },
  });

  const isEdit = !!editRow;

  useEffect(() => {
    if (open) {
      if (editRow) {
        form.reset({
          title: editRow.page_title || "",
          description: editRow.content || "",
        });
      } else {
        form.reset({
          title: "",
          description: "",
        });
      }
    }
  }, [editRow, open, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        page_title: values.title,
        content: values.description,
        ...(isEdit && { id: editRow.id }),
      };

      if (isEdit) {
        await update(editRow.id, payload);
        toast.success("Page updated successfully!");
      } else {
        await create(payload);
        toast.success("Page created successfully!");
      }

      if (onSuccess) await onSuccess();
      onOpenChange(false);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseEditModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${isEdit ? "Edit" : "Add"} Page`}
      form={form}
      onSubmit={form.handleSubmit(handleSubmit)}
      loading={loading}
      scrollContent={
        <>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Page Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter page title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="Write your page description..."
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

export default StaticPageModel;
