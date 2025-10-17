import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function TipsAndIdeas() {
  return (
    <div className="my-30">
      <h2 className="my-10 text-2xl">
        More tips and ideas for your transitional areas
      </h2>
      <div className="flex gap-5">
        <Link
          href="/cat/bookcases-shelving-units"
          className="group cursor-pointer"
        >
          <div>
            <Image
              src="https://www.ikea.com/eg/en/images/products/vihals-shelving-combination-white__1049380_pe844125_s5.jpg?f=m"
              alt="Free delivery"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.4] p-8">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Bookcases & shelving units
            </h2>

            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-black p-3.5"
              color="white"
            />
          </div>
        </Link>
        <Link href="/cat/garage-storage" className="group cursor-pointer">
          <div>
            <Image
              src="https://www.ikea.com/ext/ingkadam/m/533572ad90b2d7f6/original/PH196301.JPG?f=m"
              alt="Affordable Essentials"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.4] p-8">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Garage storage
            </h2>

            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-black p-3.5"
              color="white"
            />
          </div>
        </Link>
        <Link
          href="/cat/hallway-furniture-sets"
          className="group cursor-pointer"
        >
          <div>
            <Image
              src="https://www.ikea.com/eg/en/images/products/nipasen-baggmuck-hallway-furniture-set-of-2-black-grey__1404508_pe970099_s5.jpg?f=m"
              alt="Hurry Up!"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.4] bg-[#37769b] p-8 text-white">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Hallway furniture sets
            </h2>

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

export default TipsAndIdeas;
