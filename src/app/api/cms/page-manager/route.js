import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  const headers = {
    "Content-Type": "application/json",
  };

  return handleGET(`/api/cms/common/static-pages`, headers);
}

export async function POST(req) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = await req.json();
  return handlePOST("/api/cms/common/add-static-page", body, headers);
}
