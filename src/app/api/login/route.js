import { handlePOST } from "@/lib/apiHandler";


export async function POST(req) {
  return handlePOST(req, "/api/store-admin/login");
}
