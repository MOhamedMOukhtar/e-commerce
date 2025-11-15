import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NowInIkean() {
  return (
    <div className="my-20">
      <h2 className="my-10 text-2xl">Now in IKEA Egypt</h2>
      <div className="flex gap-5">
        <Link href="/cat/trending-season" className="group cursor-pointer">
          <div>
            <Image
              src="https://www.ikea.com/images/s-aa5c7a78d984e01fcf48ff22aa133c8f.jpg?f=xxl"
              alt="Free delivery"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.6] p-8">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Trending this season
            </h2>
            <p className="text-black/80">
              Discover this season&apos;s hottest categories. Browse and get
              ready to refresh your home.
            </p>
            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-black p-3.5"
              color="white"
            />
          </div>
        </Link>
        <Link
          href="/cat/affordable-essentials"
          className="group cursor-pointer"
        >
          <div>
            <Image
              src="https://www.ikea.com/images/affordable-essentials-d841cd8fea996c8dc32dc722dac0560f.jpg?f=xs"
              alt="Affordable Essentials"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.6] p-8">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Affordable Essentials
            </h2>
            <p className="text-black/80">
              Discover everyday essential products for all your rooms with
              affordable prices
            </p>
            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-black p-3.5"
              color="white"
            />
          </div>
        </Link>
        <Link href="/cat/lowest-price" className="group cursor-pointer">
          <div>
            <Image
              src="https://www.ikea.com/images/our-lowest-prices-05cb57a4b1c5c4406620f558a43f126f.jpg?f=xxs"
              alt="Hurry Up!"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.6] bg-[#7e7025] p-8 text-white">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Plan to upgrade your home
            </h2>
            <p className="text-white/80">
              Plan to upgrade your home with a large selection of IKEA&apos;s
              lowest prices possible
            </p>
            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-white p-3.5"
              color="black"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NowInIkean;
