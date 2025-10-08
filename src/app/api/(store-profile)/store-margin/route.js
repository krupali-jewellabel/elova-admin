import { handleGET, handlePOST } from "@/lib/apiHandler";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";

    const headers = {
      Authorization: authHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Fetch product pricing list
    const response = await handleGET(
      "api/store-admin/margin/product-pricing-list",
      headers
    );

    // If handleGET returns a Response object, parse JSON
    let data;
    if (response.json) {
      data = await response.json();
    } else {
      data = response;
    }

    // Return JSON response to frontend
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/store-margin error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";

    const headers = {
      Authorization: authHeader,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Parse JSON payload from frontend
    const body = await req.json();

    // Call backend save API
    const response = await handlePOST(
      "api/store-admin/margin/price-configuration",
      { body, headers }
    );

    // If handlePOST returns a Response object, parse JSON
    let data;
    if (response.json) {
      data = await response.json();
    } else {
      data = response;
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /api/store-margin error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
