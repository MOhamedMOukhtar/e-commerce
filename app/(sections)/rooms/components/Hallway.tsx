import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getHallway } from "@/lib/firestore/folder/hallway";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function Hallway() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getHallway()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Hallway Room
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        When you need somewhere easy to store outdoor stuff and shoes in your
        room, this trio of EKRAR hat & coat stand, GREJIG shoe rack and BAGGMUCK
        shoe mat can transform your doorway area into a scene-setting entryway.
        They are easy to assemble and move around (from home to home, as well as
        in the room) and lend themselves to all kinds of looks. Style them up
        with things you love to create a fun look that`s unique and welcoming.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Gather your favorites in style
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        The spacious RISATORP basket is a creative way to carry bulky tableware
        and ingredients between different rooms. The tall sides and moveable
        handle make it easy to move around, for instance when setting the table,
        or gathering your favorites for a festive drink in the living room.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Hallway Room Products
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

export default Hallway;
