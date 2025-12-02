import ProductCardLarge from "@/app/components/ProductCardLarge";
import { TFavorites } from "@/app/favorites/page";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { getFurnitureOffers } from "@/lib/firestore/folder/FurnitureOffers";
import { getUser } from "@/lib/firestore/user/read_server";
import { TProduct } from "@/types/product/product";
import { onAuthStateChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

function FurnitureOnOffer() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);
  const [favoritesLists, setFavoritesLists] = useState<TFavorites[]>([]);
  const [favoriteList, setFavoriteList] = useState<
    { id: string; quantity: number }[]
  >([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

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
      const specialOffers = (await getFurnitureOffers()) as TProduct[];
      setProducts(() => {
        const filtered = specialOffers.filter((p) => p.description !== "");
        return filtered;
      });
    };
    fetchSpecialOffers();
  }, []);

  console.log(products);

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
    <div className="mx-12 my-20">
      <h1 className="my-5 text-4xl">Special offers on furniture</h1>
      <p className="max-w-1/2 text-sm leading-5 text-[#484848]">
        <strong>Grab Your Favourite Products at New Lower Prices!</strong>{" "}
        <br /> Check out our massive selection of products now available at new
        lower prices.Hurry up and grab your favourite products from everyday
        essentials and home furniture to home textiles, decorations, and so much
        more all at unbelievable prices.Happy shopping!
      </p>

      <div className="mt-20 grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-10 overflow-hidden border-t border-b border-[oklch(0.922_0_0)]">
        {visibleProducts.map((product) => (
          <ProductCardLarge
            product={product}
            key={product?.id}
            commonProducts={commonProducts}
            fetchUser={fetchUser}
            favoriteList={favoriteList}
            favoritesLists={favoritesLists}
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

export default FurnitureOnOffer;
