import Image from "next/image";
import CustomScrollSec from "./CustomScrollSec";
import React from "react";
import Link from "next/link";

function DifferentStudyTypes() {
  const sections = [
    {
      img: "https://www.ikea.com/images/rocking-2631371e4ef6c19ebcb30e6f893a63be.jpg?f=xxxs",
      title: "Flexible rocking chair",
      href: "/cat/rocking-chairs",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/28aa2a7c171e8ce6/original/PH200204.jpg?f=xxxs",
      title: "Cozy cushions",
      href: "/cat/textiles",
    },
    {
      img: "https://www.ikea.com/images/outdoor-69e3adb2721cedfade5546a613909b03.jpg?f=xxxs",
      title: "Outdoor seating",
      href: "/cat/outdoor-products",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/6acfc93618badf94/original/PH205409.jpg?f=xxxs",
      title: "Sit/stand desk",
      href: "/cat/desks-computer-desks",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/dae9b17cfa2978b/original/PH186573-crop001.jpg?f=xxxs",
      title: "Wing chairs",
      href: "/cat/wing-chair",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/54d7373742273a2b/original/PH198852.JPG?f=xxxs",
      title: "Study & gaming",
      href: "/cat/gaming-furniture",
    },
    {
      img: "https://www.ikea.com/ext/ingkadam/m/5e29efb1e49336f/original/PH205106.jpg?f=xxxs",
      title: "Desk's supplementary",
      href: "/cat/desks-computer-desks",
    },
  ];

  return (
    <div>
      <div>
        <Image
          src={
            "https://www.ikea.com/images/be-inspired-by-different-study-types-d1564f8d43da7a2c857c925095eb6e28.jpg?f=xxxl"
          }
          alt="image"
          width={1500}
          height={1500}
          className="aspect-[1/0.5] w-full"
        />
      </div>
      <div className="my-12">
        <h2 className="mb-10 text-2xl">
          Get inspired by different study types
        </h2>
        <CustomScrollSec>
          {sections.map((section) => (
            <div key={section.title} className="relative min-w-[270px]">
              <Image
                src={section.img}
                alt={section.title}
                width={400}
                height={400}
                className="mb-8 aspect-[1/1.3] w-full cursor-pointer object-cover"
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

export default DifferentStudyTypes;

// 01003895660
