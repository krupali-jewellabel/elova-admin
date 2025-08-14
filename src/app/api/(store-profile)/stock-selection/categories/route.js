import { handleGET } from "@/lib/apiHandler";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    // "x-tenant-id": tenantId,
    Authorization: authHeader,
  };

  return handleGET("/api/store-admin/stock-selection/categories-list", headers);
}
