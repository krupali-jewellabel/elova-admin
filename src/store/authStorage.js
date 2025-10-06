// export const loadAuthState = () => {
//   try {
//     const serialized = localStorage.getItem("auth");
//     if (serialized === null) return undefined;
//     return JSON.parse(serialized);
//   } catch (e) {
//     console.error("Error loading auth state:", e);
//     return undefined;
//   }
// };

import localStorage from "redux-persist/es/storage";

// export const saveAuthState = (state) => {
//   try {
//     localStorage.setItem("auth", JSON.stringify(state));
//   } catch (e) {
//     console.error("Error saving auth state:", e);
//   }
// };

export const loadAuthState = () => {
  try {
    // Try to load from localStorage first
    const serialized = localStorage.getItem("auth");
    if (serialized !== null) {
      return JSON.parse(serialized);
    }

    // ✅ If no localStorage, fallback to cookie (for SSR or refresh)
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    const token = match ? match[2] : null;
    if (token) {
      return { token };
    }

    return undefined;
  } catch (e) {
    console.error("Error loading auth state:", e);
    return undefined;
  }
};

export const saveAuthState = (state) => {
  try {
    localStorage.setItem("auth", JSON.stringify(state));

    // ✅ Keep cookie in sync with Redux
    if (state?.token) {
      document.cookie = `token=${state.token}; path=/; secure; SameSite=Strict;`;
    } else {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  } catch (e) {
    console.error("Error saving auth state:", e);
  }
};
