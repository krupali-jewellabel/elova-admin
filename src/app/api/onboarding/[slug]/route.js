import { handleGET } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  const { slug } = await params;
  return handleGET(`/api/store-admin/onboarding/step/${slug}`);
}
