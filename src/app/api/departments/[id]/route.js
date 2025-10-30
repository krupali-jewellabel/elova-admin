import { handleDELETE } from "@/lib/apiHandler";

export async function DELETE(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  // Read the body to get the ID
  const body = await req.json();

  return handleDELETE("/api/store-admin/department/delete", body, headers);
}
