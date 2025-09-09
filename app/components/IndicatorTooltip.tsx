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

interface TTooltip {
  side: "top" | "right" | "bottom" | "left" | undefined;
  align: "center" | "start" | "end" | undefined;
  className: string;
  name: string;
  summery: string;
  price: string;
  previousPrice?: string;
  show?: boolean;
}

export default function IndicatorTooltip({
  image,
  props,
}: {
  image: string;
  props?: TTooltip[];
}) {
  const initialTooltip = props?.find((item) => item.show)?.name || null;
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(
    initialTooltip,
  );
  const [hideAll, setHideAll] = React.useState<boolean>(false);

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
        <TooltipProvider>
          {props?.map((item: TTooltip, index) => (
            <TooltipComp
              key={index}
              item={item}
              isActive={activeTooltip === item.name}
              onActivate={() => setActiveTooltip(item.name)}
              onDeactivate={() => {
                // Only deactivate if this is the currently active tooltip
                if (activeTooltip === item.name) {
                  setActiveTooltip(null);
                }
              }}
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
}: {
  item: TTooltip;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
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
      >
        <Indicator isActive={isActive} />
      </TooltipTrigger>
      <TooltipContent
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        className="group flex cursor-pointer items-center justify-between rounded-none border border-black/10 bg-white text-xs text-black"
        hideArrow={true}
        sideOffset={0}
        side={item.side}
        align={item.align}
      >
        <div className="max-w-38 space-y-1 border-r p-4">
          {item.previousPrice && (
            <p className="font-bold text-red-500">Special offers</p>
          )}
          <p className="font-bold">{item.name || "Product title"}</p>
          <p className="-mt-0.5">{item.summery || "Product summery"}</p>
          <p
            className={`relative pl-6 text-2xl font-bold before:absolute before:top-1 before:left-0 before:text-xs before:content-['EGP']`}
          >
            {item.price || "Product price"}
          </p>

          {item.previousPrice && (
            <>
              <p>Previous price:</p>
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

// "use client";

// import Image from "next/image";
// import {
//   TooltipProvider,
//   Tooltip,
//   TooltipTrigger,
//   TooltipContent,
// } from "@/components/ui/tooltip";
// import { ChevronRight } from "lucide-react";
// import React from "react";
// import { cn } from "@/lib/utils";

// interface TTooltip {
//   side: "top" | "right" | "bottom" | "left" | undefined;
//   align: "center" | "start" | "end" | undefined;
//   className: string;
//   name: string;
//   summery: string;
//   price: string;
//   previousPrice?: string;
//   show?: boolean | undefined;
// }

// export default function IndicatorTooltip({
//   image,
//   props,
// }: {
//   image: string;
//   props: TTooltip[];
// }) {
//   const [open, setOpen] = React.useState<boolean>(false);
//   const [hide, setHide] = React.useState<boolean>(false);
//   const [items, setItems] = React.useState<TTooltip[]>(props);

//   let result: TTooltip[] = [];

//   function handleHideRestTooltip(name: string) {
//     result = props.map((item: TTooltip) => {
//       if (item.name === name) {
//         return { ...item, show: true };
//       } else {
//         return { ...item, show: false };
//       }
//     });
//     setItems(result);
//   }

//   function reset() {
//     setItems(props);
//   }

//   return (
//     <div
//       onMouseLeave={() => {
//         setOpen(true);
//         reset();
//       }}
//       onClick={() => setHide(!hide)}
//     >
//       <Image
//         src={image}
//         fill
//         alt="special offers"
//         className="object-cover"
//         sizes="100%"
//       />
//       {items.map((item: TTooltip, index) => (
//         <TooltipComp
//           key={index}
//           item={item}
//           open={open}
//           hide={hide}
//           handleHideRestTooltip={handleHideRestTooltip}
//         />
//       ))}
//     </div>
//   );
// }

// function TooltipComp({
//   item,
//   open,
//   hide,
//   handleHideRestTooltip,
// }: {
//   item: TTooltip;
//   hide: boolean;
//   open: boolean | undefined;
//   handleHideRestTooltip: (name: string) => void;
// }) {
//   const [hover, setHover] = React.useState<boolean>(false);
//   const [show, setShow] = React.useState<boolean | undefined>(item.show);

//   React.useEffect(() => {
//     if (open && item.show) {
//       setShow(true);
//     }
//   }, [open, item]);

//   if (hide) {
//     return null;
//   }

//   return (
//     <TooltipProvider>
//       <Tooltip open={show ? true : undefined}>
//         <TooltipTrigger
//           className={cn(
//             `absolute flex h-12 w-12 items-center justify-center rounded-full`,
//             item.className,
//           )}
//           onMouseLeave={() => {
//             setShow(false);
//             setHover(false);
//           }}
//           onMouseEnter={() => {
//             setShow(true);
//             setHover(true);
//             handleHideRestTooltip(item.name);
//           }}
//         >
//           <Indicator open={show} hover={hover} />
//         </TooltipTrigger>
//         <TooltipContent
//           onMouseEnter={() => {
//             setHover(true);
//           }}
//           onMouseLeave={() => {
//             setHover(false);
//           }}
//           className="group flex cursor-pointer items-center justify-between rounded-none border border-black/10 bg-white text-xs text-black"
//           hideArrow={true}
//           sideOffset={0}
//           side={item.side}
//           align={item.align}
//         >
//           <div className="max-w-38 space-y-1 border-r p-4">
//             {item.previousPrice && (
//               <p className="font-bold text-red-500">Special offers</p>
//             )}
//             <p className="font-bold">{item.name || "Product title"}</p>
//             <p className="-mt-0.5">{item.summery || "Product summery"}</p>
//             <p
//               className={`relative pl-6 text-2xl font-bold before:absolute before:top-1 before:left-0 before:text-xs before:content-['EGP']`}
//             >
//               {item.price || "Product price"}
//             </p>

//             {item.previousPrice && (
//               <>
//                 <p>Previous price:</p>
//                 <p>EGP {item.previousPrice}</p>
//               </>
//             )}
//           </div>
//           <ChevronRight
//             size={24}
//             className="block w-6 text-black/40 group-hover:text-black/60"
//           />
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }

// function Indicator({
//   className = "",
//   open,
//   hover,
// }: {
//   className?: string;
//   hover: boolean;
//   open: boolean | undefined;
// }) {
//   return (
//     <div
//       className={cn(
//         `absolute inline-block h-7 w-7 cursor-pointer rounded-full border ${open || hover ? "before:scale-70" : "before:scale-100"} border-white ${open || hover ? "bg-black/50" : "bg-black/25"} transition duration-200 before:absolute before:top-[50%] before:left-[50%] before:h-3 before:w-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:transition-all before:duration-200 before:content-[''] hover:bg-black/50 hover:before:scale-70`,
//         className,
//       )}
//     ></div>
//   );
// }
