import Link from "next/link";

interface Props {
  selectedOption: "user" | "shop";
}

export function SignupOptionsSelector({ selectedOption }: Props) {
  return (
    <div className="flex justify-between gap-4">
      <Link
        href={"/usersignup"}
        className={`py-2 px-2 w-full text-center rounded-lg font-semibold ${selectedOption === "user" ? "bg-[#FCCB1D] text-[#364049]" : "hover:bg-[#FCCB1D]/30 text-[#F9FAFB]"}`}
      >
        User Account
      </Link>
      <Link
        href={"/shopsignup"}
        className={`py-2 px-2 w-full text-center rounded-lg font-semibold ${selectedOption === "shop" ? "bg-[#FCCB1D] text-[#364049]" : "hover:bg-[#FCCB1D]/30 text-[#F9FAFB]"}`}
      >
        Shop Account
      </Link>
    </div>
  );
}
