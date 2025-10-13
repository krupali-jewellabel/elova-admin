import { handleGET, handlePOST } from "@/lib/apiHandler";

// Fetch Departments
export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  return handleGET("/api/store-admin/department/list", headers, {});
}

//  Create or Update Department
export async function POST(req) {
  const authHeader = req.headers.get("authorization");

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    "x-tenant-id": 5,
    Accept: "application/json",
  };

  // ❗ handlePOST automatically extracts body from req
  return handlePOST(req, "/api/store-admin/department/store-update", headers);
}

// import { handleGET, handlePOST } from "@/lib/apiHandler";

// // 🟢 Fetch Departments
// export async function GET(req) {
//   const authHeader = req.headers.get("authorization");

//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": 5,
//     Accept: "application/json",
//   };

//   return handleGET("/api/store-admin/department/list", headers);
// }

// // 🟢 Add / Update Department
// export async function POST(req) {
//   const authHeader = req.headers.get("authorization");
//   const headers = {
//     Authorization: authHeader,
//     "Content-Type": "application/json",
//     "x-tenant-id": 5,
//     Accept: "application/json",
//   };

//   // id included if editing, otherwise new
//   return handlePOST(req, "/api/store-admin/department/store-update", headers);
// }
