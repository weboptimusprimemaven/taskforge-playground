import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
  const stored = localStorage.getItem("user");

  return stored ? JSON.parse(stored) : null;
});

const [token, setToken] = useState<string | null>(() => {
  return localStorage.getItem("token");
});

  function login(token: string, user: User) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  setToken(token);
  setUser(user);
}

  function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setToken(null);
  setUser(null);
}

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}