"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Props {
  shopName?: string;
  productName?: string;
}

export function BreadCrumb({ shopName, productName }: Props) {
  const pathName = usePathname();
  const rawSegments = pathName.split("/").filter(Boolean);

  const segments = [...rawSegments];
  if (shopName) {
    segments.splice(1, 0, shopName);
  }
  if (productName) {
    segments.splice(segments.length - 1, 0, productName);
    segments.pop();
  }

  return (
    <nav aria-label="breadcrumb" className="flex items-center space-x-2">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const isShopLink = shopName && index === 1;

        const href = isShopLink
          ? `/store/${shopName.toLowerCase().replace(" ", ".")}`
          : `/${segments.slice(0, index + 1).join("/")}`;

        return (
          <div key={href} className="flex items-center">
            {index !== 0 && (
              <NavigateNextIcon fontSize="small" className="mr-2" />
            )}

            {isLast ? (
              <span className="text-primary">{segment}</span>
            ) : (
              <Link
                href={href}
                className="hover:underline breadCrumbMutedText capitalize"
              >
                {segment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
