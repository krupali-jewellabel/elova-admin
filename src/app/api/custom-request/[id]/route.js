import { handleGET } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  const { id } = params;
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId || 5,
    Accept: "application/json",
  };

  return handleGET(`/api/super-admin/custom-request/view/${id}`, headers);
}
