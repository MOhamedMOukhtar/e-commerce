"use client";

import { getRecommended } from "@/lib/firestore/folder/recommended";
import { TProduct } from "@/types/product/product";
import { useCallback, useEffect, useState } from "react";
import CustomScrollSec from "./CustomScrollSec";
import { getAccessoriesOffers } from "@/lib/firestore/folder/accessoriesOffer";
import { getFurnitureOffers } from "@/lib/firestore/folder/FurnitureOffers";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSmall from "./ProductCardSmall";
import { getUser } from "@/lib/firestore/user/read_server";
import AuthContextProvider, { useAuth } from "@/context/AutnContext";
import { TFavorites } from "../favorites/page";

// Use forwardRef to accept the ref from parent

export default function RecommendedAccessoriesFurniture() {
  return (
    <AuthContextProvider>
      <RecommendedAccessoriesFurniturechild />
    </AuthContextProvider>
  );
}

function RecommendedAccessoriesFurniturechild() {
  const [active, setActive] = useState("recommended");
  const [recommended, setRecommended] = useState<TProduct[]>([]);
  const [accessories, setAccessories] = useState<TProduct[]>([]);
  const [furniture, setFurniture] = useState<TProduct[]>([]);
  const [favoritesLists, setFavoritesLists] = useState<TFavorites[]>([]); // here
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecommended = async () => {
      setLoading(true);
      const recommended = (await getRecommended()) as TProduct[];
      setRecommended(recommended);
      setLoading(false);
    };
    const fetchAccessoriesOffers = async () => {
      const accessories = (await getAccessoriesOffers()) as TProduct[];
      setAccessories(accessories.slice(0, 12));
    };
    const fetchFurnitureOffers = async () => {
      const furniture = (await getFurnitureOffers()) as TProduct[];
      setFurniture(furniture.slice(0, 12));
    };

    fetchRecommended();
    fetchAccessoriesOffers();
    fetchFurnitureOffers();
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      if (!user?.uid) return;
      const userRef = await getUser({ id: user.uid });
      if (!userRef) return;
      setFavoritesLists(userRef.favorites);
      setFavoriteList(
        () => userRef.favorites?.map((list: TFavorites) => list.list).flat(), // here
      );
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;
    fetchUser();
  }, [user?.uid, fetchUser]);

  const product =
    active === "recommended"
      ? recommended
      : active === "accessories"
        ? accessories
        : furniture;

  if (loading) {
    const array = new Array(8).fill(0);
    return (
      <div className="content my-20 flex gap-5 overflow-x-scroll">
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
    <div className="mb-10">
      <div className="flex border-b font-semibold text-black/50 [&>div]:cursor-pointer [&>div]:px-2 [&>div]:pb-3 [&>div]:hover:text-black/80">
        <div
          className={`${active === "recommended" ? "border-b-2 border-[#0058A3] text-black/80" : ""}`}
          onClick={() => setActive("recommended")}
        >
          Recommended for you
        </div>
        <div
          className={`${active === "accessories" ? "border-b-2 border-[#0058A3] text-black/80" : ""}`}
          onClick={() => setActive("accessories")}
        >
          Accessories in offer
        </div>
        <div
          className={`${active === "furniture" ? "border-b-2 border-[#0058A3] text-black/80" : ""}`}
          onClick={() => setActive("furniture")}
        >
          Furniture in offer
        </div>
      </div>
      <CustomScrollSec>
        {product.map((product) => (
          <ProductCardSmall
            fetchUser={fetchUser}
            key={product.id}
            product={product}
            favoritesLists={favoritesLists}
            favoriteList={favoriteList}
          />
        ))}
      </CustomScrollSec>
    </div>
  );
}
