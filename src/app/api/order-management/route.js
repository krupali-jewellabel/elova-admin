import { handleGET } from "@/lib/apiHandler";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const perPage = searchParams.get("limit");
  const search = searchParams.get("q");

  const query = new URLSearchParams();
  if (page) query.append("page", page);
  if (perPage) query.append("limit", perPage);
  if (search) query.append("q", search);

  const token = req.headers.get("authorization");

  const headers = {
    Accept: "application/json",
    "x-tenant-id": 5,
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
  };

  return handleGET(
    `/api/store-admin/order-management/list?${query.toString()}`,
    headers
  );
}
