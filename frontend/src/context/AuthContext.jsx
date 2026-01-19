import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
  };

  const register = async (data) => {
    await api.post("/auth/register", data);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
