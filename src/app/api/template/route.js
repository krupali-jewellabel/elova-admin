import { handleGET } from "@/lib/apiHandler";

export async function GET() {
  return handleGET("/api/store-admin/get-templates");
}
