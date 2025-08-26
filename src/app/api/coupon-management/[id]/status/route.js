// import { handlePATCH } from "@/lib/apiHandler";
// import { NextResponse } from "next/server";

// export async function PATCH(request, { params }) {
//   const { is_active } = await request.json();

//   if (typeof is_active !== "boolean") {
//     return NextResponse.json(
//       { error: "Invalid input: is_active must be a boolean" },
//       { status: 400 }
//     );
//   }

//   // Get headers from request
//   const authHeader = request.headers.get("authorization");
//   const tenantId = request.headers.get("x-tenant-id");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": tenantId || 5, // dynamic fallback
//     Accept: "application/json",
//   };

//   return handlePATCH(
//     `/api/store-admin/coupon-management/update-status/${params.id}/status`,
//     { is_active },
//     // headers // ✅ pass headers like GET/POST
//   );
// }

import { handlePATCH } from "@/lib/apiHandler";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const { is_active } = await request.json();

  if (typeof is_active !== "boolean") {
    return NextResponse.json(
      { error: "Invalid input: is_active must be a boolean" },
      { status: 400 }
    );
  }

  // Get headers from request
  const authHeader = request.headers.get("authorization");
  const tenantId = request.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  // Pass headers properly
  return handlePATCH(
    `/api/store-admin/coupon-management/update-status/${params.id}/status`,
    { is_active },
    headers
  );
}
