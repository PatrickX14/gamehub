"use client";
const API_URL = process.env.API_URL ?? "http://localhost:3000";

export async function refreshToken<T>(callback: () => Promise<T>) {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    localStorage.removeItem("accessToken");
    throw new Error("Failed to refresh token");
  }

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);
  return callback();
}

// NOTE: local storage utils
export async function createLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export async function getLocalStorageItem(key: string): Promise<string | null> {
  return localStorage.getItem(key);
}

export async function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}

export function redirectToLogin() {
  window.location.href = "/login";
}
