import { handleDELETE, handleGET, handlePUT } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  const { id } = await params;
  return handleGET(`/api/cms/common/get-faq/${id}`);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  return handlePUT(req, `/api/cms/common/update-faq/${id}`);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return handleDELETE(`/api/cms/common/destroy-id/${id}`);
}
