import { handlePOST } from "@/lib/apiHandler";

// Keep POST if you also want to support creating best sellers
export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5,
    Accept: "application/json",
  };

  return handlePOST(
    req,
    "/api/store-admin/product-management/create-manual-order",
    headers
  );
}
