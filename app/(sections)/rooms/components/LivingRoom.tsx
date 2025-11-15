import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getLivingRooms } from "@/lib/firestore/folder/livingRoom";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function LivingRoom() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getLivingRooms()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Living Room
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        In MÄVINN, we are combining traditional handicraft and natural materials
        with bold patterns and strong colours. Designed to make a difference, we
        hope the collection can help set the right tone for your living room.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Give your living room a timeless look
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Rooted in IKEA`s heritage and our commitment to high-quality furniture
        at an affordable price, the STOCKHOLM 2025 collection features a curated
        selection of beautifully coordinated items, each of which can also stand
        alone as a statement piece.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Living Room Products
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

export default LivingRoom;
