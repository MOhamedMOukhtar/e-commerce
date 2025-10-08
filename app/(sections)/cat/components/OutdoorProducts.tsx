import { PopupInfo } from "@/app/components/IndicatorPopup";
import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getOutdoorProducts } from "@/lib/firestore/folder/outdoorProducts";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function OutdoorProducts() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getOutdoorProducts()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Outdoor products
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Unlock the potential of your outdoor space with IKEA`s Outdoor Products.
        Explore a selection of patio furniture, garden essentials, and versatile
        outdoor accessories. With a perfect blend of functionality and design,
        find the best solutions for creating stylish and comfortable outdoor
        retreats.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Lazy afternoons and whispering soft hues
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Cushions, blankets, modular lounge seating - all the things you need for
        a cosy afternoon! Relax on your own or catch up with family and friends
        in generous style and comfort while soaking up the late hours of warmth.
        Enjoy the silence, listen to the crickets sing or bring a speaker lamp
        outside and fill the air with your favourite tunes.
      </p>
      <div className="mt-15 flex gap-5 [&>div]:aspect-square [&>div]:w-full">
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/a1584f10ec3886b/original/PH205176.jpg?f=xl"
          props={[
            {
              side: "left",
              align: "center",
              className: "top-[39%] right-[25%]",
              name: "SKUGGSTUBB",
              summery: "Mug",
              previousPrice: "749",
              price: "636",
              id: "94MV0YwAa4GJGOF3BvJh",
            },

            {
              side: "right",
              align: "center",
              className: "top-[34%] left-[20%]",
              name: "HOLMVI",
              summery: "Throw",
              previousPrice: "999",
              price: "849",
              id: "xFFp33QhN0ehnGVnBlFQ",
              active: true,
            },
          ]}
        />
        <PopupInfo img="https://www.ikea.com/ext/ingkadam/m/626e6117826a78c6/original/PH205177.jpg?f=xl" />
      </div>
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

export default OutdoorProducts;
