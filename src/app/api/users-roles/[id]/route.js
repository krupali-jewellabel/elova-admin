import { handleDELETE } from "@/lib/apiHandler";

export async function DELETE(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization");
    const { id } = params;

    const body = await req.json().catch(() => ({}));

    const headers = {
      Authorization: authHeader,
      "x-tenant-id": 5,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return await handleDELETE(
      `/api/store-admin/role/delete/${id}`,
      body,
      headers
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(
      JSON.stringify({ error: "Server error", details: error.message }),
      { status: 500 }
    );
  }
}
