"use client";

import { getProduct } from "@/lib/firestore/products/read_server";
import { formatEGP } from "@/lib/helper/formatMoney";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product/product";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TItem {
  id: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  offset?: number;
  className?: string;
  active?: boolean;
  name?: string;
  summery?: string;
  price?: string;
  previousPrice?: string;
  highlight?: boolean;
}

export function PopupInfo({
  img,
  props,
  href,
}: {
  img: string;
  props?: TItem[];
  href?: string;
}) {
  const [hideAll, setHideAll] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [initialId] = props
    ?.filter((item) => item.active)
    .map((item) => item.id) || [null];

  if (href) {
    return (
      <Link href={href} className="relative">
        <Image
          src={img}
          fill
          alt="special offers"
          className="object-cover"
          sizes="100%"
        />
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseLeave={() => {
        setActiveId(initialId); // or set to some default ID if you want
      }}
      onClick={() => setHideAll(!hideAll)}
    >
      <Image
        src={img}
        fill
        alt="special offers"
        className={`object-cover ${props ? "cursor-pointer" : "cursor-defult"}`}
        sizes="100%"
      />
      {props && !hideAll
        ? props.map((item, index) => (
            <Indicator
              key={index}
              item={item}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))
        : null}
    </div>
  );
}

interface IndicatorProps {
  item: TItem;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

export function Indicator({ item, activeId, setActiveId }: IndicatorProps) {
  const [isHover, setIsHover] = useState(false);
  const [product, setProduct] = useState<TProduct | null>(null);
  const {
    side,
    align,
    className,
    name,
    summery,
    price,
    previousPrice,
    offset = 10,
    active,
    id,
    highlight,
  } = item;

  const isActive = activeId === id;

  useEffect(() => {
    async function fetchProduct() {
      const product = (await getProduct({ id })) as TProduct;
      setProduct(product);
    }

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (active && id) {
      setActiveId(id);
    }
  }, [active, id, setActiveId]);

  let position = "";
  if (side === "top" && align === "center")
    position = `bottom-full right-1/2 translate-x-1/2`;
  if (side === "top" && align === "start") position = `bottom-full left-0`;
  if (side === "top" && align === "end") position = `bottom-full right-0`;
  if (side === "right" && align === "center")
    position = `left-full top-1/2 -translate-y-1/2`;
  if (side === "right" && align === "start") position = `left-full top-0`;
  if (side === "right" && align === "end") position = `left-full bottom-0`;
  if (side === "bottom" && align === "center")
    position = `top-full right-1/2 translate-x-1/2`;
  if (side === "bottom" && align === "start") position = `top-full left-0`;
  if (side === "bottom" && align === "end") position = `top-full right-0`;
  if (side === "left" && align === "center")
    position = `right-full top-1/2 -translate-y-1/2`;
  if (side === "left" && align === "start") position = `right-full top-0`;
  if (side === "left" && align === "end") position = `right-full bottom-0`;

  const translateOut =
    side === "top"
      ? "translate-y-1"
      : side === "bottom"
        ? "-translate-y-1"
        : side === "left"
          ? "translate-x-1"
          : "-translate-x-1";

  const translateIn =
    side === "top" || side === "bottom" ? "translate-y-0" : "translate-x-0";

  return (
    <Link href={`/product/${product?.slug}-${product?.id}`}>
      <div
        onMouseEnter={() => {
          setIsHover(true);
          setActiveId(null);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        className={cn(
          `absolute h-7 w-7 cursor-pointer rounded-full border ${
            isHover || isActive ? "before:scale-70" : "before:scale-100"
          } border-white ${
            isHover || isActive ? "bg-black/50" : "bg-black/25"
          } transition duration-200 before:absolute before:top-[50%] before:left-[50%] before:h-3 before:w-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-all before:duration-200 before:content-[''] after:absolute after:inset-[-10px] after:rounded-full after:content-[''] hover:bg-black/50 hover:before:scale-70`,
          className,
        )}
      >
        <div
          className={`absolute items-center justify-between ${position} group flex cursor-pointer border border-black/10 bg-white text-xs text-black transition duration-200 ease-out ${
            isHover || isActive
              ? `z-10 opacity-100 ${translateIn}`
              : `-z-10 opacity-0 ${translateOut}`
          } `}
          style={
            side === "top"
              ? { marginBottom: offset }
              : side === "bottom"
                ? { marginTop: offset }
                : side === "left"
                  ? { marginRight: offset }
                  : { marginLeft: offset }
          }
        >
          <div className="min-w-35 basis-1 space-y-1 border-r p-4 text-start">
            {previousPrice && (
              <p className="font-bold text-red-500">Special offers</p>
            )}
            <p className="font-bold">{name || "Product title"}</p>
            <p className="-mt-0.5">{summery || "Product summery"}</p>
            <p
              className={`relative ${highlight ? "mt-2 w-fit bg-amber-300 px-3 py-1 pl-7 shadow-[2px_2px_0_#cc0008] before:left-1" : "pl-6 before:left-0"} text-2xl font-bold before:absolute before:top-1 before:text-xs before:content-['EGP']`}
            >
              {price ? formatEGP(+price) : "Product price"}
            </p>

            {previousPrice && (
              <>
                <p className="-mb-[2px] text-nowrap">Previous price:</p>
                <p>EGP {formatEGP(+previousPrice)}</p>
              </>
            )}
          </div>
          <ChevronRight
            size={24}
            className="block w-10 basis-6 text-black/40 group-hover:text-black/60"
          />
        </div>
      </div>
    </Link>
  );
}
