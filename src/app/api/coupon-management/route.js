// import { handleGET } from "@/lib/apiHandler";

// // ✅ GET orders list
// export async function GET(req) {
//   const authHeader = req.headers.get("authorization");
//   const tenantId = req.headers.get("x-tenant-id");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": 5,
//     Accept: "application/json",
//   };

//   return handleGET("/api/store-admin/customers/list", headers, {});
// }

// import { handleGET, handlePOST } from "@/lib/apiHandler";

// export async function GET() {
//   return handleGET("/api/store-admin/coupon-management/coupons");
// }

// export async function POST(req) {
//   const headers = {
//     "X-XSRF-TOKEN": req.headers.get("x-xsrf-token") || "",
//     "x-tenant-id": 5,
//     Cookie: req.headers.get("cookie") || "",
//   };

//   return handlePOST(
//     req,
//     "/api/store-admin/coupon-management/add-coupon",
//     headers
//   );
// }

// import { handleGET, handlePOST } from "@/lib/apiHandler";

// export async function GET(req) {
//   const headers = {
//     "X-XSRF-TOKEN": req.headers.get("x-xsrf-token") || "",
//     Cookie: req.headers.get("cookie") || "",
//   };

//   // call backend (your real Postman API)
//   return handleGET("/api/store-admin/coupon-management/coupons", headers);
// }

// export async function POST(req) {
//   const headers = {
//     "X-XSRF-TOKEN": req.headers.get("x-xsrf-token") || "",
//     Cookie: req.headers.get("cookie") || "",
//   };

//   return handlePOST(
//     req,
//     "/api/store-admin/coupon-management/add-coupon",
//     headers
//   );
// }

// import { handleGET, handlePOST } from "@/lib/apiHandler";

// export async function GET(req) {
//   const authHeader = req.headers.get("authorization");
//   const tenantId = req.headers.get("x-tenant-id");
//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": 5,
//     Accept: "application/json",
//   };

//   return handleGET("/api/store-admin/coupon-management/coupons", headers);
// }

// export async function POST(req) {
//   const headers = {
//     "X-XSRF-TOKEN": req.headers.get("x-xsrf-token") || "",
//     Cookie: req.headers.get("cookie") || "",
//   };

//   return handlePOST(
//     req,
//     "/api/store-admin/coupon-management/add-coupon",
//     headers
//   );
// }

import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");
  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5, // ✅ dynamic or fallback
    Accept: "application/json",
  };

  return handleGET("/api/store-admin/coupon-management/coupons", headers);
}

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5, // ✅ added
    Accept: "application/json",
    "X-XSRF-TOKEN": req.headers.get("x-xsrf-token") || "",
    Cookie: req.headers.get("cookie") || "",
  };

  return handlePOST(
    req,
    "/api/store-admin/coupon-management/add-coupon",
    headers
  );
}
