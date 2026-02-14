import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const LogContext = createContext();

// 🔹 Backend base URL
const BASE_URL = "https://focus-habit-tracker-d0ml.onrender.com";

export const LogProvider = ({ children }) => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/log`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorData = await res.json();
        return console.error("Fetch Logs Error:", errorData);
      }
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error("Fetch Logs Error:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const addLog = async (log) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityName: log.activity,
          category: log.category,
          duration: Number(log.duration),
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        return console.error("Add Log Error:", errData);
      }
      const savedLog = await res.json();
      setLogs((prev) => [savedLog, ...prev]);
    } catch (err) {
      console.error("Add Log Error:", err);
    }
  };

  const deleteLog = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/log/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errData = await res.json();
        return console.error("Delete Log Error:", errData);
      }
      setLogs((prev) => prev.filter((log) => log._id !== id));
    } catch (err) {
      console.error("Delete Log Error:", err);
    }
  };

  return (
    <LogContext.Provider value={{ logs, addLog, deleteLog }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => useContext(LogContext);
