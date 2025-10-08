"use client";

import CustomScrollSec from "@/app/components/CustomScrollSec";
import ProductCardLarge from "@/app/components/ProductCardLarge";

import { Button } from "@/components/ui/button";
import { getSpecialOffers } from "@/lib/firestore/special-offers/read_server";
import { TProduct } from "@/types/product/product";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const sections = [
  {
    img: "https://www.ikea.com/ext/ingkadam/m/685708d5492c8bec/original/PH188723.jpg?f=xxs",
    title: "Tables & chairs",
    href: "tables-and-chairs-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/637bd5692c272fb1/original/PH199760.jpg?f=xxs",
    title: "Textiles",
    href: "textiles-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/3e2c8c0dc12280a1/original/PH196308.JPG?f=xxs",
    title: "Outdoor products",
    href: "outdoor-products-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/6e9be1dd7f530e22/original/PE946971.jpg?f=xxs",
    title: "Decoration",
    href: "decoration-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/595238d9f2adb983/original/PH198126_SHI_001.jpg?f=xxs",
    title: "Bookcases & shelving units",
    href: "bookcases-and-shelving-units-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/182d7c1e382d9907/original/PE871527.jpg?f=xxs",
    title: "Baby & children",
    href: "baby-and-children-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/1044ca14bff880ed/original/PE860147.jpg?f=xxs",
    title: "Kitchenware & tableware",
    href: "kitchenware-and-tableware-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/7927f3ce6f0b8a5d/original/PE800224.jpg?f=xxs",
    title: "Sofas & armchairs",
    href: "sofas-and-armchairs-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/26aedfcb8469b3d8/original/PH191713-crop001.jpg?f=xxs",
    title: "Under 2000 EGP",
    href: "under-2000-egp-on-offer",
  },
  {
    img: "https://www.ikea.com/ext/ingkadam/m/796cd7823343e2b7/original/PE791529-crop001.JPG?f=xxs",
    title: "Highly rated products",
    href: "highly-rated-products-on-offer",
  },
];

function SpecialOffers() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16); // show first 6 only

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      const specialOffers = (await getSpecialOffers()) as TProduct[];
      setProducts(specialOffers);
    };
    fetchSpecialOffers();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 my-20">
      <h1 className="my-5 text-4xl">Special offers</h1>
      <p className="max-w-1/2 text-sm leading-5 text-[#484848]">
        <strong>Grab Your Favourite Products at New Lower Prices!</strong>{" "}
        <br /> Check out our massive selection of products now available at new
        lower prices.Hurry up and grab your favourite products from everyday
        essentials and home furniture to home textiles, decorations, and so much
        more all at unbelievable prices.Happy shopping!
      </p>
      <Button variant={"border"} className="mt-9 rounded-full !px-6">
        <ArrowDownRight />
        <a href="#products">Products</a>
      </Button>
      <div className="mt-15 -mb-20">
        <div className="my-12">
          <h2 className="mb-10 text-2xl">
            Browse our special offers by category
          </h2>
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
                  href={`/cat/${section.href}`}
                  className="absolute bottom-14 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold text-nowrap hover:bg-gray-100"
                >
                  {section.title}
                </Link>
              </div>
            ))}
          </CustomScrollSec>
        </div>
      </div>
      <h2 className="mb-10 border-b pb-10 text-2xl" id="products">
        special offer Products
      </h2>
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-10 overflow-hidden border-b border-[oklch(0.922_0_0)]">
        {visibleProducts.map((product) => (
          <ProductCardLarge product={product} key={product?.id} />
        ))}
      </div>
      <div className="mt-10 text-center text-xs font-semibold text-stone-500">
        <p>
          Showing {visibleProducts.length} of {products.length} results
        </p>
        <progress
          value={visibleProducts.length}
          max={products.length}
          className="progress mt-3 h-[2px] w-50 bg-stone-700"
        />
      </div>
      {visibleProducts.length === products.length || (
        <div className="mt-10 text-center">
          <Button
            variant={"border"}
            className="rounded-full px-15"
            onClick={() => setVisibleCount((prev) => prev + 16)}
          >
            Show more
          </Button>
        </div>
      )}
    </div>
  );
}

export default SpecialOffers;
