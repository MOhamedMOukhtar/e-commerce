import { ShopPlus } from "@/components/icons/Shop";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TProduct } from "@/types/product/product";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCardLarge({
  product,
  commonProducts,
}: {
  product: TProduct;
  commonProducts?: TProduct[];
}) {
  const [hover, setHover] = useState(false);
  const [activeProduct, setActiveProduct] = useState<TProduct>(product);

  if (product.commonID && !product.description) return null;

  return (
    <div className="group after:content-[' '] relative min-w-46 py-15 after:absolute after:bottom-[-1px] after:left-0 after:h-[1px] after:w-[calc(100%+40px)] after:bg-[oklch(0.922_0_0)]">
      <Link href={`/product/${product.slug}-${activeProduct.id}`}>
        <div className="cursor-pointer">
          <div
            className="relative h-full w-full"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {product.imageList && product.imageList.length > 0 && (
              <Image
                src={
                  typeof activeProduct.imageList?.[0] === "string"
                    ? activeProduct.imageList?.[0]
                    : "ikean-logo.png"
                }
                width={200}
                height={200}
                alt={activeProduct.title}
                className={`absolute w-full object-cover transition duration-200 ${hover ? "opacity-100" : "opacity-0"}`}
              />
            )}
            <Image
              src={
                typeof activeProduct.featureImage === "string"
                  ? activeProduct.featureImage
                  : "ikean.png"
              }
              width={200}
              height={200}
              alt={activeProduct.title}
              className="w-full object-cover"
            />
          </div>
          <div className="relative mt-6">
            {activeProduct.salePrice && (
              <p className="absolute -top-4 text-[13px] font-semibold text-red-700">
                Special offers
              </p>
            )}
            <p className={`py-1 text-sm font-bold group-hover:underline`}>
              {product.title}
            </p>
            <p className="text-sm">{product.shortSummary}</p>
            <p className="py-2 text-3xl font-bold">
              <span className="inline-block -translate-y-3 transform text-xs font-bold">
                EGP
              </span>
              {activeProduct.salePrice
                ? formatEGP(activeProduct.salePrice)
                : formatEGP(activeProduct.price)}
            </p>
            {activeProduct.salePrice && (
              <p className="text-xs font-semibold">
                Previous price: EGP {formatEGP(activeProduct.price)}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-center gap-5">
        <button className="cursor-pointer rounded-full bg-[#0059a7] p-2 text-white hover:bg-[#004f93]">
          <ShopPlus />
        </button>
        <button className="cursor-pointer rounded-full p-2.5 hover:bg-gray-200">
          <Heart size={18} strokeWidth={3} />
        </button>
      </div>
      {product.commonID && (
        <div>
          <p className="my-2 text-xs">More options</p>
          <div className="flex gap-2">
            <Image
              src={
                typeof product.featureImage === "string"
                  ? product.featureImage
                  : "ikean.png"
              }
              width={40}
              height={40}
              alt={product.title}
              className={`cursor-pointer border-b-3 pb-2 transition duration-100 ${activeProduct.id === product.id ? "border-black/70" : "border-transparent hover:border-black/25"}`}
              onClick={() => setActiveProduct(product)}
            />
            {commonProducts &&
              commonProducts
                .filter(
                  (pro) =>
                    pro.commonID === product.commonID && pro.id !== product.id,
                ) // exclude current product
                .map((pro) => (
                  <Image
                    key={pro.id}
                    src={
                      typeof pro.featureImage === "string"
                        ? pro.featureImage
                        : "ikean.png"
                    }
                    width={40}
                    height={40}
                    alt={pro.title}
                    className={`cursor-pointer border-b-3 pb-1 transition duration-100 ${activeProduct.id === pro.id ? "border-black/70" : "border-transparent hover:border-black/25"}`}
                    onClick={() => setActiveProduct(pro)}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
