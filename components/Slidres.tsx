"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

interface TProduct {
  id: string;
  title: string;
  summary: string;
  featureImage: string;
}

function FeaturedProductSlidre({
  featuredProduct,
}: {
  featuredProduct: TProduct[];
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {featuredProduct.map((product) => {
        return (
          <div key={product.id} className="h-[500px] bg-[#f8f8f8] p-10 md:p-20">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <h2 className="text-gray-500">New Fashion</h2>
                <h3>{product.title}</h3>
                <p className="mb-8 text-base/5 text-black/80">
                  {product.summary}
                </p>
                <div className="flex items-center gap-2">
                  <Button>BUY NOW</Button>
                  <Button variant={"border"}>ADD TO CART</Button>
                  <Button
                    variant={"border"}
                    className="rounded-full border-2 border-pink-300 text-pink-400 outline-none hover:border-pink-800 hover:text-pink-800"
                  >
                    <Heart />
                  </Button>
                </div>
              </div>
              <Image
                src={product.featureImage}
                alt={product.title}
                width={400}
                height={400}
              />
            </div>
          </div>
        );
      })}
    </Slider>
  );
}

export default FeaturedProductSlidre;
