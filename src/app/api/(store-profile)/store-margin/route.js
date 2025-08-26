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

// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const action = searchParams.get("action");

//     switch (action) {
//       case "product-pricing-list":
//         // Add your actual logic here
//         const pricingData = await getProductPricingList();
//         return NextResponse.json({
//           success: true,
//           data: pricingData,
//         });

//       case null:
//       case undefined:
//         return NextResponse.json(
//           {
//             error: "Missing required 'action' parameter",
//             availableActions: ["product-pricing-list"],
//           },
//           { status: 400 }
//         );

//       default:
//         return NextResponse.json(
//           {
//             error: "Invalid GET action",
//             received: action,
//             availableActions: ["product-pricing-list"],
//           },
//           { status: 400 }
//         );
//     }
//   } catch (error) {
//     console.error("GET request error:", error);
//     return NextResponse.json(
//       {
//         error: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const action = searchParams.get("action");

//     // Parse body once and reuse
//     let body;
//     try {
//       body = await req.json();
//     } catch (parseError) {
//       return NextResponse.json(
//         {
//           error: "Invalid JSON in request body",
//         },
//         { status: 400 }
//       );
//     }

//     switch (action) {
//       case "price-configuration":
//         // Add validation for required fields
//         if (!body || typeof body !== "object") {
//           return NextResponse.json(
//             {
//               error: "Request body is required",
//             },
//             { status: 400 }
//           );
//         }

//         // Add your actual logic here
//         const configResult = await configurePricing(body);
//         return NextResponse.json({
//           success: true,
//           message: "Price configured successfully",
//           data: configResult,
//         });

//       case "update-product-status":
//         // Add validation for required fields
//         if (!body || !body.productId || !body.status) {
//           return NextResponse.json(
//             {
//               error: "Missing required fields: productId, status",
//             },
//             { status: 400 }
//           );
//         }

//         // Add your actual logic here
//         const updateResult = await updateProductStatus(body);
//         return NextResponse.json({
//           success: true,
//           message: "Product status updated successfully",
//           data: updateResult,
//         });

//       case null:
//       case undefined:
//         return NextResponse.json(
//           {
//             error: "Missing required 'action' parameter",
//             availableActions: ["price-configuration", "update-product-status"],
//           },
//           { status: 400 }
//         );

//       default:
//         return NextResponse.json(
//           {
//             error: "Invalid POST action",
//             received: action,
//             availableActions: ["price-configuration", "update-product-status"],
//           },
//           { status: 400 }
//         );
//     }
//   } catch (error) {
//     console.error("POST request error:", error);
//     return NextResponse.json(
//       {
//         error: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }

// // Example helper functions (implement these with your actual logic)
// async function getProductPricingList() {
//   // Replace with your database query or API call
//   return {
//     products: [
//       { id: 1, name: "Product 1", price: 99.99 },
//       { id: 2, name: "Product 2", price: 149.99 },
//     ],
//   };
// }

// async function configurePricing(data) {
//   // Replace with your actual pricing configuration logic
//   console.log("Configuring pricing with:", data);
//   return { configId: Date.now(), ...data };
// }

// async function updateProductStatus(data) {
//   // Replace with your actual product status update logic
//   console.log("Updating product status:", data);
//   return {
//     productId: data.productId,
//     status: data.status,
//     updatedAt: new Date().toISOString(),
//   };
// }
