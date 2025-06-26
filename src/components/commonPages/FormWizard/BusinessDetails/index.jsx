"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent } from "@/components/common/ui/cards/card";
import { Input } from "@/components/common/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { useCrudApi } from "@/hooks/useCrudApi";
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
import { usePathname, useRouter } from "next/navigation";
import { useWizardPaths } from "@/hooks/useWizardPaths";

const BusinessDetails = () => {
  const [stepData, setStepData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { next, previous } = useWizardPaths();
  const { fetchAll } = useCrudApi("/api/onboarding/business-details");
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
      setStepData(res.data || []);
    } catch (err) {
      setError(err.message || "Error fetching data");
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

  return (
    <Card className="pb-2.5 w-full h-full justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form {...form}>
          {" "}
          <div className="text-center mb-[32px] text-xl font-medium leading-none">
            {stepData?.name}
          </div>
          <div className="grid gap-5 lg:gap-7.5 xl:w-[38.75rem] w-full mx-auto">
            <form>
              <CardContent className="grid gap-5">
                {stepData?.questions?.map((q) => (
                  <div
                    key={q.id}
                    className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5"
                  >
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
                                  <SelectValue placeholder={q.question_label} />
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
                ))}

                <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-10">
                  <Button variant="ghost">Save Draft</Button>
                  <Button variant="outline">Previous</Button>
                  <Button type="button" onClick={() => router.push(next.path)}>
                    Next
                  </Button>
                </div>
              </CardContent>
            </form>
          </div>
        </Form>
      )}
    </Card>
  );
};

export default BusinessDetails;
