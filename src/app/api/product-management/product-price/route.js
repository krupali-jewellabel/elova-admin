import { handleGET } from "@/lib/apiHandler";

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

  // Read all filters
  const categoryId = searchParams.get("category_id");
  const subCategoryId = searchParams.get("sub_category_id");
  const occasionId = searchParams.get("occasion_id");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  // Build query
  const query = new URLSearchParams();

  if (categoryId) query.append("category_id", categoryId);
  if (subCategoryId) query.append("sub_category_id", subCategoryId);
  if (occasionId) query.append("occasion_id", occasionId);
  if (limit) query.append("limit", limit);
  if (page) query.append("page", page);

  let url = "/store-admin/product-management/list";

  if (query.toString().length > 0) {
    url += `?${query.toString()}`;
  }

  return handleGET(url, headers);
}
