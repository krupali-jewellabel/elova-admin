import { handlePATCH } from "@/lib/apiHandler";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const { is_active } = await request.json();
  const { id } = await params;
  if (typeof is_active !== "boolean") {
    return NextResponse.json(
      { error: "Invalid input: is_active must be a boolean" },
      { status: 400 }
    );
  }

  return handlePATCH(`/api/cms/common/update-faq-status/${id}`, {
    is_active,
  });
}
