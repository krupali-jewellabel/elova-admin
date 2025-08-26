import { handleGET } from "@/lib/apiHandler";

// ✅ GET orders list
export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  return handleGET("/api/store-admin/customers/list", headers, {});
}
