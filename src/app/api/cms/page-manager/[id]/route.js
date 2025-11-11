import { handleDELETE, handlePUT } from "@/lib/apiHandler";

export async function PUT(req, { params }) {
  const body = await req.json();
  const { id } = await params;
  return handlePUT(`/api/cms/common/static-pages/${id}`, body);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  return handleDELETE(`/api/cms/common/static-pages/${id}`);
}
