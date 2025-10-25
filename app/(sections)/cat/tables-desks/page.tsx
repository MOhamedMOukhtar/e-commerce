import Image from "next/image";
import Link from "next/link";
import React from "react";
import WorkplaceAtHome from "./components/WorkplaceAtHome";
import TablesSections from "./components/TablesSections";

function Page() {
  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Desk & desk chairs
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Tables are essential, whether you&apos;re working from home, playing a
        game or in need of extra storage. Pick one from IKEA table collection,
        table accessories and computer desks online or test them out in our
        store! We&apos;re sure you`ll find one that fits whatever you want to do
        in whatever space you have.
      </p>
      <h2 className="mt-12 mb-12 text-2xl font-bold">
        Series for studying and working
      </h2>
      <div className="flex gap-5">
        <Card
          image="https://www.ikea.com/ext/ingkadam/m/56e3cc79a6e32840/original/PE976953.jpg?f=s"
          title="Desks & computer desks"
          href="desks-computer-desks"
        />
        <Card
          image="https://www.ikea.com/ext/ingkadam/m/6b44f955026a84c6/original/PE983300.jpg?f=s"
          title="Desk chairs"
          href="desk-chairs"
        />
        <Card
          image="https://www.ikea.com/eg/en/images/products/matchspel-gaming-chair-bomstad-black__1046391_ph180884_s5.jpg?f=s"
          title="Gaming furniture"
          href="gaming-furniture"
        />
      </div>
      <WorkplaceAtHome />
      <TablesSections />
    </div>
  );
}

export default Page;

function Card({
  image,
  title,
  href,
}: {
  image: string;
  title: string;
  href: string;
}) {
  return (
    <Link href={href} className="group cursor-pointer">
      <Image
        src={image}
        width={1000}
        height={1000}
        className="aspect-video object-cover"
        alt="storage"
      />
      <p className="mt-3 text-sm font-semibold text-gray-700 group-hover:underline">
        {title}
      </p>
    </Link>
  );
}
