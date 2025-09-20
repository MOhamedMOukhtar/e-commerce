"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SecRooms from "./components/SecRooms";
import SecTipsIdeas from "./components/SecTipsIdeas";
import SecOffersCampaigns from "./components/SecOffersCampaigns";
import Products from "./components/secProducts/Products";
import ExploreSubSection from "./components/secProducts/components/ExploreSubSection";
import { usePathname } from "next/navigation";

function Sections() {
  const [sectionTitle, setSectionTitle] = useState<string | null>("products");
  const [exploreSubSection, setExploreSubSection] = useState<string>("");
  const [clickedItem, setClickedItem] = useState<string>("");
  const pathname = usePathname();
  const [showSections, startHover, endHover, hover, end, display] =
    useHoverTimeout(600);

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
    <main
      className={`mx-12 space-y-7 ${showSections ? "min-h-[240px]" : "min-h-[70px]"} transition-[min-height] duration-200 ease-in-out`}
      onMouseEnter={() => {
        startHover();
        hover();
      }}
      onMouseLeave={() => {
        endHover();
        end();
      }}
    >
      <nav className="flex w-fit items-start justify-start gap-7 border-b border-gray-300 pt-4 text-base font-medium text-black/60">
        <div
          className={`flex items-center gap-2 px-1 pb-4 ${
            showSections &&
            (sectionTitle === "products" || sectionTitle === "explore")
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
            showSections && sectionTitle === "rooms"
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
            showSections && sectionTitle === "tips-ideas"
              ? "cursor-default border-b-2 border-[#0058A3] text-black"
              : "cursor-pointer hover:text-black/75"
          }`}
          onClick={() => setSectionTitle("tips-ideas")}
        >
          Tips & ideas
        </div>
        <div
          className={`flex items-center gap-2 px-1 pb-4 ${
            showSections && sectionTitle === "offers-campaigns"
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
            showSections={showSections}
            display={display}
          />
        )}
        {sectionTitle === "explore" && (
          <ExploreSubSection
            setSectionTitle={setSectionTitle}
            exploreSubSection={exploreSubSection}
            setClickedItem={setClickedItem}
            clickedItem={clickedItem}
            className={`${showSections ? "h-fit" : "h-0 overflow-hidden"} transition duration-200 ease-in-out`}
          />
        )}
        {sectionTitle === "rooms" && (
          <SecRooms showSections={showSections} display={display} />
        )}
        {sectionTitle === "tips-ideas" && (
          <SecTipsIdeas showSections={showSections} display={display} />
        )}
        {sectionTitle === "offers-campaigns" && (
          <SecOffersCampaigns showSections={showSections} display={display} />
        )}
      </div>
    </main>
  );
}

export default Sections;

function useHoverTimeout(delay = 500) {
  const [isHovered, setIsHovered] = useState(false);
  const [hide, setHide] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef2 = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/product")) {
      setIsHovered(false);
      setHide(false);
    } else {
      setIsHovered(true);
      setHide(true);
    }
  }, [pathname]);

  const startTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, delay);
  }, [delay]);

  const startTimeout2 = useCallback(() => {
    timeoutRef2.current = setTimeout(() => {
      setHide(true);
    }, 0);
  }, []);

  const endHover = useCallback(() => {
    if (!pathname.includes("/product")) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setTimeout(() => setIsHovered(false), delay);
  }, [pathname, delay]);

  const endHover2 = useCallback(() => {
    if (!pathname.includes("/product")) return;
    if (timeoutRef2.current) {
      clearTimeout(timeoutRef2.current);
      timeoutRef2.current = null;
    }
    setTimeout(() => setHide(false), delay + 100);
  }, [pathname, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [isHovered, startTimeout, endHover, startTimeout2, endHover2, hide];
}
