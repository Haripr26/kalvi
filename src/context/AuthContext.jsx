import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Mock login — replace with real API call
    if (!username || !password) return { ok: false, error: "Please enter username and password." };
    const role = username.toLowerCase().includes("admin")
      ? "admin"
      : username.toLowerCase().includes("pub")
      ? "publisher"
      : "student";
    setUser({ name: username, role });
    return { ok: true, role };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
