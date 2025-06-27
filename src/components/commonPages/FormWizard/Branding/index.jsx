"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent } from "@/components/common/ui/cards/card";
import { Input, InputWrapper } from "@/components/common/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { ImageIcon, SquareMousePointer } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCrudApi } from "@/hooks/useCrudApi";
import { useWizardPaths } from "@/hooks/useWizardPaths";
import { useRouter } from "next/navigation";

const Branding = () => {
  const [stepData, setStepData] = useState(null);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const { fetchAll } = useCrudApi("/api/onboarding/branding");
  const { create } = useCrudApi("/api/store-profile");

  const router = useRouter();
  const { next, previous } = useWizardPaths();

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const PackageSchema = z.object({
    name: z
      .string()
      .nonempty({ message: "Name is required." })
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(50, { message: "Name must not exceed 50 characters." }),
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchAll();

      const rawData = res.data;

      const normalizedQuestions = Object.values(rawData?.questions || {}).sort(
        (a, b) => a.display_order - b.display_order
      );

      setStepData({
        ...rawData,
        questions: normalizedQuestions,
      });
    } catch (err) {
      console.log(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(PackageSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (formValues) => {
    try {
      setLoading(true);
      await create(formValues);
      // router.push(next.path);
    } catch (err) {
      console.error("Submit error:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  // {
  //   loading && <p>Loading...</p>;
  // }
  return (
    <Card className="pb-2.5 w-full h-auto justify-center">
      <Form {...form}>
        <div className="text-center mt-[40px] text-xl font-medium leading-none">
          {stepData?.name}
        </div>
        <div className="grid gap-5 lg:gap-7.5 xl:w-[38.75rem] w-full mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-5">
              {stepData?.questions &&
                stepData?.questions?.map((q) => {
                  return (
                    <div
                      key={q.id}
                      className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5"
                    >
                      {q.answer_type === "file" && (
                        <div className="flex flex-wrap justify-between gap-5">
                          <div className="flex flex-col">
                            <div className="text-mono text-sm font-medium">
                              {q.question_text}
                            </div>
                            <span className="text-secondary-foreground text-sm">
                              {q.question_label}
                            </span>
                          </div>
                          <div className="flex flex-wrap sm:flex-nowrap gap-5 lg:gap-7.5 max-w-96 w-full">
                            <div
                              className="flex bg-center w-full p-5 lg:p-7 bg-no-repeat bg-[length:550px] border border-input rounded-xl border-dashed branding-bg cursor-pointer"
                              onClick={handleFileClick}
                            >
                              <div className="flex flex-col place-items-center place-content-center text-center rounded-xl w-full">
                                <div className="flex items-center mb-2.5">
                                  <div className="relative size-11 shrink-0">
                                    <svg
                                      className="w-full h-full stroke-orange-200 fill-white"
                                      width="44"
                                      height="48"
                                      viewBox="0 0 44 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506
                          18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937
                          39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                                      />
                                      <path
                                        d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506
                          18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937
                          39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                                        stroke=""
                                        strokeOpacity="0.2"
                                      />
                                    </svg>
                                    <div className="absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
                                      <ImageIcon className="text-xl ps-px text-primary" />
                                    </div>
                                  </div>
                                </div>
                                <div className="text-mono text-xs font-medium hover:text-primary-active mb-px">
                                  Click or Drag & Drop
                                </div>
                                <span className="text-xs text-secondary-foreground text-nowrap">
                                  SVG, PNG, JPG (max. 800x400)
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  ref={fileInputRef}
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                              </div>
                            </div>

                            {previewUrl && (
                              <img
                                src={previewUrl}
                                className="h-[130px] w-[130px] mt-2 rounded object-contain"
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {q.answer_type === "color_picker" && (
                        <div className="flex w-full justify-between gap-5">
                          <div className="flex flex-col">
                            <div className="text-mono text-sm font-medium">
                              {q.question_text}
                            </div>
                            <span className="text-secondary-foreground text-sm">
                              {q.question_label}
                            </span>
                          </div>
                          <InputWrapper className="w-52 relative">
                            <input
                              type="color"
                              id={`color-input-${q.id || 1}`}
                              className="absolute w-0 h-0 opacity-0 pointer-events-none"
                              value={selectedColor}
                              onChange={(e) => {
                                setSelectedColor(e.target.value);
                                console.log("Color selected:", e.target.value);
                              }}
                            />
                            <Button
                              variant="dim"
                              mode="icon"
                              className=""
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const colorInput = document.getElementById(
                                  `color-input-${q.id || 1}`
                                );
                                if (colorInput) {
                                  console.log("Triggering color input click");
                                  colorInput.click();
                                } else {
                                  console.error("Color input not found");
                                }
                              }}
                            >
                              <SquareMousePointer
                                size={16}
                                style={{ color: selectedColor }}
                              />
                            </Button>
                            <Input type="text" value={selectedColor} readOnly />
                          </InputWrapper>
                        </div>
                      )}

                      {q.answer_type === "text" && (
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel> {q.question_text}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={q.question_label}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {q.answer_type === "dropdown" && (
                        <FormField
                          control={form.control}
                          name="landing_form_question_id"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>{q.question_text}</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={q.question_label}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {q.options.length === 0 ? (
                                        <div className="text-center text-gray-500">
                                          No options available
                                        </div>
                                      ) : (
                                        q.options?.map((que) => (
                                          <SelectItem
                                            key={que.id}
                                            value={String(que.value)}
                                          >
                                            {que.label}
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
                      )}
                    </div>
                  );
                })}

              <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-10">
                <Button variant="ghost">Save Draft</Button>
                <Button
                  variant="outline"
                  onClick={() => router.push(previous.path)}
                >
                  Previous
                </Button>
                {/* <Button type="submit">Next</Button> */}
                <Button type="submit" onClick={() => router.push(next.path)}>
                  Next
                </Button>
              </div>
            </CardContent>
          </form>
        </div>
      </Form>
    </Card>
  );
};

export default Branding;
