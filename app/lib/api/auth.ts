import { redirect } from "next/navigation";
import { createLocalStorageItem } from "./utils";

const API_URL = "http://localhost:3000";

export async function login(
  _prevState: { error: string | null },
  formData: FormData,
) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.message || "Login failed" };
  } else {
    await createLocalStorageItem("accessToken", data.accessToken);
    redirect("/");
  }
}
