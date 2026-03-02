"use client"
import { useState, useRef, useEffect } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { SearchbarWithIcon } from "@/components/searchbarWithIcon";
import { StoreProductCard } from "@/components/storeProductCard";

const demoProducts = [
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
  {
    productImageUrl:
      "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    productName: "Mor Deythan Squad",
    storeImageUrl: "/images/demoimages/legendarywargame.png",
    storeName: "Legendary Wargame",
    price: 2700,
  },
];

const FILTERS = ['Gathering', 'Booked', 'Full', 'In Progress', 'Completed'];

export default function StorePage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleFilter(filter: string) {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  }
  return (
    <section className="px-30">
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
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setFilterOpen(prev => !prev)}
            className={`flex items-center gap-1.5 h-11 px-4 rounded-full border transition-all duration-200 cursor-pointer
                            ${filterOpen || activeFilters.length > 0
                ? 'bg-[#FACC14] border-[#FACC14] text-[#364049]'
                : 'bg-[#F9FAFB] border-[#627384] text-[#627384] hover:border-[#FACC14] hover:text-[#364049]'
              }`}
          >
            <span className="text-sm font-medium">Filter</span>
            {activeFilters.length > 0 && (
              <span className="bg-[#364049] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {activeFilters.length}
              </span>
            )}
            <TuneIcon sx={{ fontSize: 18 }} />
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
              <p className="text-xs text-[#627384] font-semibold uppercase tracking-wider px-4 pb-1">Status</p>
              {FILTERS.map(filter => {
                const isActive = activeFilters.includes(filter);
                return (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                                            ${isActive ? 'text-[#364049] font-semibold' : 'text-[#627384] hover:bg-gray-50'}`}
                  >
                    <span>{filter}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#FACC14]" />
                    )}
                  </button>
                );
              })}
              {activeFilters.length > 0 && (
                <>
                  <div className="border-t border-gray-100 mt-1 mb-1" />
                  <button
                    onClick={() => setActiveFilters([])}
                    className="w-full text-left px-4 py-2 text-xs text-red-400 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    Clear all
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* search */}
        <SearchbarWithIcon style={{ width: 110 }} />
      </div>

      {/* products */}
      <p>Showing 1-10 of (15) results</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 py-3">
        {demoProducts.map((data, index) => (
          <StoreProductCard productId={index} key={index} {...data} />
        ))}
      </div>
    </section>
  );
}
