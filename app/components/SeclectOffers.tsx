import Link from "next/link";
import React from "react";

function SeclectOffers() {
  return (
    <div className="mb-15 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-5 text-center text-2xl font-semibold [&>a]:cursor-pointer [&>a]:bg-[#e63514] [&>a]:p-5 [&>a]:text-white">
      <Link href="/cat/furniture-on-offer">Special Offers on furniture</Link>
      <Link href="/cat/accessories-on-offer">
        Special Offers on accessories
      </Link>
      <Link href={""}>Special Offers under 500 EGP</Link>
    </div>
  );
}

export default SeclectOffers;
