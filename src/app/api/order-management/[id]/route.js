// app/api/store-admin/order-management/view-order/[id]/route.js
import { handleGET } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  const { id } = params;
  const token = req.headers.get("authorization");

  const headers = {
    Accept: "application/json",
    "x-tenant-id": 5,
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
  };

  return handleGET(
    `/api/store-admin/order-management/view-order/${id}`,
    headers
  );
}
