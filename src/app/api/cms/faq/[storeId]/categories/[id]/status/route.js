import { handlePATCH } from "@/lib/apiHandler";

export async function PATCH(request, { params }) {
  const { is_active } = await request.json();
  const { id } = params;

  return handlePATCH(`/api/cms/common/update-faq-category-status/${id}`, {
    is_active,
  });
}
