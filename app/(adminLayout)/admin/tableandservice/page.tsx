import { MerchantServiceManagement } from "@/components/MerchantServiceManagement";
import { MerchantTableManagement } from "@/components/MerchantTableManagement";
import { getTables } from "@/app/lib/api/merchant/tables";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GetMerchantManyFacility } from "@/app/lib/api/merchant/facility";

export default async function TableandServicePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const tables = await getTables(accessToken.value);
  const facilites = await GetMerchantManyFacility(accessToken.value);
  return (
    <div className="flex flex-col gap-4">
      <MerchantTableManagement tableData={tables.items} />
      <MerchantServiceManagement
        serviceOptions={facilites.items}
        accessToken={accessToken.value}
      />
    </div>
  );
}
