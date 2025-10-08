import { ShopPlus } from "@/components/icons/Shop";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TProduct } from "@/types/product/product";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductCardSmall({ product }: { product: TProduct }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="my-6 min-w-46">
      <div className="cursor-pointer">
        <div
          className="relative h-46 w-46"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Image
            src={
              typeof product.imageList?.[0] === "string"
                ? product.imageList?.[0]
                : "ikean.png"
            }
            width={200}
            height={200}
            alt={product.title}
            className={`absolute object-cover transition duration-200 ${hover ? "opacity-100" : "opacity-0"}`}
          />
          <Image
            src={
              typeof product.featureImage === "string"
                ? product.featureImage
                : "ikean.png"
            }
            width={200}
            height={200}
            alt={product.title}
            className="object-cover"
          />
        </div>
        <div className="relative mt-6">
          {product.salePrice && (
            <p className="absolute -top-4 text-xs font-semibold text-red-700">
              Special offers
            </p>
          )}
          <p className="py-2 text-sm font-bold">{product.title}</p>
          <p className="text-[13px]">{product.shortSummary}</p>
          <p className="py-2 text-3xl font-bold">
            <span className="inline-block -translate-y-3 transform text-xs font-bold">
              EGP
            </span>
            {product.salePrice
              ? formatEGP(product.salePrice)
              : formatEGP(product.price)}
          </p>
          {product.salePrice && (
            <p className="text-xs font-semibold">
              Previous price: EGP {formatEGP(product.price)}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <button className="cursor-pointer rounded-full bg-[#0059a7] p-2 text-white hover:bg-[#004f93]">
          <ShopPlus />
        </button>
        <button className="cursor-pointer rounded-full p-2.5 hover:bg-gray-200">
          <Heart size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
