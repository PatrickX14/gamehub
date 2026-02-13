import { UserHeader } from "@/components/userheader";
import { ReactNode } from "react";

export default function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <UserHeader />
      <div className="py-6">{children}</div>
    </div>
  );
}
