import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");
  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId,
    Accept: "application/json",
  };

  return handleGET("/api/store-admin/get-categories", headers, {});
}

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");
  
  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId,
    Accept: "application/json",
  };

  return handlePOST(req, "/api/store-admin/store-categories", headers);
}
