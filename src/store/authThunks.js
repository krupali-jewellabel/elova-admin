import { apiPost } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await apiPost("/api/login", { email, password });

      if (!res.status) {
        return thunkAPI.rejectWithValue(res.error);
      }

      const token = res?.data?.token;

      if (token) {
        localStorage.setItem("authTokenStoreAdmin", token);
        document.cookie = `token=${token}; path=/; secure; SameSite=Strict;`;
      }

      if (res?.data?.on_boarding_exists !== undefined) {
        document.cookie = `on_boarding_exists=${res.data.on_boarding_exists}; path=/; secure; SameSite=Strict;`;
      }

      // Persist in localStorage
      localStorage.setItem("auth", JSON.stringify(res.data));

      return {
        user: res?.data?.user,
        token,
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

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/store-admin/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Logout failed");

      localStorage.removeItem("authTokenStoreAdmin");
      localStorage.removeItem("auth");

      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=Strict;";
      document.cookie =
        "on_boarding_exists=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=Strict;";

      toast.success("Logout successful");

      return true;
    } catch (err) {
      toast.error("Logout failed");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
