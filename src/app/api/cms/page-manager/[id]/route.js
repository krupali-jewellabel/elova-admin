import { handleDELETE, handlePUT } from "@/lib/apiHandler";

export async function PUT(req, { params }) {
  const { id } = await params;
  return handlePUT(req, `/api/cms/common/static-pages/${id}`);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  return handleDELETE(`/api/cms/common/static-pages/${id}`);
}
