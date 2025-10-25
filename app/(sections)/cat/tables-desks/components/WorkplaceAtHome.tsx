import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function WorkplaceAtHome() {
  return (
    <div className="my-30">
      <h2 className="my-10 text-2xl">How to get a better workspace at home</h2>
      <div className="flex gap-5">
        <Link
          href="/cat/bekant-conference-meeting-tables"
          className="group cursor-pointer"
        >
          <div>
            <Image
              src="https://www.ikea.com/eg/en/images/products/mittzon-conference-table-white-black__1242591_pe920294_s5.jpg?f=s"
              alt="Free delivery"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.4] bg-[#141414] p-8">
            <h2 className="mb-2 text-2xl text-white group-hover:underline">
              Conference tables
            </h2>

            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-white p-3.5"
              color="black"
            />
          </div>
        </Link>
        <Link
          href="/cat/conference-table-chair-sets"
          className="group cursor-pointer"
        >
          <div>
            <Image
              src="https://www.ikea.com/eg/en/images/products/mittzon-conference-table-walnut-veneer-white__1296186_pe935707_s5.jpg?f=s"
              alt="Affordable Essentials"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.4] bg-[#d8b15c] p-8">
            <h2 className="mb-2 text-2xl text-white group-hover:underline">
              Conference table & chair sets
            </h2>

            <ArrowRight
              className="absolute bottom-7 left-7 box-content rounded-full bg-white p-3.5"
              color="black"
            />
          </div>
        </Link>
        <Link href="/cat/desk-chair-sets" className="group cursor-pointer">
          <div>
            <Image
              src="https://www.ikea.com/eg/en/images/products/gladhoejden-nilserik-table-and-sit-stand-support-anthracite-grey__1155448_pe886635_s5.jpg?f=s"
              alt="Hurry Up!"
              width={1000}
              height={1000}
              className="aspect-square object-cover"
            />
          </div>
          <div className="relative aspect-[1/0.4] bg-[#528cad] p-8 text-white">
            <h2 className="mb-2 text-2xl group-hover:underline">
              Desk & chair sets
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

export default WorkplaceAtHome;
