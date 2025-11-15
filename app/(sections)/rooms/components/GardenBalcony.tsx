import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getGardenBalcony } from "@/lib/firestore/folder/gardenBalcony";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function GardenBalcony() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getGardenBalcony()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Garden Balcony
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Get ready for a summer packed with refreshing vibes and cheerful
        moments! The PILLERSTARR collection is designed to brighten your day
        with happy flower power patterns, and KALLSINNIG glasses will add a
        clear blue sky to the table
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">Let`s go out for dinner</h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        When the weather`s fair and summer warmth is in the air _ there`s no
        better place for dining than outside. Find the outdoor furniture to
        match those moments here.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Garden Balcony Products
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

export default GardenBalcony;
