import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";
import * as authService from "../../services/auth.service";

export function Login() {
  const navigate = useNavigate();
  const { login: saveLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.login(email, password);

      saveLogin(response.token, response.user);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>TaskForge Playground</h1>
      <h2>Welcome back</h2>

      <form onSubmit={handleSubmit}>
        <Input
          data-testid="login-email-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          data-testid="login-password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && (
          <p data-testid="login-error">
            {error}
          </p>
        )}

        <Button
          data-testid="login-submit-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <hr />

      <p>Demo user: demo@taskforge.dev</p>
      <p>Password: password123</p>
    </main>
  );
}