"use client";

import { getSpecialOffers } from "@/lib/firestore/special-offers/read_server";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";
import CustomScrollSec from "./CustomScrollSec";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

function ProductSpecialOffers() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      setLoading(true);
      const specialOffers = (await getSpecialOffers()) as TProduct[];
      setProducts(specialOffers);
      setLoading(false);
    };
    fetchSpecialOffers();
  }, []);

  if (loading) {
    const array = new Array(8).fill(0);
    return (
      <div className="content mt-20 flex gap-5 overflow-x-scroll">
        {array.map((_, i) => (
          <div
            key={i}
            className="relative flex min-w-46 flex-col items-start gap-3"
          >
            <Skeleton className="h-48 w-[100%] bg-gray-300" />
            <Skeleton className="h-3 w-[60%] bg-gray-300" />
            <Skeleton className="h-4 w-[90%] bg-gray-300" />
            <Skeleton className="h-4 w-[80%] bg-gray-300" />
            <Skeleton className="h-6 w-[70%] bg-gray-300" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <CustomScrollSec>
        {products.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </CustomScrollSec>
    </div>
  );
}

export default ProductSpecialOffers;
