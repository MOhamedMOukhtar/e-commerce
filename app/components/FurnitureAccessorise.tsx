import Image from "next/image";
import Link from "next/link";
import React from "react";

function FurnitureAccessorise() {
  return (
    <div className="my-20 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-5">
      <div className="relative aspect-[5/1] cursor-pointer">
        <Link href="/cat/furniture-on-offer">
          <Image
            src="https://www.ikea.com/images/ikea-family-furniture-on-offer-d71eea8e2737121c3663b69562fb00c6.jpg?f=l"
            alt="Furniture offer"
            className="object-cover"
            fill
          />
        </Link>
      </div>
      <div className="relative aspect-[5/1] cursor-pointer">
        <Link href="/cat/accessories-on-offer">
          <Image
            src="https://www.ikea.com/images/ikea-family-accessories-on-offer-939040765582007fb3da3655bc1b0116.jpg?f=l"
            alt="Accessories offer"
            className="object-cover"
            fill
          />
        </Link>
      </div>
    </div>
  );
}

export default FurnitureAccessorise;
