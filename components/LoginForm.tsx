"use client";
import Link from "next/link";
import { SignInOptionsSelector } from "./SignInOptionSelector";
import { login } from "@/app/lib/api/auth";
import { useActionState } from "react";

interface props {
  accountType: "user" | "shop";
}

export function LoginForm({ accountType }: props) {
  const [state, formAction] = useActionState(login, {
    error: null,
  });
  return (
    <div className="md:w-1/3 bg-[#2B2B2B] h-full flex flex-col justify-center px-16">
      <h3 className="text-center text-2xl font-semibold text-[#EEF2F6] mb-3">
        Welcome
      </h3>
      <form className="flex flex-col gap-4" action={formAction}>
        <SignInOptionsSelector selectedOption={accountType} />
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
        <p className="text-sm text-center text-red-500">{state.error}</p>
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
      <p className="text-center text-gray-300 text-[#EEF2F6] mt-1">
        Don&apos;t have an account?{" "}
        <Link href="/usersignup" className="text-white underline">
          sign up
        </Link>
      </p>
    </div>
  );
}
