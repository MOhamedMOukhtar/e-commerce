import Image from "next/image";
import React from "react";

function Page() {
  return (
    <div className="m-12">
      <h1 className="mb-10 text-4xl">Welcome to IKEA for Business</h1>
      <p className="text-xl font-bold text-black/70">
        Whatever type of space you are planning to furnish, we can help
      </p>
      <p className="mt-10 mb-8 text-xl font-bold text-black/70">
        Join the IKEA for Business Network and discover all the benefits!
      </p>
      <div className="flex gap-5">
        <div className="flex-1">
          <Image
            src={
              "https://www.ikea.com/images/bb/d6/bbd66d9d58c59b462d5b4b36781e068e.jpg?f=m"
            }
            width={1000}
            height={1000}
            alt="business"
            className="aspect-video object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="mb-8 text-sm font-bold text-black/70">
            Businesses pay less <br /> You can do everything yourself, or we can
            do it for you. IKEA services will make your life easer.
          </p>
          <ul className="mt-3 ml-8 list-disc space-y-3 text-sm text-black/70">
            <li>Interior Design</li>
            <li>Project management and planning</li>
            <li>After sale service</li>
            <li>Delivery</li>
            <li>Assembly</li>
            <li>Kitchen Installation</li>
            <li>Measuring</li>
            <li>Finance options</li>
            <li>Gift Card solutions (digital and physical)</li>
            <li>Sustainable Corporate Gifting </li>
            <li>Free coffee</li>
          </ul>
        </div>
      </div>
      <div className="w-2/3">
        <p className="mt-10 mb-8 font-bold text-black/70">
          Discover the business Interior Design Service
        </p>
        <p className="mt-10 mb-2 text-sm font-bold text-black/70">
          From residential to commercial, our interior designers are available
          to help you get the most and best out of your space.
        </p>
        <p className="text-sm text-black/70">
          Meet one of our interior designers and get help analyzing your needs
          according to your style, space and budget. Here we can go in depth and
          compile an interior design solution for all your business needs.
        </p>
      </div>
      <div className="mt-20 flex gap-5">
        <div className="flex-1">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/TJH9e6SgOLY"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-8 text-sm font-bold text-black/70">
            We offer wide range of services for our Business customers
          </p>
          <p className="text-sm text-black/70">
            IKEA for business can save you time and money. No matter what type
            of project you have, be it a hotel, office, residential building or
            a small store, we have inspiration and products you need
          </p>
        </div>
      </div>
      <div className="w-2/3">
        <p className="mt-10 mb-3 font-bold text-black/70">Before you buy</p>

        <p className="text-sm text-black/70">
          These solutions contain a mix of articles developed for domestic and
          non-domestic use. Please verify that your purchases are compliant and
          suitable for the intended use in your area.
        </p>
      </div>
    </div>
  );
}

export default Page;
