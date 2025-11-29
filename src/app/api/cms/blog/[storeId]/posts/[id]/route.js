import { handleDELETE, handleGET, handlePUT } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  const { id } = await params;
  return handleGET(`/api/cms/common/get-blog/${id}`);
}

export async function PUT(req, { params }) {
  const { id } = params;
  // const payload = await req.json().catch(() => ({}));
  return handlePUT(`/api/cms/common/update-blog/${id}`, payload);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  return handleDELETE(`/api/cms/common/destroy-blog/${id}`);
}
