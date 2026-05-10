"use client";
import { SignupOptionsSelector } from "./signupOptionsSelector";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register, RegisterPayload } from "@/app/lib/api/auth";

export function UserSignupForm() {
  const router = useRouter();
  async function onSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const emailField = formData.get("email");
    const nameField = formData.get("name");
    const lastNameField = formData.get("lastName");
    const phoneNumberField = formData.get("phoneNumber");
    const passwordField = formData.get("password");
    const genderField = formData.get("gender");
    if (!passwordField || typeof passwordField != "string") return;
    const payload: RegisterPayload = {
      email: typeof emailField === "string" ? emailField : "",
      name: typeof nameField === "string" ? nameField : "",
      lastName: typeof lastNameField === "string" ? lastNameField : "",
      phoneNumber: typeof phoneNumberField === "string" ? phoneNumberField : "",
      password: passwordField,
      gender: typeof genderField === "string" ? genderField : "",
    };
    const res = await register("USER", payload);

    if (!res.error) {
      router.replace("/login");
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

      <form className="flex flex-col gap-4 " onSubmit={onSubmit}>
        <SignupOptionsSelector selectedOption={"user"} />
        <input
          type="text"
          id="name"
          name="name"
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
      <Link href="/usersignin" className="text-center text-[#EEF2F6] mt-1">
        Already have an account?
      </Link>
    </div>
  );
}
