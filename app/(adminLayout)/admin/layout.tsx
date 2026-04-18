import { AdminSidebar } from "@/components/AdminSidebar";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-full bg-[#EEF2F6]">
      <AdminSidebar />
      <div className="flex-1 ml-80 p-4">{children}</div>
    </div>
  );
}
