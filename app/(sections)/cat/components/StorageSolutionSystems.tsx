import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getStorageSolutionSystems } from "@/lib/firestore/folder/storageSolutionSystems";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function StorageSolutionSystems() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(17);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    async function fetch() {
      const products = (await getStorageSolutionSystems()) as TProduct[];
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
        Storage solution systems
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Small spaces ask for high organization skills. IKEA storage solutions
        have your back in keeping your home tidy. They also add a touch of
        edginess to your home décor. You`ll find a wide range of storage
        solution systems to satisfy every taste with different sizes, shapes and
        colors. Buy now online!
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        This year`s most flexible storage system!
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Not only does LÅDMAKARE storage system strike a great balance between
        open and closed storage. Since changing placement of the doors is easily
        done, you also have final say on the design. All in all, it`s a clever
        way to combine the function you need _ and a look you love.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Storage solution systems Products
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

export default StorageSolutionSystems;
