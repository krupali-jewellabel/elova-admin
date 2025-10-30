// import { handleDELETE } from "@/lib/apiHandler";

// export async function DELETE(req) {
//   const authHeader = req.headers.get("authorization");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": 5,
//     Accept: "application/json",
//   };

//   return handleDELETE(req, "/api/store-admin/role/delete", headers);
// }

import { handleDELETE } from "@/lib/apiHandler";

export async function DELETE(req, { params }) {
  try {
    const authHeader = req.headers.get("authorization");
    const { id } = params;

    const headers = {
      Authorization: authHeader,
      "x-tenant-id": 5,
      Accept: "application/json",
    };

    return await handleDELETE(`/api/store-admin/role/delete/${id}`, headers);
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(
      JSON.stringify({ error: "Server error", details: error.message }),
      { status: 500 }
    );
  }
}
