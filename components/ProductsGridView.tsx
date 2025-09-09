import AuthContextProvider from "@/context/AutnContext";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

interface TItem {
  id: string;
  title: string;
  price: number;
  stock: number;
  orders: number;
  featureImage: string;
  timestampCreate: string;
}

function ProductsGridView({ products }: { products: TItem[] }) {
  return (
    <section className="flex w-full justify-center">
      <div className="flex max-w-[900px] flex-col gap-5 p-5">
        <h1 className="text-center text-lg font-semibold">Products</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4">
      <div className="relative w-full">
        <Image
          src={product?.featureImage}
          className="h-48 w-full rounded-lg object-cover"
          alt={product?.title}
          width={500}
          height={500}
        />
        <div className="absolute top-1 right-1">
          {/* <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider> */}
        </div>
      </div>
      <Link href={`/products/${product?.id}`}>
        <h1 className="mb-2 line-clamp-2 text-sm font-semibold">
          {product?.title}
        </h1>
        <p className="text-xs text-gray-500">{product.summary}</p>
      </Link>
      <div className="">
        <h2 className="text-sm font-semibold text-green-500">
          ₹ {product?.salePrice}{" "}
          <span
            className={`text-xs text-gray-600 ${product?.salePrice && "line-through"} `}
          >
            ₹ {product?.price}
          </span>
        </h2>
      </div>
      <p className="line-clamp-2 text-xs text-gray-500">
        {product?.shortDescription}
      </p>
      <Suspense>{/* <RatingReview product={product} /> */}</Suspense>
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="rounded-lg text-xs font-semibold text-red-500">
            Out Of Stock
          </h3>
        </div>
      )}
      <div className="flex w-full items-center gap-4">
        <div className="w-full">
          <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
            <button className="w-full flex-1 rounded-lg bg-blue-500 px-4 py-2 text-xs text-white">
              Buy Now
            </button>
          </Link>
        </div>
        {/* <AuthContextProvider> */}
        {/* <AddToCartButton productId={product?.id} /> */}
        {/* </AuthContextProvider> */}
      </div>
    </div>
  );
}

export default ProductsGridView;
