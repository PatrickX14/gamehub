import Image from "next/image";
import { Navigations } from "./AdminNaviations";

export function AdminSidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen  bg-[#F9FAFB] w-80 py-10 z-50 flex-shrink-0">
      <AdminLogo
        imageUrl={"/images/demoimages/morethanagamecafe.png"}
        shopName={"More Than A Game Cafe"}
        role={"Shop"}
      />
      <Navigations />
    </div>
  );
}

interface AdminLogoProps {
  imageUrl: string;
  shopName: string;
  role: string;
}
function AdminLogo({ imageUrl, role, shopName }: AdminLogoProps) {
  return (
    <div className="mb-3">
      <Image
        alt="admin login image"
        className="mx-auto mb-2"
        src={imageUrl}
        width={150}
        height={150}
      />
      <h3 className="text-center font-bold text-xl">{shopName}</h3>
      <p className="text-center">{role}</p>
    </div>
  );
}
