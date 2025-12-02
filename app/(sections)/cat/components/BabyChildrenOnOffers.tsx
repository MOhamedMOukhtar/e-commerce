import ProductCardLarge from "@/app/components/ProductCardLarge";
import { getBabyChildren } from "@/lib/firestore/folder/babyChildren";
import { TProduct } from "@/types/product/product";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { TFavorites } from "@/app/favorites/page";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUser } from "@/lib/firestore/user/read_server";

function BabyChildrenOnOffers() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [commonProducts, setCommonProducts] = useState<TProduct[]>([]);
  const [productIfCommon, setProductIfCommon] = useState<TProduct[]>([]);
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

  // Removed commonIDs from here

  useEffect(() => {
    async function fetch() {
      const products = (await getBabyChildren(true)) as TProduct[];
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
        Baby & children on offer
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

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Decoration Products
      </h2>
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

export default BabyChildrenOnOffers;
