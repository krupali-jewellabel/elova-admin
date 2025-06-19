"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useStepForm = ({ apiEndpoint, schema, defaultValues }) => {
  const [stepData, setStepData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const fetchData = async (fetchAll) => {
    setLoading(true);
    try {
      const res = await fetchAll();
      setStepData(res.data || []);
    } catch (e) {
      console.error("Fetch Error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, cb) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      cb(file); // Optional callback
    }
  };

  return {
    form,
    stepData,
    loading,
    fetchData,
    handleFileChange,
    previewUrl,
  };
};
