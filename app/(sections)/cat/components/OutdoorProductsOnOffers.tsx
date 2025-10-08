import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getOutdoorProducts } from "@/lib/firestore/folder/outdoorProducts";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function OutdoorProductsOnOffers() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getOutdoorProducts(true)) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Outdoor products on offer
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Bring life to your outdoor space for less with IKEA`s special offers on
        outdoor products. From stylish patio furniture and practical garden
        solutions to durable outdoor accessories, you`ll find everything you
        need to create a welcoming retreat _ all at prices that make comfort
        more affordable.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Lazy afternoons and whispering soft hues
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Discover discounted lounge sets, cushions, and outdoor dining pieces
        designed for long, cosy afternoons. Whether it`s relaxing solo, sharing
        moments with family, or hosting friends under the stars, our outdoor
        offers make it easier to enjoy style, comfort, and fresh air _ without
        stretching your budget.
      </p>
      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Outdoor products
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

export default OutdoorProductsOnOffers;
