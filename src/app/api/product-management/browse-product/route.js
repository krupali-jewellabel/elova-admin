import { handleGET } from "@/lib/apiHandler";

export async function GET(req) {
  const token = req.nextUrl.searchParams.get("token");

  // Determine Authorization safely
  const headers = {
    Authorization: token ? `Bearer ${token}` : req.headers.get("authorization"),
    "Content-Type": "application/json",
    "x-tenant-id": req.headers.get("x-tenant-id") || 5,
    Accept: "application/json",
  };

  return handleGET("/api/store-admin/stock-selection/products", headers);
}
