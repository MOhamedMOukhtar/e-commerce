import CustomScrollSec from "@/app/components/CustomScrollSec";
import Image from "next/image";
import Link from "next/link";

import React from "react";

function TablesSections() {
  const sections = [
    {
      img: "https://www.ikea.com/eg/en/images/products/markus-office-chair-vissle-dark-grey__1030304_pe836200_s5.jpg?f=s",
      title: "Desk chairs",
      href: "desk-chairs",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/loeparbana-gaming-chair-vissle-dark-grey__1368690_pe957869_s5.jpg?f=s",
      title: "Gaming furniture",
      href: "gaming-furniture",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/mittzon-conference-table-black-stained-ash-veneer-white__1244855_pe921318_s5.jpg?f=s",
      title: "Conference tables",
      href: "bekant-conference-meeting-tables",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/mittzon-conference-table-walnut-veneer-white__1296186_pe935707_s5.jpg?f=s",
      title: "Conference table & chair sets",
      href: "conference-table-chair-sets",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/torald-smaellen-desk-and-chair-white-black__1115595_pe872151_s5.jpg?f=s",
      title: "Desk & chair sets",
      href: "desk-chair-sets",
    },
    {
      img: "https://www.ikea.com/eg/en/images/products/fjaellberget-conference-chair-with-castors-white-stained-oak-veneer-gunnared-beige__0848965_pe779198_s5.jpg?f=s",
      title: "Conference chairs",
      href: "conference-chairs",
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

export default TablesSections;
