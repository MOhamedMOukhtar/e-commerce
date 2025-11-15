import Image from "next/image";
import CustomScrollSec from "./CustomScrollSec";
import React from "react";
import Link from "next/link";

function ExperienceIKEAN() {
  const sections = [
    {
      img: "https://www.ikea.com/images/fa/bc/fabca628073d3ddc40a9bdf0cf93c1c9.jpg?f=xxs",
      title: "Free delivery",
      href: "/terms-conditions#free-delivery",
    },
    {
      img: "https://www.ikea.com/images/7e/72/7e727c25aba99e29b305a087b59ef08e.jpg?f=xxs",
      title: "cash on delivery",
      href: "/terms-conditions#cash-on-delivery",
    },
    {
      img: "https://www.ikea.com/images/86/7e/867ed183e756cfbf0e3bcbc342523c8d.jpg?f=xxs",
      title: "Click & collect",
      href: "/terms-conditions#click-collect",
    },
    // {
    //   img: "https://www.ikea.com/images/8a/a1/8aa1d9764ea4a5d1462a0024e6173bf0.jpg?f=xxs",
    //   title: "Online planning tools",
    //   href: "/",
    // },
    {
      img: "https://www.ikea.com/images/e9/27/e9276e3806492763cbfdbc23305385c2.jpg?f=xxs",
      title: "Ikean app",
      href: "/ikean-shopping-app",
    },
    // {
    //   img: "https://www.ikea.com/images/76/d3/76d343876c4947e314ecd910edbb54ab.jpg?f=xxs",
    //   title: "Ikean family",
    //   href: "/",
    // },
    {
      img: "https://www.ikea.com/images/b9/6a/b96a2ec6b0fd34de1d2ba18ce878d0bf.jpg?f=xxs",
      title: "Ikean for business",
      href: "/ikean-for-business",
    },
  ];

  return (
    <div>
      <div className="my-12">
        <h2 className="mb-10 text-2xl">Experience IKEAN</h2>
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

export default ExperienceIKEAN;
