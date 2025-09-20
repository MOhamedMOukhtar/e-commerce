import React from "react";

function SeclectOffers() {
  return (
    <div className="mb-15 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-5 text-2xl font-semibold [&>button]:cursor-pointer [&>button]:bg-[#e63514] [&>button]:p-5 [&>button]:text-white">
      <button className=" ">Special Offers on furniture</button>
      <button className="">Special Offers on accessories</button>
      <button className="">Special Offers under 500 EGP</button>
    </div>
  );
}

export default SeclectOffers;
