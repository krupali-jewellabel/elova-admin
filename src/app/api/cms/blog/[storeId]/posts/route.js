import { NextResponse } from "next/server";
import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  try {
    const { storeId } = params;

    const response = await handleGET(`/api/cms/common/get-blogs/${storeId}`);
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
    const body = await req.json();

    return handlePOST(req, `/api/cms/common/add-blog-post`, {
      "Content-Type": "application/json",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
