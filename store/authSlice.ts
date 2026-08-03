import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ILoginData {
  email: string;
  password: string;
}

interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

interface ISignupData {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface ISignupResponse {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: ISignupResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null,
};

// ====================== Thunks ======================

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

export const signUpFunction = createAsyncThunk(
  "auth/Signup",
  async (userData: ISignupData) => {
    const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const data: ISignupResponse = await response.json();
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
      // ---- Login ----
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
      })
      // ---- Signup ----
      .addCase(signUpFunction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpFunction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpFunction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      });
  },
});

export default authSlice.reducer;