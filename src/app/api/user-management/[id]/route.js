import { handleDELETE, handlePUT } from "@/lib/apiHandler";

export async function PUT(req, { params }) {
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
    `/api/store-admin/user-management/update/${params.id}`,
    headers
  );
}

export async function DELETE(req, { params }) {
  const token = req.headers.get("authorization");
  const headers = {
    Accept: "application/json",
    "x-tenant-id": 5,
    ...(token && { Authorization: token }),
  };
  return handleDELETE(
    `/api/store-admin/user-management/delete?user_id=${params.id}`,
    null,
    headers
  );
}
