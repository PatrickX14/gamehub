import Image from "next/image";
import Link from "next/link";

interface Props {
  productId: number;
  productImageUrl: string;
  productName: string;
  storeImageUrl: string;
  storeName: string;
  price: number;
}

export function StoreProductCard({
  productImageUrl,
  productName,
  price,
  storeImageUrl,
  storeName,
  productId,
}: Props) {
  return (
    <div className="bg-[#F9FAFB] rounded-2xl pt-3 shadow-xl overflow-hidden transition-transform duration-150 ease-in-out hover:-translate-y-2">
      <Link
        href={`/shop/${productId}`}
        // TODO: change link to actual product's id
      >
        <Image
          src={productImageUrl}
          alt={"boardgame product"}
          className="mx-auto"
          width={"230"}
          height={"230"}
        />

        {/* product owner (store) */}
        <div className="px-5 mt-5 mb-2">
          <h3 className="text-2xl font-semibold">{productName}</h3>
          <div className="flex items-center gap-2">
            <Image
              src={storeImageUrl}
              alt={"store logo"}
              width={"40"}
              height={"40"}
            />
            <p className="bg-[#FACC14] rounded-full px-2 text-sm font-light text-[#364049]">
              {storeName}
            </p>
          </div>
        </div>
      </Link>
      {/* price and button */}
      <div className="bg-[#2B2B2B] flex justify-between px-10 py-4">
        <div>
          <p className="text-[#94A3B8]">Price</p>
          <p className="text-[#F9FAFB] text-2xl font-semibold">
            ฿{price.toLocaleString()}
          </p>
        </div>
        <button className="bg-[#FACC14] rounded-md px-3 cursor-pointer text-[#364049]">
          Add to cart
        </button>
      </div>
    </div>
  );
}
