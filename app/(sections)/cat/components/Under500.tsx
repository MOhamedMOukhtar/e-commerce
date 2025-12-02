import ProductCardLarge from "@/app/components/ProductCardLarge";
import { TFavorites } from "@/app/favorites/page";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { getUnder500 } from "@/lib/firestore/folder/under500";
import { getUser } from "@/lib/firestore/user/read_server";
import { TProduct } from "@/types/product/product";
import { onAuthStateChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

function Under500() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);
  const [filterProducts, setFilterProducts] = useState<TProduct[]>([]);
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
    async function fetch() {
      const products = (await getUnder500()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

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
        Product under 500
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Be ready for the new chapter in the lower price
      </p>
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-10 overflow-hidden border-b border-[oklch(0.922_0_0)]">
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

export default Under500;
