import { NextResponse } from "next/server";
import { handleDELETE, handlePUT } from "@/lib/apiHandler";

export async function PUT(req, { params }) {
  if (!params?.id) {
    return NextResponse.json({ error: "Missing category ID" }, { status: 400 });
  }

  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5,
    Accept: "application/json",
  };

  return handlePUT(
    req,
    `/api/store-admin/coupon-management/update-coupon/${params.id}`,
    headers
  );
}

// export async function DELETE(req, { params }) {
//   const authHeader = req.headers.get("authorization");
//   const tenantId = req.headers.get("x-tenant-id");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": tenantId || 5,
//     Accept: "application/json",
//   };

//   return handleDELETE(
//     `/api/store-admin/coupon-management/delete-coupon/${params.id}`,
//     headers
//   );
// }

export async function DELETE(req, { params }) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5,
    Accept: "application/json",
  };

  return handleDELETE(
    `/api/store-admin/coupon-management/delete-coupon/${params.id}`,
    null,
    headers
  );
}
