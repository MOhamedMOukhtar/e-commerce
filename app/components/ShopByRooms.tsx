import Image from "next/image";
import CustomScrollSec from "./CustomScrollSec";
import React from "react";

function ShopByRooms() {
  const sections = [
    {
      img: "https://www.ikea.com/ext/ingkadam/m/79f6bd6ca25391f7/original/PH179171.jpg?f=xxxs",
      title: "Bedroom",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/10e1d5a52c9750b5/original/PH152874-crop004.jpg?f=xxxs",
      title: "Living",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/19ec2eb44a0ef324/original/PH184302.jpg?f=xxxs",
      title: "Garden & Balcony",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/73f850e757fef06b/original/PH172954-crop002.jpg?f=xxxs",
      title: "Dining",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/a803821e8ce7211/original/PH188366.jpg?f=xxxs",
      title: "Children's room",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/7177f14ce69caa70/original/PH178283.jpg?f=xxxs",
      title: "Home office",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/305abfc3ef355c88/original/PH205190.jpg?f=xxs",
      title: "Kitchen",
    },
  ];

  return (
    <div>
      <div className="my-12">
        <h2 className="mb-10 text-2xl">Shop by Rooms</h2>
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

export default ShopByRooms;
