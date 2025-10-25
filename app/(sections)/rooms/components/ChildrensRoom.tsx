import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getChildrensRooms } from "@/lib/firestore/folder/childrensRooms";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function ChildrensRoom() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getChildrensRooms()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Childrens Room
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        To help your kids unwind, why not make playtime part of their evening
        routine? These storage superheroes can help create a space where your
        kids and their toys can both play and rest peacefully.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">Nursery furniture</h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        A baby doesn`t come with instructions, but nursery furniture does. Our
        baby nursery furniture sets provide you the peace of mind you need
        because we test it all against the toughest safety standards. Now let
        your focus be on your little one&apos;s cuteness. Buy IKEA nursery
        furniture sets online!
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Childrens Room Products
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

export default ChildrensRoom;
