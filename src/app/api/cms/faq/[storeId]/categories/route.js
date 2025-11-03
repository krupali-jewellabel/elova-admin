import { NextResponse } from "next/server";
import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req, { params }) {
  try {
    const { storeId } = await params;

    const response = await handleGET(
      `/api/cms/common/get-faq-category/${storeId}`
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

export async function POST(req) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = await req.json();
  return handlePOST("/api/cms/common/add-faq-category", body, headers);
}
