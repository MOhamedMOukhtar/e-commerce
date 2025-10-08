import { PopupInfo } from "@/app/components/IndicatorPopup";
import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getBabyChildren } from "@/lib/firestore/folder/babyChildren";
import { TProduct } from "@/types/product/product";
import React, { useEffect, useState } from "react";

function BabyChildren() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);
  const [productIfCommon, setProductIfCommon] = useState<TProduct[]>([]);

  // Removed commonIDs from here

  useEffect(() => {
    async function fetch() {
      const products = (await getBabyChildren()) as TProduct[];
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
        Baby & children
      </h1>

      <h2 className="mt-12 mb-4 text-2xl font-bold">
        Bathtime fun delivered with a splash!
      </h2>
      <p className="mb-10 max-w-60/100 text-sm leading-5 text-[#484848]">
        Bring the magic of ocean creatures to life at baby`s bathtime with the
        new ÄNGSHUMLA collection. Featuring a crab, a turtle and a fish who all
        happily live in a whale, these sea-life friends will welcome your baby
        to the water, making bathtime more playful for them _ and you. When the
        bath done, the friendly whale loves to be hung on the wall, ready for
        the next time.
      </p>
      <div className="mt-15 flex gap-5 [&>div]:aspect-square [&>div]:w-full">
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/33c8b1f9e0c89229/original/PE970804.jpg?f=xl"
          props={[
            {
              side: "bottom",
              align: "center",
              className: "top-[26%] left-[43%]",
              name: "ÄNGSHUMLA",
              summery: "4-piece bath toy set",
              price: "599",
              id: "ournMooq5Hae3DHRIkSY",
              active: true,
            },
          ]}
        />
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/5d652ab1c91028d8/original/PE973180.jpg?f=xl"
          props={[
            {
              side: "bottom",
              align: "center",
              className: "top-[14%] left-[40%]",
              name: "LÄTTSAM",
              summery: "Baby bath",
              price: "1199",
              id: "rlkgxd9Qlpdco2hnorA0",
              active: true,
              highlight: true,
            },
          ]}
        />
      </div>
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

export default BabyChildren;
