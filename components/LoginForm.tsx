"use client";
import { api } from "@/app/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const res = await api.post("/auth/login", {
        email: formData.get("email"),
        password: formData.get("password"),
      });
      console.log(res);
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="md:w-1/3 bg-[#2B2B2B] h-full flex flex-col justify-center px-16">
      <h3 className="text-center text-2xl font-semibold text-[#EEF2F6] mb-3">
        Welcome
      </h3>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          required
          className="bg-[#EEF2F6] py-3 px-2 rounded-lg"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          className="bg-[#EEF2F6] py-3 px-2 rounded-lg"
        />
        <Link
          href="/forgot-password"
          className="text-[#EEF2F6] self-end size-fit"
        >
          Forgot password?
        </Link>
        <button
          className="bg-[#FCCB1D] py-3 rounded-lg hover:cursor-pointer"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <p className="text-center text-[#EEF2F6] mt-1">
        Don&apos;t have an account? <a href="/usersignup">sign up</a>
      </p>
    </div>
  );
}
