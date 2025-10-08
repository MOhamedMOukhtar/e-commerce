import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getSofasArmchairs } from "@/lib/firestore/folder/SofasArmchairs";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function SofasArmchairsOnOffers() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);
  const [productIfCommon, setProductIfCommon] = useState<TProduct[]>([]);

  // Removed commonIDs from here

  useEffect(() => {
    async function fetch() {
      const products = (await getSofasArmchairs(true)) as TProduct[];
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

  const visibleProducts = productIfCommon.slice(0, visibleCount);

  useEffect(() => {
    const commonIDs: string[] = [];
    products.forEach((pro) => {
      if (!pro.commonID) {
        setProductIfCommon((prev) => [...prev, pro]);
      } else {
        if (commonIDs.includes(pro.commonID)) return;
        commonIDs.push(pro.commonID);
        setProductIfCommon((prev) => [...prev, pro]);
      }
    });
  }, [products]);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Sofas & armchairs on offer
      </h1>

      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Sofa, bed and storage _ all in one
      </h2>
      <p className="mb-10 max-w-60/100 text-sm leading-5 text-[#484848]">
        It`s easier to have guests staying over when your affordable comfy sofa
        doubles as a comfy bed. Especially when it includes space to store
        things like bedding.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Decoration Products
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
          Showing {visibleProducts.length} of {productIfCommon.length} results
        </p>
        <progress
          value={visibleProducts.length}
          max={productIfCommon.length}
          className="progress mt-3 h-[2px] w-50 bg-stone-700"
        />
      </div>
      {visibleProducts.length === productIfCommon.length || (
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

export default SofasArmchairsOnOffers;
