import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../online/socket";
import ForceLogoutToast from "../ui/ForceLogoutToast";
import { API_URL } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forcedMessage, setForcedMessage] = useState(null);

  /* ---------- Check session on load ---------- */

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => {
        const safeUser = {
          ...data.user,
          coins: Number.isFinite(data.user.coins) ? data.user.coins : 0
        };
        setUser(safeUser);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ---------- Cross-tab forced logout ---------- */

  useEffect(() => {
    function onStorage(e) {
      if (e.key === "foopy-force-logout") {
        socket.disconnect();
        setUser(null);

        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ---------- Socket lifecycle ---------- */

  useEffect(() => {
    if (user && !socket.connected) socket.connect();
    if (!user && socket.connected) socket.disconnect();
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log("AUTH COINS:", user.coins);
    }
  }, [user]);

  /* ---------- Forced logout from server ---------- */

  useEffect(() => {
    const onForceLogout = ({ reason }) => {
      localStorage.setItem(
        "foopy-force-logout",
        JSON.stringify({ reason, at: Date.now() })
      );
      localStorage.removeItem("foopy-force-logout");

      setForcedMessage(reason || "Your account was used on another device.");
      socket.disconnect();

      fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      }).finally(() => {
        setUser(null);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1800);
      });
    };

    socket.on("force-logout", onForceLogout);
    return () => socket.off("force-logout", onForceLogout);
  }, []);

  /* ---------- Auth actions ---------- */

  async function login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error("Login failed");

    // 🔑 DO NOT trust login payload
    // 🔑 Always rehydrate from /auth/me
    await refreshUser();
  }

  async function register(username, password, email) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password, email })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Register failed");
    }

    const data = await res.json();
    setUser({
      ...data.user,
      coins: 0
    });
  }

  async function logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });

    socket.disconnect();
    setUser(null);
  }

  /* ---------- Coin updater (KEY FIX) ---------- */

  function updateCoins(newCoins) {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        coins: Number.isFinite(newCoins) ? newCoins : prev.coins
      };
    });
  }

  /* ---------- Provider ---------- */

  async function refreshUser() {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: "include"
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          loading,
          login,
          register,
          logout,
          updateCoins,
          refreshUser
        }}
      >
        {children}
      </AuthContext.Provider>

      <ForceLogoutToast message={forcedMessage} />
    </>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
