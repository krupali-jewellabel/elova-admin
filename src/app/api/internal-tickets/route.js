import { handlePOST } from "@/lib/apiHandler";

export async function POST(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  return handlePOST(
    req,
    "/api/store-admin/support-tickets/store-update",
    headers
  );
}

// import { handlePOST } from "@/lib/apiHandler";

// export async function POST(req) {
//   const authHeader = req.headers.get("authorization");
//   const tenantId = req.headers.get("x-tenant-id"); // forwarded from client

//   return handlePOST(req, "/api/store-admin/support-tickets/store-update", {
//     Authorization: authHeader,
//     "x-tenant-id": tenantId,
//     Accept: "application/json",
//   });
// }
