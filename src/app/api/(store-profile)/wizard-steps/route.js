import { handleGET } from "@/lib/apiHandler";

export async function GET() {
  const storeId = 1; // Get from env, cookie, session, etc.
  return handleGET(
    "/api/store-admin/get-wizard-data",
    {},
    { store_id: storeId }
  );
}
