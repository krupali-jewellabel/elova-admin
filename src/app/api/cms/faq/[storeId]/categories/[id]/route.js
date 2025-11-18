import { handleDELETE, handleGET, handlePUT } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  const { id } = await params;
  return handleGET(`/api/cms/common/get-faq-category-id/${id}`);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const { id } = await params;
  return handlePUT(`/api/cms/common/update-faq-category/${id}`, body);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return handleDELETE(`/api/cms/common/destroy-category-id/${id}`);
}
