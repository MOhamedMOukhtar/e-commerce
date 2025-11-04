"use client";

import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/firestore/products/read_server";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TProduct } from "@/types/product/product";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TFavorites } from "../page";

type TProductEdit = Omit<TProduct, "featureImage"> & {
  featureImage: string;
};

export default function Product() {
  const [products, setProducts] = useState<TProductEdit[]>([]);
  const [product, setProduct] = useState<TProduct | null>(null);
  const [favorites, setFavorites] = useState<TFavorites>();

  useEffect(() => {
    async function fetchProduct() {
      const product = (await getProduct({
        id: "0RBxd0bzlEyyKieKSpXq",
      })) as TProduct;
      setProduct(product);
    }
    fetchProduct();
  }, []);

  console.log(product);

  if (!product) return <div>loading...</div>;

  // <Image
  //   src={product.featureImage || "/ikean-logo.png"}
  //   width={0}
  //   height={0}
  //   sizes="120px"
  //   style={{ width: "120px", height: "auto" }}
  //   alt={product.title || "dasdasdas asd "}
  // />
  // <Image
  //   src={product.featureImage || "/ikean-logo.png"} // from Firebase
  //   alt="product"
  //   unoptimized
  //   width={200}
  //   height={200}
  // />
  return (
    <div>
      <img
        src={`/${product.featureImage}` || "/ikean-logo.png"}
        alt="Girl in a jacket"
        width="500"
        height="600"
      ></img>
    </div>
  );

  return (
    <div className="mx-12 mt-25">
      <h1 className="text-3xl">{favorites?.listName}</h1>
      <div className="flex gap-20">
        <div className="flex-2">
          <Link href="/favourites" className="space-x-2">
            <Button variant="border" className="my-10 rounded-full">
              <ArrowLeft className="inline-block" />
              <span>Back to Favourites</span>
            </Button>
          </Link>
          <div className="border-b border-black/20 pb-3 font-semibold">
            Buy online
          </div>

          {products.map((product) => (
            <section
              key={product.id}
              className="flex border-b border-black/20 py-10"
            >
              <div className="mr-16">
                <Image
                  src={product.featureImage || "/ikean-logo.png"}
                  width={0}
                  height={0}
                  sizes="120px"
                  style={{ width: "120px", height: "auto" }}
                  alt={product.title}
                />
              </div>
              <div className="relative flex flex-col">
                <span className="absolute">New</span>
                <Link
                  href={`/product/${product.slug}-${product.id}`}
                  className="mt-6 text-sm font-bold"
                >
                  {product.title}
                </Link>
                <span className="text-sm">{product.shortSummary}</span>
              </div>
              <div className="ml-auto text-sm font-bold">
                <span>EGP {formatEGP(product.price)}</span>
              </div>
            </section>
          ))}
        </div>
        <div className="flex-1">
          <p className="font-semibold">Summery</p>
          <div>
            <p>Products</p>
            <span>EGP {formatEGP(39582)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
