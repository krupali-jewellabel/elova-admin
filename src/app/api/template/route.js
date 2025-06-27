import { NextResponse } from "next/server";

export async function GET(req) {
  const api = "https://api.jewellabel.in";
  const baseUrl = api || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/store-admin/get-templates`);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: res.status }
    );
  }

  const users = await res.json();
  return NextResponse.json(users);
}
