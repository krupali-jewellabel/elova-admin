import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("category_id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5,
    Accept: "application/json",
  };

  return handleGET(
    "/api/store-admin/margin/product-pricing-list",
    headers,
    categoryId ? { category_id: categoryId } : {}
  );
}

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
    "/api/store-admin/margin/price-configuration",
    headers
  );
}
