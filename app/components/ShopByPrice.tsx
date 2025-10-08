import Image from "next/image";
import CustomScrollSec from "./CustomScrollSec";
import React from "react";

function ShopByPrice() {
  const sections = [
    {
      img: "https://www.ikea.com/images/under-100egp-08a6ac61572e3c93c7f33fa5c62823d3.png?f=xxxs",
      title: "Under 100EGP",
    },
    {
      img: "https://www.ikea.com/images/under-300egp-397ef80b088d066731b58233f11bbb8d.png?f=xxxs",
      title: "Under 300EGP",
    },
    {
      img: "https://www.ikea.com/images/under-500egp-f21f49b44152a234a7d1292ed8aa9bf8.png?f=xxxs",
      title: "Under 500EGP",
    },
    {
      img: "https://www.ikea.com/images/under-700egp-4acdbe4249e95957b50276447daf7f67.png?f=xxxs",
      title: "Under 700EGP",
    },
    {
      img: "https://www.ikea.com/images/under-900egp-0915d301649794945193b7973582798e.png?f=xxxs",
      title: "Under 900EGP",
    },
    {
      img: "https://www.ikea.com/images/under-1500egp-213371e51423a0627e605a9a80511f2f.png?f=xxxs",
      title: "Under 1500EGP",
    },
    {
      img: "https://www.ikea.com/images/under-2000egp-55bbe3d8780344f0d8e5f1791e02dfaa.png?f=xxxs",
      title: "Under 2000EGP",
    },
  ];

  return (
    <div className="mt-15 -mb-20">
      <div className="my-12">
        <h2 className="mb-10 text-2xl">Shop by Price</h2>
        <CustomScrollSec>
          {sections.map((section) => (
            <div
              key={section.title}
              className="relative min-w-[235px] cursor-pointer"
            >
              <Image
                src={section.img}
                alt={section.title}
                width={400}
                height={400}
                className="mb-8 aspect-[1/1.3] w-full object-cover"
              />
              <button className="absolute bottom-14 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-nowrap">
                {section.title}
              </button>
            </div>
          ))}
        </CustomScrollSec>
      </div>
    </div>
  );
}

export default ShopByPrice;
