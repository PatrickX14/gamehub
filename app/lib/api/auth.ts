import { redirect } from "next/navigation";
import { createLocalStorageItem } from "./utils";

const API_URL = "http://localhost:3000";

export async function login(
  _prevState: { error: string | null },
  formData: FormData,
) {
  const email = formData.get("email");
  const password = formData.get("password");
  const accountType = formData.get("accountType");

  if (accountType !== "USER" && accountType !== "SHOP") {
    return { error: "Invalid account type" };
  }

  const res = await fetch(`${API_URL}/auth/login?role=${accountType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: (data.message as string) || "Login failed" };
  } else {
    await createLocalStorageItem("accessToken", data.accessToken);
  }

  if (data.role === "USER") {
    redirect("/");
  } else if (data.role === "SHOP") {
    redirect("/admin");
  }

  return { error: null };
}

type UserGender = "MALE" | "FEMALE" | "OTHER";

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  lastName?: string;
  gender?: string;
};

type RegisterRole = "USER" | "SHOP";

export async function register(role: RegisterRole, payload: RegisterPayload) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      role,
      lastName: payload.lastName || undefined,
      gender: payload.gender || undefined,
    }),
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    return { error: (data.message as string) || "Registration failed" };
  }

  return { error: null };
}
