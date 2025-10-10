import { handlePUT } from "@/lib/apiHandler";

export async function PUT(req) {
  const body = await req.json();
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5,
    Accept: "application/json",
  };

  const id = req.params.id;

  return handlePUT(
    `/api/store-admin/collection/update-collection/${id}`,
    body,
    headers
  );
}
