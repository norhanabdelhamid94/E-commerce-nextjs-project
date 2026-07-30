import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ILoginData {
  email: string;
  password: string;
}

interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// ====================== Thunk ======================

export const loginFunction = createAsyncThunk(
  "auth/login",

  async (userData: ILoginData) => {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: ILoginResponse = await response.json();

    return data;
  }
);

// ====================== Slice ======================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(loginFunction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginFunction.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      })

      .addCase(loginFunction.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message || "Login failed";
      });
  },
});

export default authSlice.reducer;