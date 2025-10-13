import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  return handleGET("/api/store-admin/role/list", headers, {});
}

export async function POST(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  // ❗ handlePOST automatically extracts body from req
  return handlePOST(req, "/api/store-admin/role/store-update", headers);
}
