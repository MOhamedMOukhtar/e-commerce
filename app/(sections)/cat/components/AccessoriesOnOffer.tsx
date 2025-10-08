import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getAccessoriesOffers } from "@/lib/firestore/folder/accessoriesOffer";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function AccessoriesOnOffer() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16); // show first 6 only

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      const specialOffers = (await getAccessoriesOffers()) as TProduct[];
      setProducts(specialOffers);
    };
    fetchSpecialOffers();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 my-20">
      <h1 className="my-5 text-4xl">Special offers on accessories</h1>
      <p className="max-w-1/2 text-sm leading-5 text-[#484848]">
        <strong>Grab Your Favourite Products at New Lower Prices!</strong>{" "}
        <br /> Check out our massive selection of products now available at new
        lower prices.Hurry up and grab your favourite products from everyday
        essentials and home furniture to home textiles, decorations, and so much
        more all at unbelievable prices.Happy shopping!
      </p>

      <div className="mt-20 grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-10 overflow-hidden border-t border-b border-[oklch(0.922_0_0)]">
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

export default AccessoriesOnOffer;
