export const apiGet = async (url, token) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

// export const apiPost = async (url, body) => {
//   const token = localStorage.getItem("token");
//   const storeId = localStorage.getItem("store_id");

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...(storeId && { "X-Tenant-Id": storeId }),
//     },
//     body: JSON.stringify(body),
//   });

//   const result = await response.json();

//   if (!response.ok) {
//     throw result;
//   }

//   return result;
// };

export const apiPost = async (url, body) => {
  const token = localStorage.getItem("authTokenStoreAdmin");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-tenant-id": process.env.NEXT_PUBLIC_TENANT_ID,
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const text = await response.text();

  let result;
  try {
    result = text ? JSON.parse(text) : null;
  } catch {
    result = text;
  }

  if (!response.ok) {
    // always throw an object with message
    throw {
      message:
        (result && result.message) ||
        (typeof result === "string" ? result : null) ||
        "Request failed",
    };
  }

  return result;
};
