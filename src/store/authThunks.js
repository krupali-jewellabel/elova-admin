import { apiPost } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await apiPost("/api/login", { email, password });

      if (!res.status) {
        return thunkAPI.rejectWithValue(res.error);
      }

      if (res?.data?.token) {
        localStorage.setItem("authTokenStoreAdmin", res?.data?.token);
      }

      return {
        user: res?.data?.user,
        token: res?.data?.token,
        on_boarding_request_status: res?.data?.on_boarding_request_status,
        on_boarding_exists: res?.data?.on_boarding_exists,
        is_plan_purchase: res?.data?.is_plan_purchase,
        store_id: res?.data?.store_id,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      return { customer: data.customer };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("authTokenStoreAdmin");

      if (!token) {
        return thunkAPI.rejectWithValue("No token found, logout failed");
      }

      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Safely parse JSON response
      let data = {};
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { error: "Backend returned non-JSON response", raw: text };
      }

      // Only remove token if logout succeeded
      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.error || "Logout failed");
      }

      localStorage.removeItem("authTokenStoreAdmin");

      return data.message || "Logout successful";
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Logout failed");
    }
  }
);
