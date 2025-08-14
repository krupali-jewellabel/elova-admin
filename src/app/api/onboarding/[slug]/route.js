import { handleGET } from "@/lib/apiHandler";
export async function GET(req, { params }) {
  const { slug } = params;

  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return handleGET(`/api/store-admin/onboarding/step/${slug}`, headers);
}
