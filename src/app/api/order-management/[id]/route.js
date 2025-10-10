// import { handleGET } from "@/lib/apiHandler";

// export async function GET(req, { params }) {
//   const authHeader = req.headers.get("authorization");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": 5,
//     Accept: "application/json",
//   };

//   // 🔥 Fetch single order details
//   return handleGET(
//     `/api/store-admin/order-management/view-order/${params.id}`,
//     headers,
//     {}
//   );
// }

// import { handleGET } from "@/lib/apiHandler";

// export async function GET(req, { params }) {
//   const authHeader = req.headers.get("authorization");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": 5,
//     Accept: "application/json",
//   };

//   // Forward to backend: /view-order/:id
//   return handleGET(
//     `/api/store-admin/order-management/view-order/${params.id}`,
//     headers,
//     {}
//   );
// }

// app/api/order-management/[id]/route.js
// export async function GET(req, { params }) {
//   const { id } = params;
//   const authHeader = req.headers.get("authorization");
//   const tenantId = req.headers.get("x-tenant-id");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": 5,
//     Accept: "application/json",
//   };

//   return handleGET(
//     `/api/store-admin/order-management/view-order/${id}`,
//     headers
//   );
// }

import { handleGET } from "@/lib/apiHandler";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  const { id } = params;
  const token = req.headers.get("authorization");

  const headers = {
    Accept: "application/json",
    "x-tenant-id": 5,
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
  };

  return handleGET(
    `/api/store-admin/order-management/view-order/${id}`,
    headers,
    queryParams
  );
}
