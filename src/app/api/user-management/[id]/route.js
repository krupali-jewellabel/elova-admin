import { handleDELETE } from "@/lib/apiHandler";

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
