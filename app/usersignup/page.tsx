import { UserSignupForm } from "@/components/UserSignupForm";
import Link from "next/link";

export default async function UserSigninPage() {
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
        <UserSignupForm />

        <Link href="/signin" className="text-center text-[#EEF2F6] mt-1">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
