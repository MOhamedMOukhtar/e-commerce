import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getBookcasesShelvingUnits } from "@/lib/firestore/folder/bookcasesShelvingUnits";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function BookcasesShelvingUnits() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(17);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function fetch() {
      const products = (await getBookcasesShelvingUnits()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  useEffect(() => {
    products.forEach((product) => {
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

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Bookcases & shelving units
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Even though you`re not a book lover, you`ll add book shelves in your
        living room just for the sake of décor. Discover IKEA storage shelves,
        available in different types, designs and colours and add a new touch to
        your space. Buy IKEA shelves now online.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">In it for the long haul</h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Here`s to natural classics that last a long time! Pickles, preserves,
        and of course IVAR _ our durable, solid wood shelf unit from 1968 that`s
        become a modern design favourite. Flexible and adaptive, IVAR is easy to
        adjust, combine, paint (and re-paint) to make it your very own, season
        after season.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Bookcases & shelving units Products
      </h2>
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

export default BookcasesShelvingUnits;
