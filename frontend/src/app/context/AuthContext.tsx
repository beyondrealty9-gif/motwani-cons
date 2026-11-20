"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  apiBaseUrl: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : "http://localhost:5000/api";

// Helper: fetch with timeout (default 10 seconds)
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Silently wake up the Render backend on app start (prevents cold-start delays on first user action)
if (typeof window !== "undefined") {
  fetchWithTimeout(`${API_BASE_URL}/health`, {}, 15000).catch(() => {
    // Ignore — this is a silent warm-up ping
  });
}

function safeStorageGet(key: string): string | null {
  try {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeStorageSet(key: string, value: string): void {
  try {
    if (typeof window !== "undefined") localStorage.setItem(key, value);
  } catch {}
}

function safeStorageRemove(key: string): void {
  try {
    if (typeof window !== "undefined") localStorage.removeItem(key);
  } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = safeStorageGet("ja-homes-token");
      const savedUser = safeStorageGet("ja-homes-user");

      if (savedToken && savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setToken(savedToken);
          setUser(parsed);
        } catch {
          safeStorageRemove("ja-homes-token");
          safeStorageRemove("ja-homes-user");
        }

        // Verify token with backend
        fetchWithTimeout(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        }, 10000)
          .then((res) => {
            if (!res.ok) {
              logout();
            }
          })
          .catch(() => {
            console.warn("Backend server offline, using local credentials");
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, []);

  function logout() {
    setToken(null);
    setUser(null);
    safeStorageRemove("ja-homes-token");
    safeStorageRemove("ja-homes-user");
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      }, 10000);

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        safeStorageSet("ja-homes-token", data.token);
        safeStorageSet("ja-homes-user", JSON.stringify(data.user));
        return { success: true, message: "Logged in successfully" };
      } else {
        return { success: false, message: data.message || "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login API error:", error);
      // Fallback local authentication for smooth local-only preview if backend is not running
      if (email && password.length >= 6) {
        const dummyUser = {
          id: "usr_local_" + Math.floor(1000 + Math.random() * 9000),
          name: email.split("@")[0].toUpperCase(),
          email: email.toLowerCase()
        };
        const dummyToken = "local_jwt_token_key";
        setToken(dummyToken);
        setUser(dummyUser);
        safeStorageSet("ja-homes-token", dummyToken);
        safeStorageSet("ja-homes-user", JSON.stringify(dummyUser));
        return { success: true, message: "Logged in via local credentials (Backend Offline)" };
      }
      return { success: false, message: "Backend is offline and invalid login credentials provided." };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      }, 10000);

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        safeStorageSet("ja-homes-token", data.token);
        safeStorageSet("ja-homes-user", JSON.stringify(data.user));
        return { success: true, message: "Registered successfully" };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Signup API error:", error);
      // Fallback local signup
      if (name && email && password.length >= 6) {
        const dummyUser = {
          id: "usr_local_" + Math.floor(1000 + Math.random() * 9000),
          name,
          email: email.toLowerCase()
        };
        const dummyToken = "local_jwt_token_key";
        setToken(dummyToken);
        setUser(dummyUser);
        safeStorageSet("ja-homes-token", dummyToken);
        safeStorageSet("ja-homes-user", JSON.stringify(dummyUser));
        return { success: true, message: "Registered via local storage (Backend Offline)" };
      }
      return { success: false, message: "Backend is offline and invalid registration details." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, apiBaseUrl: API_BASE_URL }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
