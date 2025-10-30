import { handleDELETE } from "@/lib/apiHandler";

export async function DELETE(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  return handleDELETE(req, "/api/store-admin/role/delete", headers);
}
