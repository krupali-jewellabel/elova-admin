import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  const token = req.headers.get("authorization");

  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  return handleGET("/api/store-admin/user-management/list", headers);
}

export async function POST(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  //   return handlePOST("/api/store-admin/user-management/save", headers);
  return handlePOST(req, "/api/store-admin/user-management/save", headers);
}
