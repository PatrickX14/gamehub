"use client";
import { SearchbarWithIcon } from "./searchbarWithIcon";
import { ShopProductFilter } from "./ShopProductFilter";
import { Category, ProductData } from "@/app/lib/api/users/products";
import { StoreProductCard } from "./storeProductCard";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { debounce } from "@/app/lib/debounce";

type UserShopProps = {
  productData: ProductData[];
  categoriesData: Category[];
};

export function UserShop({ productData, categoriesData }: UserShopProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  // function handleOnEnterSearch(query: string) {
  //   if (query !== "") {
  //     params.set("q", query);
  //   } else {
  //     params.delete("q");
  //   }
  //   router.push(`${pathname}?${params.toString()}`);
  // }

  const debounchedSearch = debounce((query: string) => {
    if (query !== "") {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  function handleOnFilterSelect(options: number[]) {
    const categoryFilter: string = options.join(",");
    if (categoryFilter === "") {
      params.delete("category");
    } else {
      params.set("category", categoryFilter);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="px-30">
      {/* Header */}
      <section className="mb-6">
        <h1 className="text-[#364049] text-center font-bold text-4xl">
          Board Game Shop
        </h1>
        <p className="text-[#627384] text-center">
          Find your favorite board games and own them{" "}
          <br className="hidden lg:block" />
        </p>
      </section>
      {/* search and filters */}
      <div className="flex justify-end items-center gap-3">
        {/* filter */}
        <ShopProductFilter
          categories={categoriesData}
          onSelect={handleOnFilterSelect}
        />
        {/* search */}
        <SearchbarWithIcon style={{ width: 110 }} onSearch={debounchedSearch} />
      </div>

      {/* Products */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 py-3">
        {!productData || productData.length > 0
          ? productData?.map(({ id, images, price, merchantName, name }) => (
              <StoreProductCard
                productId={id}
                key={id}
                productImageUrl={images[0]}
                productName={name}
                storeImageUrl={"/images/demoimages/legendarywargame.png"}
                storeName={merchantName}
                price={+price}
              />
            ))
          : null}
      </div>
    </section>
  );
}
