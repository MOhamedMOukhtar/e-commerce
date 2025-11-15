"use client";

import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getProductsUnder } from "@/lib/firestore/products/read_server";
import { TProduct } from "@/types/product/product";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);
  const [filterProducts, setFilterProducts] = useState<TProduct[]>([]);
  const pathname = usePathname();

  const amount = Number(pathname.split("-").at(-1));

  useEffect(() => {
    async function fetch() {
      const products = (await getProductsUnder(amount)) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, [amount]);

  useEffect(() => {
    products.forEach((product) => {
      if (product.description) {
        setFilterProducts((prev) => [...prev, product]);
      }
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

  const visibleProducts = filterProducts.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="mt-14 mb-10 bg-[#484848] py-8 ps-8 text-3xl text-white">
        Product under {amount}
      </h1>

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
          Showing {visibleProducts.length} of {filterProducts.length} results
        </p>
        <progress
          value={visibleProducts.length}
          max={filterProducts.length}
          className="progress mt-3 h-[2px] w-50 bg-stone-700"
        />
      </div>
      {visibleProducts.length === filterProducts.length || (
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

export default Page;
