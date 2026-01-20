import { useEffect, useRef } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const IDLE_TIME = 10 * 60 * 1000; // 10 minutes

export default function useIdleLogout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      await api.post("/auth/logout");
      logout();
      navigate("/login");
    }, IDLE_TIME);
  };

  useEffect(() => {
    if (!user) return;

    const events = ["mousemove", "keydown", "click"];

    events.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // start timer

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
      if (timer.current) clearTimeout(timer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
}
