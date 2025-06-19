import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   const { slug } = params;

//   const data = {
//     branding: { name: "Branding Info" },
//     "business-details": { name: "Business Info" },
//     "web-apperence": { name: "Web Appearance Info" },
//   };

//   return NextResponse.json(data[slug] || { error: "Not found" }, {
//     status: data[slug] ? 200 : 404,
//   });
// }

export async function GET(req, { params }) {debugger
  const slug = params.slug;
  const api = "https://api.jewellabel.in";
  const baseUrl = api || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/store-admin/onboarding/step/${slug}`);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: res.status }
    );
  }

  const users = await res.json();
  return NextResponse.json(users);
}
