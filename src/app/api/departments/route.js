import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  return handleGET("/api/store-admin/department/list", headers, {});
}

export async function POST(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  return handlePOST(req, "/api/store-admin/department/store-update", headers);
}
