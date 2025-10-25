import CustomScrollSec from "@/app/components/CustomScrollSec";
import Image from "next/image";
import Link from "next/link";

import React from "react";

function StorageSections() {
  const sections = [
    {
      img: "https://www.ikea.com/ext/ingkadam/m/56152072d28198df/original/PE991258.jpg?f=s",
      title: "Chests of drawers",
      href: "chests-of-drawers-drawer-units",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/skruvby-sideboard-black-blue__1291701_pe934963_s5.jpg?f=s",
      title: "console tables",
      href: "sideboards-buffets-console-tables",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/raskog-trolley-black__1366926_pe957216_s5.jpg?f=s",
      title: "Trolleys",
      href: "trolleys",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/mittzon-frame-w-cstrs-acoustic-screen-gunnared-beige-white__1248678_pe923193_s5.jpg?f=s",
      title: "Room dividers",
      href: "room-dividers",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/alex-drawer-unit-black-blue__1494830_pe1004909_s5.jpg?f=s",
      title: "storage drawers",
      href: "storage-units-cabinets",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/bissa-shoe-cabinet-with-3-compartments-black-brown__1134286_pe878666_s5.jpg?f=s",
      title: "Shoe cabinets",
      href: "shoe-cabinets",
    },
  ];

  return (
    <div className="mt-15 -mb-20">
      <div className="my-12">
        <h2 className="mb-10 text-2xl">Shop by Types</h2>
        <CustomScrollSec>
          {sections.map((section) => (
            <Link
              href={`${section.href}`}
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
              <button className="absolute bottom-14 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold text-nowrap">
                {section.title}
              </button>
            </Link>
          ))}
        </CustomScrollSec>
      </div>
    </div>
  );
}

export default StorageSections;
