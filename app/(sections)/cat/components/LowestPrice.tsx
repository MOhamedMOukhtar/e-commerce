import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getLowestPrice } from "@/lib/firestore/folder/lowestPrice";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function LowestPrice() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);
  const [filterProducts, setFilterProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function fetch() {
      const products = (await getLowestPrice()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  useEffect(() => {
    products.forEach((product) => {
      if (product.details) {
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
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Our lowest prices
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Plan to upgrade your home with a large selection of IKEA&apos;s lowest
        prices possible for the items that can bring all your ideas to life! You
        may discover everything you need to furnish and decorate your dream
        house, from chic furniture and unique decor items to practical everyday
        essentials. Browse now!
      </p>

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

export default LowestPrice;
