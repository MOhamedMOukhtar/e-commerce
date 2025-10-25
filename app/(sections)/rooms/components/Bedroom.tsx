import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getBedhrooms } from "@/lib/firestore/folder/bedrooms";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function Bedroom() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getBedhrooms()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Bedroom
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Beds are crucial for restful night&apos;s sleep. It should have space for
        stretching out comfortably while maintaining a cozy atmosphere for snug
        relaxation. Whether you are looking for double beds, single beds, divan
        beds, queen beds, or king beds, we have a diverse range to meet your
        needs.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">Bedside tables</h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        IKEA bedside tables are unsung heroes, keeping your night-time
        necessities within reach. Ours come in different styles, so you can find
        one to match your furniture. We also have side tables, tray tables and
        laptop stands to add to your comfort, and drawers for more storage. Buy
        bedside table online.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Bedroom Products
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

export default Bedroom;
