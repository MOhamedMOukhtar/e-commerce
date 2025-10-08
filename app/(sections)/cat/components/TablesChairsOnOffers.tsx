import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getTablesChairs } from "@/lib/firestore/folder/tablesChairs";
import { TProduct } from "@/types/product/product";
import React, { useEffect, useState } from "react";

function TablesChairsOnOffers() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getTablesChairs(true)) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  console.log(products);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Tables & chairs on special offer
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Take a seat at a price you`ll love! Our tables and chairs are now
        available with special discounts _ perfect for creating a dining space
        that fits your style and budget. From sturdy dining tables to comfy
        armchairs, foldable chairs, or sets with four chairs included, you`ll
        find deals that make every meal more inviting.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Designed for every occasion _ now at lower prices
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Quick breakfasts, family dinners, or long chats over coffee _ our tables
        and chairs are made to adapt to all of life`s moments. And with these
        special offers, it`s easier than ever to bring home quality furniture
        that`s built to last while saving a little extra.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Tables & chairs Products
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

export default TablesChairsOnOffers;
