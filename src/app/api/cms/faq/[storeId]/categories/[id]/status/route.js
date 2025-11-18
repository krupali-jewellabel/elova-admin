import { handlePATCH } from "@/lib/apiHandler";

export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();
  return handlePATCH(`/api/cms/common/update-faq-question-status/${id}`, body);
}
