// import { NextResponse } from "next/server";
// import { handlePATCH } from "@/lib/apiHandler";

// export async function PATCH(req, { params }) {
//   // params.id comes from [id] in the route
//   const body = await req.json(); // <-- this works on App Router Request
//   const { is_active } = body;

//   if (typeof is_active !== "boolean") {
//     return NextResponse.json(
//       { error: "is_active must be boolean" },
//       { status: 400 }
//     );
//   }

//   const authHeader = req.headers.get("authorization");
//   const tenantId = req.headers.get("x-tenant-id");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": tenantId,
//     Accept: "application/json",
//   };

//   const data = await handlePATCH(
//     `/api/store-admin/product-management/toggle-product`,
//     { is_active },
//     headers
//   );

//   return NextResponse.json(data);
// }

import { NextResponse } from "next/server";
import { handlePATCH, handlePOST } from "@/lib/apiHandler";

export async function POST(req, { params }) {
  const body = await req.json();

  const { is_active, product_id, category_id, selling_price } = body;

  if (typeof is_active !== "boolean") {
    return NextResponse.json(
      { error: "is_active must be boolean" },
      { status: 400 }
    );
  }

  // BUILD PAYLOAD BASED ON ACTIVE/INACTIVE
  const payload = is_active
    ? {
        product_id,
        category_id,
        selling_price,
      }
    : {
        product_id,
        category_id: null,
        selling_price,
      };

  const authHeader = req.headers.get("authorization");
  const tenantId = req.headers.get("x-tenant-id");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": tenantId,
    Accept: "application/json",
  };

  const data = await handlePOST(
    `/api/store-admin/product-management/toggle-product`,
    payload,
    headers
  );

  return NextResponse.json(data);
}
