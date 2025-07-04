import { handlePOST } from "@/lib/apiHandler";

export async function POST(req) {
  const headers = {
    "X-XSRF-TOKEN": req.headers.get("x-xsrf-token") || "",
    Cookie: req.headers.get("cookie") || "",
  };

  return handlePOST(req, "/api/store-admin/store-profile", headers);
}
