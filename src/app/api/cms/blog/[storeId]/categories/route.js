// import { NextResponse } from "next/server";
// import { handleGET, handlePOST } from "@/lib/apiHandler";

// export async function GET(req, { params }) {
//   try {
//     const { storeId } = await params;

//     const response = await handleGET(
//       `/api/cms/common/get-blog-categories/${storeId}`
//     );

//     return response;
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   const headers = {
//     "Content-Type": "application/json",
//   };
//   const body = await req.json();
//   return handlePOST(`/api/cms/common/add-blog-category`, body, headers);
// }

import { NextResponse } from "next/server";
import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  try {
    const { storeId } = params;

    const response = await handleGET(
      `/api/cms/common/get-blog-categories/${storeId}`
    );

    return response;
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { storeId } = params;
    const body = await req.json();

    return handlePOST(
      {
        headers: { "content-type": "application/json" },
        json: () => body,
      },
      `/api/cms/common/add-blog-category/${storeId}`,
      { "Content-Type": "application/json" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
