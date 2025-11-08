"use client";

import { getSpecialOffers } from "@/lib/firestore/special-offers/read_server";
import { TProduct } from "@/types/product/product";
import { useCallback, useEffect, useState } from "react";
import CustomScrollSec from "./CustomScrollSec";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSmall from "./ProductCardSmall";
import AuthContextProvider, { useAuth } from "@/context/AutnContext";
import { getUser } from "@/lib/firestore/user/read_server";
import { TFavorites } from "../favorites/page";

export default function ProductSpecialOffers() {
  return (
    <AuthContextProvider>
      <ProductSpecialOffersChild />
    </AuthContextProvider>
  );
}

function ProductSpecialOffersChild() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritesLists, setFavoritesLists] = useState<TFavorites[]>([]);
  const [favoriteList, setFavoriteList] = useState<
    { id: string; quantity: number }[]
  >([]);
  const { user } = useAuth();

  const fetchUser = useCallback(async () => {
    try {
      if (!user?.uid) return;
      const userRef = await getUser({ id: user.uid });
      if (!userRef) return;
      if (!userRef.favorites) return;
      setFavoritesLists(userRef.favorites);
      setFavoriteList(() =>
        userRef.favorites?.map((list: TFavorites) => list.list).flat(),
      );
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;
    fetchUser();
  }, [user?.uid, fetchUser]);

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      setLoading(true);
      const specialOffers = (await getSpecialOffers()) as TProduct[];
      setProducts(specialOffers);
      setLoading(false);
    };
    fetchSpecialOffers();
  }, []);

  if (loading) {
    const array = new Array(8).fill(0);
    return (
      <div className="content mt-20 flex gap-5 overflow-x-scroll">
        {array.map((_, i) => (
          <div
            key={i}
            className="relative flex min-w-46 flex-col items-start gap-3"
          >
            <Skeleton className="h-48 w-[100%] bg-gray-300" />
            <Skeleton className="h-3 w-[60%] bg-gray-300" />
            <Skeleton className="h-4 w-[90%] bg-gray-300" />
            <Skeleton className="h-4 w-[80%] bg-gray-300" />
            <Skeleton className="h-6 w-[70%] bg-gray-300" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <CustomScrollSec>
        {products.slice(0, 16).map((product) => {
          return (
            <ProductCardSmall
              product={product}
              key={product.id}
              favoritesLists={favoritesLists}
              favoriteList={favoriteList}
              fetchUser={fetchUser}
            />
          );
        })}
      </CustomScrollSec>
    </div>
  );
}
