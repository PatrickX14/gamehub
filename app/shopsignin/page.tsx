export default function ShopSignInPage() {
  return (
    // min-h-screen ensures the container takes up the full height of the viewport
    <div className="flex min-h-screen w-full items-center justify-center">
      <form className="flex flex-col gap-4 rounded-lg bg-[#2B2B2B] p-8 shadow-xl w-180 h-120 justify-center">
        <h3 className="text-center text-2xl font-semibold text-[#EEF2F6]">
          Sign In Shop Account
        </h3>
        <p className="text-center text-[#94A3B8] mb-3">
          Sign in your shop account
        </p>
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
        <button className="bg-[#FCCB1D] py-3 rounded-lg" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
