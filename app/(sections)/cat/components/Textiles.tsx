import { PopupInfo } from "@/app/components/IndicatorPopup";
import ProductCardLarge from "@/app/components/ProductCardLarge";
import { TFavorites } from "@/app/favorites/page";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { getTextiles } from "@/lib/firestore/folder/textiles";
import { getUser } from "@/lib/firestore/user/read_server";
import { TProduct } from "@/types/product/product";
import { onAuthStateChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

function Textiles() {
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
      const products = (await getTextiles()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12 mb-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Textiles
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Dive into the realm of home comfort with IKEA`s selection of Textiles!
        Explore a diverse range of high-quality fabrics, from soft bedding and
        elegant curtains to eye-catching rugs. With a focus on both
        functionality and design, IKEA provides versatile textile options to
        upgrade your home.
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        For chilly mornings and starry nights
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Drape yourself in DAGGKÅPOR, a soft, light blanket that’s perfect to
        throw around your shoulders when al fresco dining gets a little chilly.
        Just as comfy to crawl under when you want to snuggle on the sofa or lie
        down for a well-deserved nap on the bed.​
      </p>
      <div className="mt-15 flex gap-5 [&>div]:aspect-square [&>div]:w-full">
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/5f3d8edaf9273716/original/PH204569.jpg?f=xl"
          props={[
            {
              side: "top",
              align: "center",
              className: "top-[50%] right-[38%]",
              name: "DAGGKÅPOR",
              summery: "Throw",
              price: "599",
              previousPrice: "509",
              id: "Bt5Z3eRBF3f4rgZd8VrM",
              active: true,
            },
            {
              side: "right",
              align: "center",
              className: "top-[55%] left-[30%]",
              name: "HAVSTEN",
              summery: "Armchair, outdoor",
              price: "22495",
              id: "qxtUyjSiFuaUOex47QWa",
            },
          ]}
        />
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/164bbf75c58d85c3/original/PH204568.jpg?f=xl"
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[52%] left-[48%]",
              name: "DAGGKÅPOR",
              summery: "Throw",
              price: "599",
              previousPrice: "509",
              id: "NMUkqctMySGVgpjk7H3B",
              active: true,
            },
          ]}
        />
      </div>
      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Textiles Products
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

export default Textiles;
