import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getCollection } from "@/lib/firestore/collection/read_server";
import { getProduct } from "@/lib/firestore/products/read_server";
import { TCollection } from "@/types/collection/collection";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function WingChair() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);
  const [filterProducts, setFilterProducts] = useState<TProduct[]>([]);
  const [productId, setProductId] = useState<string[]>([]);

  useEffect(() => {
    async function fetch() {
      const products = (await getCollection(
        "oqRFonlYRHL80NHG1UlT",
      )) as TCollection;
      setProductId(products.products);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetchAll() {
      const data = await Promise.all(
        productId.map((product) => getProduct({ id: product })),
      );
      setProducts(data as TProduct[]);
    }
    fetchAll();
  }, [productId]);

  useEffect(() => {
    products.forEach((product) => {
      if (product.description) {
        setFilterProducts((prev) => [...prev, product]);
      }
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

  const visibleProducts = filterProducts.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Flexible wing chair
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Put your feet up in the air. Gently place them on a pouffe. Simple
        pleasures don`t come much simpler. That said, it`s no idle bystander.
        Besides adding colour and style, you can activate pouffes as extra
        seating, handy hidden storage or side tables. Some are even stackable.
        How`s that for a multitasker.
      </p>
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
          Showing {visibleProducts.length} of {filterProducts.length} results
        </p>
        <progress
          value={visibleProducts.length}
          max={filterProducts.length}
          className="progress mt-3 h-[2px] w-50 bg-stone-700"
        />
      </div>
      {visibleProducts.length === filterProducts.length || (
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

export default WingChair;
