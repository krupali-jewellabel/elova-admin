"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function Home() {
  const router = useRouter();
  const { token, on_boarding_exists } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    if (on_boarding_exists) {
      router.replace("/dashboard");
    } else {
      router.replace("/form-wizard");
    }
  }, [token, on_boarding_exists, router]);

  return (
    <ProtectedRoute>
      <Toaster position="top-right" />
    </ProtectedRoute>
  );
}
