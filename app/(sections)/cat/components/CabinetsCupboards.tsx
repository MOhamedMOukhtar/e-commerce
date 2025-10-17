import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getCabinetsCupboards } from "@/lib/firestore/folder/cabinetsCupboards";
import { TProduct } from "@/types/product/product";
import React, { useEffect, useState } from "react";

function CabinetsCupboards() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(17);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function fetch() {
      const products = (await getCabinetsCupboards()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  useEffect(() => {
    products.forEach((product) => {
      if (product.commonID && !product.description) {
        setCommonProducts((prev) => {
          // check if product already exists in the list
          const exists = prev.some((p) => p.id === product.id);
          if (exists) return prev;
          return [...prev, product];
        });
      }
    });
  }, [products]);

  const visibleProducts = products.slice(0, visibleCount);
  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Cabinets & cupboards
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        What you keep inside a cupboard or cabinet is unique to you. Your choice
        of storage cupboards is too. That`s why IKEA cupboards and living room
        cabinets collection offers a wide range of designs _ from classic wooden
        display cabinets to bright blue locker types and slim shoe cabinets.
        Shop now!
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Let`s pause for a moment at this new cabinet
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Not only does LÅDMAKARE storage system strike a great balance between
        open and closed storage. Since changing placement of the doors is easily
        done, you also have final say on the design. All in all, it`s a clever
        way to combine the function you need _ and a look you love.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Cabinets & cupboards Products
      </h2>
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-10 overflow-hidden border-b border-[oklch(0.922_0_0)]">
        {visibleProducts.map((product) => (
          <ProductCardLarge
            product={product}
            key={product?.id}
            commonProducts={commonProducts}
          />
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

export default CabinetsCupboards;
