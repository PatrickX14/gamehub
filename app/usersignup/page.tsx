import { UserSignupForm } from "@/components/UserSignupForm";
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
      <UserSignupForm />
    </div>
  );
}
