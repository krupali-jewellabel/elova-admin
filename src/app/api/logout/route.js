import { NextResponse } from "next/server";
import { handlePOST } from "@/lib/apiHandler";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const headers = {
      Authorization: authHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const response = await handlePOST(req, "/api/store-admin/logout", headers);

    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
