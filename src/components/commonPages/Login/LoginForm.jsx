"use client";
import { useDispatch } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/common/ui/input";
import { Button } from "@/components/common/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/common/ui/checkbox";
import { loginUser } from "@/store/slices/authSlice";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setError(null);

    try {
      const resultAction = await dispatch(
        loginUser({
          email: values.email,
          password: values.password,
          remember: values.rememberMe,
        })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        const data = resultAction.payload;

        // Store token in localStorage (optional, for client-side use)
        localStorage.setItem("token", data.token);

        // Also set cookie so middleware can read it server-side
        document.cookie = `token=${data.token}; path=/; max-age=86400; secure; samesite=strict`;

        toast.success("Login Successfully");

        // Redirect to wizard immediately
        router.push("/");
      } else {
        throw new Error(resultAction.payload || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="space-y-1.5 pb-3 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center gap-2.5">
                <FormLabel>Password</FormLabel>
                <button
                  type="button"
                  onClick={() => router.push("/reset-password")}
                  className="text-sm font-semibold text-foreground hover:text-primary cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Input
                  placeholder="Your password"
                  type={passwordVisible ? "text" : "password"}
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                >
                  {passwordVisible ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
              />
              <label
                htmlFor="remember-me"
                className="text-sm leading-none text-muted-foreground"
              >
                Remember me
              </label>
            </div>
          )}
        />

        <div className="flex flex-col gap-2.5">
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
