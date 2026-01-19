import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password
    });
    setUser(res.data.user);
  };

  const register = async (data) => {
    await api.post("/auth/register", data);
  };

  const logout = () => {
    setUser(null);
    // later we’ll clear cookie from backend
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
