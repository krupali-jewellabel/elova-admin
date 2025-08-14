import { handlePOST } from "@/lib/apiHandler";

export async function POST(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return handlePOST(
    req,
    "/api/store-admin/store-setting-and-launch-prep",
    headers
  );
}
