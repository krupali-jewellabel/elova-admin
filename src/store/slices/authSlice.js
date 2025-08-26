import { apiPost } from "@/services/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await apiPost("/api/login", {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Thunk for signup
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    on_boarding_request_status: null,
    on_boarding_exists: false,
    business_needs_exists: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const {
          user,
          token,
          on_boarding_request_status,
          on_boarding_exists,
          business_needs_exists,
        } = action.payload;
        state.isLoading = false;
        state.user = user;
        state.token = token;
        state.on_boarding_request_status = on_boarding_request_status;
        state.on_boarding_exists = on_boarding_exists;
        state.business_needs_exists = business_needs_exists;

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("user", JSON.stringify(user ?? null));
            localStorage.setItem("token", token ?? "");
          } catch (e) {
            console.error("Failed to save auth state to localStorage", e);
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
