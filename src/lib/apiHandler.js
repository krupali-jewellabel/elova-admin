import { NextResponse } from "next/server";

const BASE_URL = process.env.API_BASE_URL || "https://api.jewellabel.in";

export async function handleGET(apiPath, headers = {}, queryParams = {}) {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${BASE_URL}${apiPath}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers,
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// export async function handlePOST(req, apiPath, customHeaders = {}) {
//   try {
//     // const body = await req.json();
//     let body;
//     const contentType = req.headers.get("content-type") || "";
//     if (contentType.includes("application/json")) {
//       body = await req.json();
//     } else if (contentType.includes("multipart/form-data")) {
//       const formData = await req.formData();
//       body = Object.fromEntries(formData.entries()); // optional: convert to object if needed
//     }
//     const headers = {
//       "Content-Type": "application/json",
//       ...customHeaders,
//     };

//     const response = await fetch(`${BASE_URL}${apiPath}`, {
//       method: "POST",
//       credentials: "include",
//       headers,
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Failed to post data" },
//         { status: response.status }
//       );
//     }

//     const result = await response.json();
//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
export async function handlePOST(req, apiPath, customHeaders = {}) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body;
    let headers = {
      ...customHeaders,
    };

    if (contentType.includes("application/json")) {
      body = await req.json();
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    } else if (contentType.includes("multipart/form-data")) {
      body = await req.formData(); // do not stringify!
      // Do NOT set Content-Type, let fetch/browser set it with proper boundary
    }

    const response = await fetch(`${BASE_URL}${apiPath}`, {
      method: "POST",
      credentials: "include",
      headers,
      body,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to post data" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handlePUT(req, apiPath, customHeaders = {}) {
  try {
    const body = await req.json();
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const response = await fetch(`${BASE_URL}${apiPath}`, {
      method: "PUT",
      credentials: "include",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update data" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleDELETE(apiPath, customHeaders = {}) {
  try {
    const response = await fetch(`${BASE_URL}${apiPath}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        ...customHeaders,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to delete", details: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function handlePATCH(req, apiPath, customHeaders = {}) {
  try {
    const body = await req.json();
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const response = await fetch(`${BASE_URL}${apiPath}`, {
      method: "PATCH",
      credentials: "include",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Failed to patch data", details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
