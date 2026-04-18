import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";

export default function SigninPage() {
  return (
    <div className="flex h-full">
      {/* Images Section */}
      <div className="hidden md:flex md:w-2/3 md:h-full relative overflow-hidden bg-zinc-900  border-white">
        {/* Top Right Image */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%)" }}
        >
          <Image
            src="/images/loginbackground2.jpeg"
            alt="Warhammer Character"
            fill
            className="object-cover"
          />
        </div>

        {/* Middle/Left Image */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
        >
          <Image
            src="/images/loginbackground1.jpg"
            alt="Space Marine vs Tyranid"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom Right Image */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "polygon(0 100%, 100% 50%, 100% 100%)" }}
        >
          <Image
            src="/images/loginbackground3.jpeg"
            alt="Blood Angels Space Marine"
            fill
            className="object-cover"
          />
        </div>

        {/* White gap lines */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="50"
              stroke="white"
              strokeWidth="6"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="0"
              y1="100"
              x2="100"
              y2="50"
              stroke="white"
              strokeWidth="6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Overlay Text */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none text-white p-6">
          <div className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            <h2 className="text-center text-4xl font-bold mb-4">GameHub</h2>
            <p className="text-center text-lg font-medium leading-relaxed">
              GameHub, a platform helps you connect <br />
              with the people who have interest in <br />
              boardgames.
            </p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <LoginForm accountType={"user"} />
    </div>
  );
}
