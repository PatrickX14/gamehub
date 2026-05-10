import { UserHeader } from "@/components/userheader";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <UserHeader />
      <div className="py-6">{children}</div>
    </div>
  );
}
