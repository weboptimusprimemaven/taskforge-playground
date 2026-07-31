export interface AuthResponse {
  token: string;
  user: {
    email: string;
  };
}

const FAKE_DELAY_MS = 500;

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));

  if (
    email === "demo@taskforge.dev" &&
    password === "password123"
  ) {
    return {
      token: "fake-jwt-token",
      user: { email },
    };
  }

  throw new Error("Invalid email or password");
}