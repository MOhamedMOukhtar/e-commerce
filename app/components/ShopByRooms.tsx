import Image from "next/image";
import CustomScrollSec from "./CustomScrollSec";
import React from "react";
import Link from "next/link";

function ShopByRooms() {
  const sections = [
    {
      img: "https://www.ikea.com/ext/ingkadam/m/79f6bd6ca25391f7/original/PH179171.jpg?f=xxxs",
      title: "Bedroom",
      href: "/rooms/bedroom",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/10e1d5a52c9750b5/original/PH152874-crop004.jpg?f=xxxs",
      title: "Living",
      href: "/rooms/living-room",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/19ec2eb44a0ef324/original/PH184302.jpg?f=xxxs",
      title: "Garden & Balcony",
      href: "/rooms/garden-balcony",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/73f850e757fef06b/original/PH172954-crop002.jpg?f=xxxs",
      title: "Dining",
      href: "/rooms/dining",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/a803821e8ce7211/original/PH188366.jpg?f=xxxs",
      title: "Children's room",
      href: "/rooms/childrens-room",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/18e8dabc0f588598/original/PH204320_SHI_001.jpg?f=xs",
      title: "Bathroom",
      href: "/rooms/bathroom",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/18c268f2f9de8c4b/original/PH171829.jpg?f=s",
      title: "Hallway",
      href: "/rooms/hallway",
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
              <Link
                href={section.href}
                className="absolute bottom-14 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold text-nowrap hover:bg-[#e2e2e2]"
              >
                {section.title}
              </Link>
            </div>
          ))}
        </CustomScrollSec>
      </div>
    </div>
  );
}

export default ShopByRooms;
