// "use client";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Toaster } from "sonner";
// import ProtectedRoute from "@/components/common/ProtectedRoute";
// import FormWizard from "@/components/commonPages/FormWizard";

// export default function Home() {
//   const router = useRouter();
//   const { token } = useSelector((state) => state.auth);
//   console.log("token", token);
//   const on_boarding_exists = false;
//   useEffect(() => {
//     if (!token) {
//       router.replace("/login");
//       return;
//     }

//     if (on_boarding_exists) {
//       router.replace("/dashboard");
//     } else {
//       router.replace("/form-wizard");
//     }
//   }, [token, on_boarding_exists, router]);

//   if (!token) return null;

//   return (
//     <ProtectedRoute>
//       <Toaster position="top-right" />
//       {/* {false && <FormWizard />} */}
//     </ProtectedRoute>
//   );
// }

"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import FormWizard from "@/components/commonPages/FormWizard";

export default function Home() {
  const router = useRouter();
  const { token, on_boarding_exists } = useSelector((state) => state.auth);

  useEffect(() => {
    // ✅ If no token, send to login (middleware might handle this too)
    if (!token) {
      router.replace("/login");
      return;
    }

    // ✅ Decide based on onboarding state
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
