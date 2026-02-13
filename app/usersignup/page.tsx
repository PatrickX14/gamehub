import { SignupOptionsSelector } from "@/components/signupOptionsSelector";
import Link from "next/link";

export default function UserSigninPage() {
  return (
    <div className="flex h-full">
      {/* Images */}
      <div className="hidden md:w-2/3 md:h-full md:flex flex-col justify-center items-center">
        <div className="self-center z-20">
          <h2 className="text-center text-3xl font-bold">GameHub</h2>
          <p className="text-center text-lg">
            GameHub, a platform helps you connect <br />
            with the people who have interest in <br />
            boardgames.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="md:w-1/3 bg-[#2B2B2B] h-full flex flex-col justify-center px-16">
        <h3 className="text-center text-2xl font-semibold text-[#EEF2F6]">
          Create an account
        </h3>
        <p className="text-center text-[#94A3B8] mb-3">
          Choose your account type to get started
        </p>
        <form className="flex flex-col gap-4 ">
          <SignupOptionsSelector selectedOption={"user"} />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full name"
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
              <option value="prefer_not_say">Prefer not to say</option>
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

        <Link href="/signin" className="text-center text-[#EEF2F6] mt-1">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
