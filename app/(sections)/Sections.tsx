"use client";

import { useEffect, useState } from "react";
import SecRooms from "./components/SecRooms";
import SecTipsIdeas from "./components/SecTipsIdeas";
import SecOffersCampaigns from "./components/SecOffersCampaigns";
import Products from "./components/secProducts/Products";
import ExploreSubSection from "./components/secProducts/components/ExploreSubSection";
import { usePathname } from "next/navigation";
// import { useSearchParams } from "next/navigation";

function Sections() {
  const [sectionTitle, setSectionTitle] = useState<string | null>("products");
  const [exploreSubSection, setExploreSubSection] = useState<string>("");
  const [clickedItem, setClickedItem] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setSectionTitle("products");
    }
  }, [pathname]);

  function handleExplore(subsection: string, item: string) {
    setExploreSubSection(subsection);
    setClickedItem(item);
  }

  if (pathname.includes("/admin")) return null;

  return (
    <main className="mx-10 h-60 space-y-7">
      <nav className="flex w-fit items-start justify-start gap-7 border-b border-gray-300 pt-4 text-base font-medium text-black/60">
        <div
          className={`flex items-center gap-2 px-1 pb-4 ${
            sectionTitle === "products" ||
            sectionTitle === "Explore Storage furniture"
              ? "cursor-default border-b-2 border-[#0058A3] text-black"
              : "cursor-pointer hover:text-black/75"
          }`}
          onClick={() => setSectionTitle("products")}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="currentColor"
              d="m19.5831 8.1899-5.5499-3.9941-1.1683 1.6233 3.0326 2.1825H8.0982l3.0325-2.1825-1.1683-1.6233L4.4126 8.19l-.416.2994.0001.5125.0023 10 .0003.9998H19.999V8.4892l-.4159-.2993zM5.9969 10.0016H17.999v8H5.9988l-.0019-8zM10 14.0006h3.9999v-2h-4v2z"
            ></path>
          </svg>
          <span>Products</span>
        </div>
        <div
          className={`flex items-center gap-2 px-1 pb-4 ${
            sectionTitle === "rooms"
              ? "cursor-default border-b-2 border-[#0058A3] text-black"
              : "cursor-pointer hover:text-black/75"
          }`}
          onClick={() => setSectionTitle("rooms")}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="currentColor"
              d="m12.0002 3.7876 8 5.4819-.0045 10.7303h-6.9955V15.07h-2v4.9298H4V9.2693l8.0002-5.4817zM6 10.3234v7.6764h3.0002V13.07h6v4.9298h2.9963l.0033-7.6766-5.9996-4.1111L6 10.3234z"
            ></path>
          </svg>
          <span>Rooms</span>
        </div>
        <div
          className={`flex items-center gap-2 px-1 pb-4 ${
            sectionTitle === "tips-ideas"
              ? "cursor-default border-b-2 border-[#0058A3] text-black"
              : "cursor-pointer hover:text-black/75"
          }`}
          onClick={() => setSectionTitle("tips-ideas")}
        >
          Tips & ideas
        </div>
        <div
          className={`flex items-center gap-2 px-1 pb-4 ${
            sectionTitle === "offers-campaigns"
              ? "cursor-default border-b-2 border-[#0058A3] text-black"
              : "cursor-pointer hover:text-black/75"
          }`}
          onClick={() => {
            setSectionTitle("offers-campaigns");
          }}
        >
          Offers & Campaigns
        </div>
      </nav>
      <div>
        {sectionTitle === "products" && (
          <Products
            setSectionTitle={setSectionTitle}
            handleExplore={handleExplore}
          />
        )}
        {sectionTitle === "explore" && (
          <ExploreSubSection
            setSectionTitle={setSectionTitle}
            exploreSubSection={exploreSubSection}
            setClickedItem={setClickedItem}
            clickedItem={clickedItem}
          />
        )}
        {sectionTitle === "rooms" && <SecRooms />}
        {sectionTitle === "tips-ideas" && <SecTipsIdeas />}
        {sectionTitle === "offers-campaigns" && <SecOffersCampaigns />}
      </div>
    </main>
  );
}

export default Sections;

// 0058A3
// 004F93 (hover)
