import { handleGET } from "@/lib/apiHandler";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-tenant-id": 5,
    Authorization: authHeader,
  };

  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams);

  return handleGET(
    "/api/store-admin/stock-selection/products",
    headers,
    queryParams
  );
}
