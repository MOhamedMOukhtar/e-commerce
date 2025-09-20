"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { Heart, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function StickyHeader() {
  const pathname = usePathname();

  const [scrollDir, setScrollDir] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDir("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);

    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  console.log(scrollDir);

  if (pathname.includes("/admin")) return null;
  return (
    <nav
      className={`sticky top-0 z-10 flex items-center justify-between bg-white px-10 py-6 transition duration-400 ${scrollDir === "down" ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/ikean.png" width={100} height={100} alt="logo-IKean" />
        </Link>
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-black/50"
            size={18}
          />
          <Input
            placeholder="What are you looking for?"
            className="w-[400px] rounded-full border-none bg-[#f5f5f5] py-6 ps-10 !text-base focus-visible:ring-[2px] focus-visible:ring-[#004F93] xl:w-[600px]"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="cursor-pointer rounded-full p-2.5 hover:bg-gray-200">
          <UserRound size={22} strokeWidth={2.5} />
        </div>
        <div className="cursor-pointer rounded-full p-2.5 hover:bg-gray-200">
          <Heart size={22} strokeWidth={2.5} />
        </div>
        <div className="cursor-pointer rounded-full p-2.5 hover:bg-gray-200">
          <svg viewBox="0 0 25 25" width="28" height="28" strokeWidth="0.5">
            <path
              fillOpacity="0.8"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9997 4c1.7048 0 2.9806 1.122 3.4578 2.7127.3246 1.0819.5718 2.1886.8335 3.2873h6.1517l-3.75 10H5.3067l-3.75-10h6.1516c.2617-1.0987.509-2.2054.8335-3.2873C9.019 5.122 10.2948 4 11.9997 4zm2.2348 6H9.7648c.2293-.9532.5299-2.1701.6927-2.7127C10.6838 6.533 11.1739 6 11.9997 6s1.3158.533 1.5421 1.2873c.1628.5426.4634 1.7595.6927 2.7127zm-9.7918 2 2.25 6h10.614l2.25-6h-3.3252c-.6633 2.1065-1.7665 4-4.2318 4-2.4654 0-3.5686-1.8935-4.2319-4h-3.325zm5.4308 0c.3635 1.0612.8841 2 2.1262 2 1.242 0 1.7626-.9388 2.1261-2H9.8735z"
            ></path>
          </svg>
        </div>
      </div>
    </nav>
  );
}

export default StickyHeader;

// 0058A3
// 004F93 (hover)
