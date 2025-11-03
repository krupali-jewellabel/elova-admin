import { handleDELETE, handleGET, handlePUT } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  const { id } = params;
  return handleGET(`/api/cms/common/get-faq-category-id/${id}`);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  return handlePUT(`/api/cms/common/update-faq-category/${id}`, body);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  return handleDELETE(`/api/cms/common/destroy-category-id/${id}`);
}
