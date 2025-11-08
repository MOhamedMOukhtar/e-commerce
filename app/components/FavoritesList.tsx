import { useEffect, useState } from "react";
import { TFavorites } from "../favorites/page";
import { getProduct } from "@/lib/firestore/products/read_server";
import { TProduct } from "@/types/product/product";
import Image from "next/image";

function FavoritesList({
  fav,
  handleAddToList,
  handleMoveAllItems,
  btnLoading,
  handleMoveOneItem,
}: {
  fav: TFavorites;
  handleAddToList?: (listId: string) => Promise<void>;
  handleMoveAllItems?: (toListId: string) => Promise<void>;
  btnLoading?: boolean;
  handleMoveOneItem?: (tragetListId: string) => Promise<void>;
}) {
  const [product, setProduct] = useState<TProduct | null>(null);
  useEffect(() => {
    async function fetchProducts() {
      if (fav.list.length >= 1) {
        const product = await getProduct({ id: fav.list[0].id });
        setProduct(product as TProduct);
      } else {
        setProduct(null);
      }
    }
    fetchProducts();
  }, [fav]);

  return (
    <div
      className={`flex cursor-pointer items-center gap-4 border px-10 py-6 font-semibold hover:border-black/40 ${btnLoading && "pointer-events-none opacity-30"}`}
      onClick={() => {
        if (handleAddToList) {
          handleAddToList(fav.id);
        }
        if (handleMoveAllItems) {
          handleMoveAllItems(fav.id);
        }
        if (handleMoveOneItem) {
          handleMoveOneItem(fav.id);
        }
      }}
    >
      <div className={`flex h-9 w-9 items-center justify-center`}>
        {product ? (
          <Image
            src={
              typeof product?.featureImage === "string"
                ? product.featureImage
                : "/ikean.png"
            }
            width={50}
            height={50}
            alt={product?.title as string}
            className="object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            width="24"
            height="24"
            aria-hidden="true"
            opacity={0.5}
          >
            <path
              d="m2.1213 2.121 19.7989 19.7991-1.4141 1.4142-3.3345-3.3345H3.0002V5.8284L.7071 3.5353 2.1213 2.121zm13.0503 15.8788-2-2H6.5002l2.6685-4.0029-4.1685-4.1685v10.1714h10.1714z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
            <path d="m6.8284 3.9998 2 2h10.1718v10.1718l2 2V3.9998H6.8284z"></path>
            <path d="M14.0002 9.4998c0 .8284.6716 1.5 1.5 1.5s1.5-.6716 1.5-1.5c0-.8285-.6716-1.5-1.5-1.5s-1.5.6715-1.5 1.5z"></path>
          </svg>
        )}
      </div>
      <div>{fav.listName}</div>
    </div>
  );
}

export default FavoritesList;
