"use client";

import Image from "next/image";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ChevronRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { getProduct } from "@/lib/firestore/products/read_server";
import { TProduct } from "@/types/product/product";

interface TTooltip {
  side: "top" | "right" | "bottom" | "left" | undefined;
  align: "center" | "start" | "end" | undefined;
  className: string;
  name: string;
  summery: string;
  price: string;
  previousPrice?: string;
  show?: boolean;
  highlight?: boolean;
  id: string;
}

export default function IndicatorTooltip({
  image,
  props,
}: {
  image: string;
  props?: TTooltip[];
}) {
  const initialTooltip = props?.find((item) => item.show)?.summery || null;
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(
    initialTooltip,
  );
  const [hideAll, setHideAll] = React.useState<boolean>(false);

  const router = useRouter();

  async function handlePush(id: string) {
    const product = (await getProduct({ id })) as TProduct;

    router.push(`/product/${product?.slug}-${product?.id}`);
  }

  return (
    <div
      onMouseLeave={() => {
        setActiveTooltip(initialTooltip);
      }}
      onClick={() => setHideAll(!hideAll)}
    >
      <Image
        src={image}
        fill
        alt="special offers"
        className="object-cover"
        sizes="100%"
      />
      {hideAll ? null : (
        <TooltipProvider delayDuration={0}>
          {props?.map((item: TTooltip, index) => (
            <TooltipComp
              key={index}
              item={item}
              isActive={activeTooltip === item.summery}
              onActivate={() => setActiveTooltip(item.summery)}
              onDeactivate={() => {
                if (activeTooltip === item.summery) {
                  setActiveTooltip(null);
                }
              }}
              handlePush={handlePush}
            />
          ))}
        </TooltipProvider>
      )}
    </div>
  );
}

function TooltipComp({
  item,
  isActive,
  onActivate,
  onDeactivate,
  handlePush,
}: {
  item: TTooltip;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  handlePush: (id: string) => void;
}) {
  return (
    <Tooltip open={isActive}>
      <TooltipTrigger
        className={cn(
          `absolute flex h-12 w-12 items-center justify-center rounded-full`,
          item.className,
        )}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onClick={(e) => {
          e.stopPropagation();
          handlePush(item.id);
        }}
      >
        <Indicator isActive={isActive} />
      </TooltipTrigger>
      <TooltipContent
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        className="group flex cursor-pointer items-center justify-between rounded-none border border-black/10 bg-white text-xs text-black"
        hideArrow={true}
        sideOffset={0}
        avoidCollisions={false}
        side={item.side}
        align={item.align}
        onClick={(e) => {
          e.stopPropagation();
          handlePush(item.id);
        }}
      >
        <div className="max-w-38 space-y-1 border-r p-4">
          {item.previousPrice && (
            <p className="font-bold text-red-500">Special offers</p>
          )}
          <p className="font-bold">{item.name || "Product title"}</p>
          <p className="-mt-0.5">{item.summery || "Product summery"}</p>
          <p
            className={`relative ${item.highlight ? "mt-2 w-fit bg-amber-300 px-3 py-1 pl-7 shadow-[2px_2px_0_#cc0008] before:left-1" : "pl-6 before:left-0"} text-2xl font-bold before:absolute before:top-1 before:text-xs before:content-['EGP']`}
          >
            {item.price || "Product price"}
          </p>

          {item.previousPrice && (
            <>
              <p className="-mb-[2px]">Previous price:</p>
              <p>EGP {item.previousPrice}</p>
            </>
          )}
        </div>
        <ChevronRight
          size={24}
          className="block w-6 text-black/40 group-hover:text-black/60"
        />
      </TooltipContent>
    </Tooltip>
  );
}

function Indicator({
  className = "",
  isActive,
}: {
  className?: string;
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        `absolute inline-block h-7 w-7 cursor-pointer rounded-full border ${isActive ? "before:scale-70" : "before:scale-100"} border-white ${isActive ? "bg-black/50" : "bg-black/25"} transition duration-200 before:absolute before:top-[50%] before:left-[50%] before:h-3 before:w-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-all before:duration-200 before:content-[''] hover:bg-black/50 hover:before:scale-70`,
        className,
      )}
    ></div>
  );
}
