import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getUnder2000 } from "@/lib/firestore/folder/under2000";
import { TProduct } from "@/types/product/product";
import React, { useEffect, useState } from "react";

function Under2000() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getUnder2000()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Product under 2000
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Dive into the realm of home comfort with IKEA`s selection of Textiles!
        Explore a diverse range of high-quality fabrics, from soft bedding and
        elegant curtains to eye-catching rugs. With a focus on both
        functionality and design, IKEA provides versatile textile options to
        upgrade your home.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Products
      </h2>
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-10 overflow-hidden border-b border-[oklch(0.922_0_0)]">
        {visibleProducts.map((product) => (
          <ProductCardLarge product={product} key={product?.id} />
        ))}
      </div>
      <div className="mt-10 text-center text-xs font-semibold text-stone-500">
        <p>
          Showing {visibleProducts.length} of {products.length} results
        </p>
        <progress
          value={visibleProducts.length}
          max={products.length}
          className="progress mt-3 h-[2px] w-50 bg-stone-700"
        />
      </div>
      {visibleProducts.length === products.length || (
        <div className="mt-10 text-center">
          <Button
            variant={"border"}
            className="rounded-full px-15"
            onClick={() => setVisibleCount((prev) => prev + 16)}
          >
            Show more
          </Button>
        </div>
      )}
    </div>
  );
}

export default Under2000;
