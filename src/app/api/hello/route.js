import { NextResponse } from "next/server";

export async function GET() {
  const api = "https://api.jewellabel.in/api";
  const baseUrl = api || "http://localhost:3000"; // Replace with your API base URL
  const res = await fetch(`${baseUrl}/super-admin/form-builder/questions`);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: res.status }
    );
  }

  const users = await res.json();
  return NextResponse.json(users);
}
