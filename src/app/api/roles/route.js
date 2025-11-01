import { handleGET } from "@/lib/apiHandler";

export async function GET(req) {
  const token = req.headers.get("authorization");

  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  // ✅ correct Laravel API
  return handleGET("/api/store-admin/role/list", headers);
}
