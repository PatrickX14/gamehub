"use client";
import { FormEvent } from "react";
import { SignupOptionsSelector } from "./signupOptionsSelector";
import { api } from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function UserSignupForm() {
  const router = useRouter();
  async function loginAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await api.post("/auth/register", {
        email: formData.get("email"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        gender: formData.get("gender"),
        phoneNumber: formData.get("phoneNumber"),
      });
      router.replace("/signin");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="md:w-1/3 bg-[#2B2B2B] h-full flex flex-col justify-center px-16">
      <h3 className="text-center text-2xl font-semibold text-[#EEF2F6]">
        Create an account
      </h3>
      <p className="text-center text-[#94A3B8] mb-3">
        Choose your account type to get started
      </p>

      <form className="flex flex-col gap-4 " onSubmit={loginAction}>
        <SignupOptionsSelector selectedOption={"user"} />
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First name"
          required
          className="bg-[#EEF2F6] py-3 px-2 rounded-lg"
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
          className="bg-[#EEF2F6] py-3 px-2 rounded-lg"
        />
        <div className="flex gap-4 justify-between">
          <select
            id="gender"
            name="gender"
            required
            className="bg-[#EEF2F6] py-3 px-2 rounded-lg w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {/* <input
            type="date"
            id="birthday"
            name="birthday"
            required
            className="bg-[#EEF2F6] py-3 px-2 rounded-lg w-full"
          /> */}
        </div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          required
          className="bg-[#EEF2F6] py-3 px-2 rounded-lg"
        />
        <input
          type="tel"
          pattern="[0-9]{10}"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone number"
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
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          required
          className="bg-[#EEF2F6] py-3 px-2 rounded-lg"
        />
        <button className="bg-[#FCCB1D] py-3 rounded-lg" type="submit">
          Sign Up
        </button>
      </form>
      <Link href="/signin" className="text-center text-[#EEF2F6] mt-1">
        Already have an account?
      </Link>
    </div>
  );
}
