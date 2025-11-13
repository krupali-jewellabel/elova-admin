import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5,
    Accept: "application/json",
  };

  // Read incoming query params
  const categoryId = searchParams.get("category_id");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  // Build final query using URLSearchParams
  const query = new URLSearchParams();

  if (categoryId) query.append("category_id", categoryId);
  if (page) query.append("page", page);
  if (limit) query.append("limit", limit);

  let url = "/api/store-admin/product-management/list";

  // If any query exists, attach it
  if (query.toString().length > 0) {
    url += `?${query.toString()}`;
  }

  return handleGET(url, headers);
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
    "/api/store-admin/margin/update-product-status",
    headers
  );
}
