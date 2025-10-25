import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getBathroomProducts } from "@/lib/firestore/folder/bathroomProducts";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function BathroomProducts() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getBathroomProducts()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Bathroom Products
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Any space is incomplete without some final decorative touches. IKEA home
        décor items help you create an atmosphere that matches your personality
        and needs. From frames and pictures, mirrors, holiday decorations, and
        clocks, we`ve got it all available and ready for you. Buy IKEA
        decoration online.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Dress your home for staying in
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Sometimes the best plan is a cancelled plan. Especially when staying
        home means lighting a candle (or five), binging your favourite show, and
        enjoying a cup of tea. With the HÖSTAGILLE collection, anyone could
        become a true autumn lover.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Bathroom Products Products
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

export default BathroomProducts;
