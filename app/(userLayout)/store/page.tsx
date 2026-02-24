import { SearchbarWithIcon } from "@/components/searchbarWithIcon";
import { StoreProductCard } from "@/components/storeProductCard";

const demoProducts = [
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    gameName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
];

export default function StorePage() {
  return (
    <section className="px-30">
      {/* search and filters */}
      <div className="flex justify-end">
        {/* search */}
        <SearchbarWithIcon style={{ width: 110 }} />
        {/* filter */}
        {/* TODO: add filter */}
      </div>
      <p>Showing 1-10 of (15) results</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 py-3">
        {demoProducts.map((data, index) => (
          <StoreProductCard key={index} {...data} />
        ))}
      </div>
    </section>
  );
}
