"use client";

import { getProduct } from "@/lib/firestore/products/read_server";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TProduct } from "@/types/product/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type TProductEdit = Omit<TProduct, "featureImage"> & {
  featureImage: string;
};

export default function ProductInFavourites({
  product,
}: {
  product: TProductEdit;
}) {
  return (
    <section className="flex border-b border-black/20 py-10">
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
  );
}

// function ProductInFavourites({ productId }: { productId: string }) {
//   const [product, setProduct] = useState<TProductEdit>();

//   useEffect(() => {
//     async function fetchProducts() {
//       const product = (await getProduct({ id: productId })) as TProductEdit;
//       setProduct(product);
//     }
//     fetchProducts();
//   }, [productId]);

//   if (!product) return null;

//   return (
//     <section className="flex border-b border-black/20 py-10">
//       <div className="mr-16">
//         <Image
//           src={product.featureImage || "/ikean-logo.png"}
//           width={0}
//           height={0}
//           sizes="120px"
//           style={{ width: "120px", height: "auto" }}
//           alt={product.title}
//         />
//       </div>
//       <div className="relative flex flex-col">
//         <span className="absolute">New</span>
//         <Link
//           href={`/product/${product.slug}-${product.id}`}
//           className="mt-6 text-sm font-bold"
//         >
//           {product.title}
//         </Link>
//         <span className="text-sm">{product.shortSummary}</span>
//       </div>
//       <div className="ml-auto text-sm font-bold">
//         <span>EGP {formatEGP(product.price)}</span>
//       </div>
//     </section>
//   );
// }

// export default ProductInFavourites;

/*
<section key={product.id} className="flex border-b border-black/20 py-10">
      <div className="mr-16">
        <Image
          src={
            typeof product.featureImage === "string"
              ? product.featureImage
              : "ikean-logo.png"
          }
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
*/
