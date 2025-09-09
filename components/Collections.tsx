"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

interface TCollection {
  id: string;
  title: string;
  subTitle: string;
  imageURL: string;
  featureImage: string;
}

function Collections({ collections }: { collections: TCollection[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <Slider {...settings}>
      {collections.map((collection: TCollection) => {
        return (
          <div key={collection.id} className="m-10 bg-[#f8f8f8] p-10 md:p-20">
            <div className="flex h-50 items-center justify-between">
              <div className="space-y-4">
                <h3>{collection.title}</h3>
                <p className="mb-8 text-base/5 text-black/80">
                  {collection.subTitle}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant={"border"}>SHOW NOW</Button>
                </div>
              </div>
              <Image
                src={collection.imageURL}
                alt={collection.title}
                width={300}
                height={300}
              />
            </div>
          </div>
        );
      })}
    </Slider>
  );
}

export default Collections;
