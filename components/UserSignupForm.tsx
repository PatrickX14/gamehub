"use client";
import { FormEvent } from "react";
import { SignupOptionsSelector } from "./signupOptionsSelector";
import { api } from "@/app/lib/axios";

export function UserSignupForm() {
  async function loginAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const res = await api.post("/auth/register", {
        email: formData.get("email"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      });
      console.log("Register Success: ", res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
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
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          id="birthday"
          name="birthday"
          required
          className="bg-[#EEF2F6] py-3 px-2 rounded-lg w-full"
        />
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
  );
}
