import Link from "next/link";
import React from "react";

function SecOffersCampaigns({
  showSections,
  display,
}: {
  showSections: boolean | (() => void);
  display: boolean | (() => void);
}) {
  return (
    <section
      className={`mb-[-15px] flex flex-col gap-5 transition-all duration-100 ease-out ${showSections ? "opacity-100" : "opacity-0"} ${display ? "block" : "hidden"}`}
      style={{
        maxHeight: showSections ? "120px" : "0px",
      }}
    >
      <ul className="underline-pointer flex flex-col gap-2 text-base text-black/70">
        <li className="font-medium text-black/80">
          See all in Offers & Campaigns
        </li>
        <li>
          <Link href={"/cat/trending-season"}>Trending this season</Link>
        </li>
        <li>
          <Link href="/cat/lower-price">Special Offers</Link>
        </li>
      </ul>
    </section>
  );
}

export default SecOffersCampaigns;
