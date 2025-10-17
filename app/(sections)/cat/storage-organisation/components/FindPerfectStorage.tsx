import Image from "next/image";
import Link from "next/link";
import React from "react";

function FindPerfectStorage() {
  return (
    <div>
      <h2 className="my-10 text-2xl">Find your perfect storage solution</h2>
      <div className="flex gap-5">
        <Card
          image="https://www.ikea.com/eg/en/images/products/ivar-2-sections-shelves-pine-metal-white__1185117_pe898266_s5.jpg?f=m"
          title="Small spaces ask for high organization skills. IKEA storage solutions have your back in keeping your home tidy"
          href="storage-solution-systems"
        />
        <Card
          image="https://www.ikea.com/ext/ingkadam/m/1d2a8494e54aff8a/original/PH205078.jpg?f=m"
          title="What you keep inside a cupboard or cabinet is unique to you. Your choice of storage cupboards is too"
          href="cabinets-cupboards"
        />
        <Card
          image="https://www.ikea.com/images/tonstad-series-fad1454fdd98acccec8f2e4f8fb27e64.jpg?f=s"
          title="From black-and-white TV units to today's games, on-demand movies, and 3D, the need for TV stands or wall shelves for speakers remains unchanged"
          href="tv-media-furniture"
        />
      </div>
      <div className="mt-20 flex gap-5">
        <Card
          image="https://www.ikea.com/eg/en/images/products/hauga-wardrobe-with-sliding-doors-white__0931942_pe791324_s5.jpg?f=m"
          title="Sneaker collector, denim lover, T-shirt saver, hat hoarder? Whatever you love collecting"
          href="wardrobes"
        />
        <Card
          image="https://www.ikea.com/eg/en/images/products/sundsoe-cabinet-anthracite-outdoor-indoor__1394409_pe966538_s5.jpg?f=m"
          title=" With the sun's arrival, our focus shifts outdoors, including our furniture. Explore IKEA's outdoor storage solutions"
          href="outdoor-storage"
        />
        <Card
          image="https://www.ikea.com/eg/en/images/products/trofast-storage-combination-with-boxes-white-white-red__1431321_pe982332_s5.jpg?f=m"
          title="Giving toys a tidy home is child's play with IKEA toy storage boxes, and they make carrying toys easy"
          href="toy-storage"
        />
      </div>
    </div>
  );
}

export default FindPerfectStorage;

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
