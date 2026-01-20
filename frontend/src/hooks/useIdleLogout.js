import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const IDLE_TIME = 5 * 60 * 1000;

export default function useIdleLogout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const timer = useRef(null);
  const [remainingTime, setRemainingTime] = useState(IDLE_TIME);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);

    setRemainingTime(IDLE_TIME);

    timer.current = setTimeout(async () => {
      await api.post("/auth/logout");
      logout();
      navigate("/login");
    }, IDLE_TIME);
  };

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      setRemainingTime(prev => Math.max(prev - 1000, 0));
    }, 1000);

    const events = ["mousemove", "keydown", "click"];

    events.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearInterval(interval);

      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );

      if (timer.current) clearTimeout(timer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { remainingTime };
}
