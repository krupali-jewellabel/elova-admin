import { NextResponse } from "next/server";
import { handleGET, handlePOST } from "@/lib/apiHandler";

// GET BLOG POSTS
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

// ADD BLOG POST
export async function POST(req, { params }) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    return await handlePOST(req, `/api/cms/common/add-blog-post`, headers);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
