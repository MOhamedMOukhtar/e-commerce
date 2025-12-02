import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getBathrooms } from "@/lib/firestore/folder/bathrooms";
import { TProduct } from "@/types/product/product";
import { useEffect, useState, useCallback } from "react";
import { TFavorites } from "@/app/favorites/page";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUser } from "@/lib/firestore/user/read_server";

function Bathroom() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);
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
      const products = (await getBathrooms()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Bathroom
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Beautiful details and long-lasting quality _ backed by a 10-year
        guarantee _ make the TÄNNFORSEN bathroom system a statement of your
        unique style. The crafted, traditional expression comes in a selection
        of classic finishes and can be personalised to express your taste.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        The clever way to save water for later
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Now, it`s easy to save water that otherwise goes down the drain and use
        it for other things _ like flushing the toilet, watering plants or
        cleaning. As you turn on the shower, BERGVATTNET diverter directs the
        cold water into the bucket and automatically switches to the hand shower
        when the water gets warm.
      </p>

      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Bathroom Products
      </h2>
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-10 overflow-hidden border-b border-[oklch(0.922_0_0)]">
        {visibleProducts.map((product) => (
          <ProductCardLarge
            product={product}
            key={product?.id}
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

export default Bathroom;
