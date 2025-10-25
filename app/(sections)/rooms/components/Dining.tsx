import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getDining } from "@/lib/firestore/folder/dining";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function Dining() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getDining()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Dining Room
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        The MÄVINN plates and vases are handcrafted, creating jobs for
        Indigenous and tribal groups in Thailand. And the MÄVINN table-runner is
        woven, hand-embroidered, and hand-tasselled to improve the livelihood of
        women artisans in rural India. Getting something new for the home has
        never felt so good!
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold"> Dining tables</h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Dining tables are the heroes of the home. They play so many roles from
        home office to game central to, well, the place you eat your meals. You
        can have a table from 2 seats up to 4, 6, 8 & 10 seats. Some are also
        extendable tables. So find your style and buy modern dining room set
        online.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Dining Room Products
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

export default Dining;
