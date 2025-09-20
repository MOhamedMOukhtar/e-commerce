import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function NowInIkean() {
  return (
    <div className="my-20">
      <h2 className="my-10 text-2xl">Now in IKEA Egypt</h2>
      <div className="flex gap-5">
        <div className="group cursor-pointer">
          <div>
            <Image
              src="https://www.ikea.com/images/banner-of-free-accessories-delivery-a12a3d654718a11d59ed77bce6be69a9.jpg?f=xs"
              alt="Free delivery"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.6] p-8">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Free delivery to your doorstep across Egypt
            </h2>
            <p className="text-black/80">
              on accessory purchases over 250 EGP and up to 20 KGs per order.
            </p>
            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-black p-3.5"
              color="white"
            />
          </div>
        </div>
        <div className="group cursor-pointer">
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
        </div>
        <div className="group cursor-pointer">
          <div>
            <Image
              src="https://www.ikea.com/ext/ingkadam/m/3d7e9c08e9efebab/original/PH205475-crop001.jpg?f=xs"
              alt="Hurry Up!"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.6] bg-[#9b3a37] p-8 text-white">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Wake up, it&apos;s time to sleep!
            </h2>
            <p className="text-white/80">
              Thanks to our soft and colorful textiles, you can start your day
              stress-free.
            </p>
            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-white p-3.5"
              color="black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NowInIkean;
