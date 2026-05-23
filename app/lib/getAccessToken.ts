"use client";

import { getLocalStorageItem } from "./api/utils";

export async function getAccessToken(callback: (accessToken: string) => void) {
  const accessToken = await getLocalStorageItem("accessToken");
  if (!accessToken) {
    // If no access token, redirect to login or handle accordingly
    console.error("No access token found. Please log in.");
    return null;
  } else {
    callback(accessToken);
  }
}
