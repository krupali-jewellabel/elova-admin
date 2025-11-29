import { handleGET } from "@/lib/apiHandler";

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const token = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id") || 5;

  const category_id = searchParams.get("category_id");

  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId,
    Accept: "application/json",
  };

  return handleGET(
    `/api/store-admin/stock-selection/sub-categories-list/${category_id}`,
    headers
  );
}
