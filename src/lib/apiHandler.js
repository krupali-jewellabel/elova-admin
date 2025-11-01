// import { NextResponse } from "next/server";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jewellabel.in";

// export async function handleGET(apiPath, headers = {}, queryParams = {}) {
//   try {
//     const queryString = new URLSearchParams(queryParams).toString();
//     const url = `${BASE_URL}${apiPath}${queryString ? `?${queryString}` : ""}`;

//     const res = await fetch(url, {
//       method: "GET",
//       credentials: "include",
//       headers,
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: "Failed to fetch data" },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function handlePOST(req, apiPath, customHeaders = {}) {
//   const authHeader =
//     customHeaders.Authorization || req.headers.get("authorization");

//   let body;
//   const contentType = req.headers.get("content-type") || "";

//   if (contentType.includes("application/json")) {
//     body = await req.json();
//     customHeaders["Content-Type"] = "application/json";
//     body = JSON.stringify(body);
//   }

//   const response = await fetch(`${BASE_URL}${apiPath}`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       ...customHeaders,
//       ...(authHeader && { Authorization: authHeader }),
//     },
//     body,
//   });

//   return NextResponse.json(await response.json());
// }

// export async function handlePUT(req, apiPath, customHeaders = {}) {
//   try {
//     const body = await req.json();
//     const headers = {
//       "Content-Type": "application/json",
//       ...customHeaders,
//     };

//     const response = await fetch(`${BASE_URL}${apiPath}`, {
//       method: "PUT",
//       credentials: "include",
//       headers,
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Failed to update data" },
//         { status: response.status }
//       );
//     }

//     const result = await response.json();
//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function handleDELETE(apiPath, customHeaders = {}) {
//   try {
//     const response = await fetch(`${BASE_URL}${apiPath}`, {
//       method: "DELETE",
//       credentials: "include",
//       headers: {
//         ...customHeaders,
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return NextResponse.json(
//         { error: "Failed to delete", details: errorText },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Server error", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function handlePATCH(req, apiPath, customHeaders = {}) {
//   try {
//     const body = await req.json();
//     const headers = {
//       "Content-Type": "application/json",
//       ...customHeaders,
//     };

//     const response = await fetch(`${BASE_URL}${apiPath}`, {
//       method: "PATCH",
//       credentials: "include",
//       headers,
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       return NextResponse.json(
//         { error: "Failed to patch data", details: errorText },
//         { status: response.status }
//       );
//     }

//     const result = await response.json();
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("PATCH error:", error);
//     return NextResponse.json(
//       { error: "Server error", details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jewellabel.in";

/* ----------------------------------------------------
 ✅ SERVER: handleGET (used inside app/api routes ONLY)
---------------------------------------------------- */
export async function handleGET(apiPath, customHeaders = {}, queryParams = {}) {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${BASE_URL}${apiPath}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        ...customHeaders,
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ----------------------------------------------------
 ✅ CLIENT VERSION: fetchGET (returns raw JSON)
    Call this INSIDE React like fetchRoles()
---------------------------------------------------- */
export async function fetchGET(api, headers = {}, query = {}) {
  const queryString = new URLSearchParams(query).toString();
  const url = `${api}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, { headers });

  return await res.json(); // ✅ RAW JSON
}

/* ----------------------------------------------------
 ✅ POST / PUT / PATCH / DELETE (same as original)
---------------------------------------------------- */
export async function handlePOST(req, apiPath, customHeaders = {}) {
  const authHeader =
    customHeaders.Authorization || req.headers.get("authorization");

  let body;
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    body = await req.json();
    customHeaders["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${apiPath}`, {
    method: "POST",
    headers: {
      ...customHeaders,
      ...(authHeader && { Authorization: authHeader }),
    },
    body,
  });

  return NextResponse.json(await response.json());
}

export async function handlePUT(req, apiPath, customHeaders = {}) {
  try {
    const body = await req.json();

    const response = await fetch(`${BASE_URL}${apiPath}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function handleDELETE(apiPath, body = null, headers = {}) {
  try {
    const fetchOptions = {
      method: "DELETE",
      credentials: "include",
      headers: {
        ...headers,
        ...(body && { "Content-Type": "application/json" }),
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const res = await fetch(`${BASE_URL}${apiPath}`, fetchOptions);

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Failed to delete", details: errorText },
        { status: res.status }
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

    const res = await fetch(`${BASE_URL}${apiPath}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
