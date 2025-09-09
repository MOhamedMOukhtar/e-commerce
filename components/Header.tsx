"use client";

import { Dock, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MainHeader() {
  const pathname = usePathname();

  if (pathname.includes("/admin")) return null;

  return (
    <nav className="flex items-center justify-between bg-black px-10 py-3 text-white">
      <div className="flex cursor-pointer gap-3 hover:underline">
        <Globe />
        <div>
          <span className="pr-2">EG</span>
          <span className="border-l border-l-white pl-2">English</span>
        </div>
      </div>
      <Link
        href={"/north-coast"}
        className="flex cursor-pointer items-center gap-2 hover:underline"
      >
        <Dock size={22} strokeWidth={1} />
        <span className="">North Coast ​is now open</span>
      </Link>
      <Link
        href={"/north-coast"}
        className="flex cursor-pointer items-center gap-2 hover:underline"
      >
        <Dock size={22} strokeWidth={1} />
        <span className="">Cairo Festival City</span>
      </Link>
    </nav>
  );
}

export default MainHeader;
