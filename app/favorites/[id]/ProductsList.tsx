"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Ellipsis,
  Minus,
  PenLine,
  Plus,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TFavorites } from "../page";
import { ShopPlus } from "@/components/icons/Shop";
import { TProduct } from "@/types/product/product";
import { getProduct } from "@/lib/firestore/products/read_server";
import { getUser } from "@/lib/firestore/user/read_server";
import { TUser } from "./page";
import FavoritesSidebar from "../components/FavoritesSidebar";

import FavoritesList from "@/app/components/FavoritesList";
import {
  deleteFavoriteList,
  moveAllItems,
  updateListName,
} from "@/lib/firestore/user/write";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import ProductInFavorites from "./ProductInFavorites";
import { Skeleton } from "@mui/material";

export type TProductEdit = Omit<TProduct, "featureImage"> & {
  featureImage: string;
};

export default function ProductsList({
  userId,
  listId,
}: {
  userId: string | null;
  listId: string;
}) {
  const [user, setUser] = useState<TUser | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [fetchProduct, setFetchProduct] = useState<boolean>(false);
  const [products, setProducts] = useState<TProductEdit[]>([]);
  const [favoriteList, setFavoriteList] = useState<TFavorites>({
    id: "",
    listName: "",
    list: [],
  });

  useEffect(() => {
    if (userId) return;
    const localFavorites = JSON.parse(
      localStorage.getItem("favoriteList") as string,
    );

    const targetList = localFavorites.find(
      (list: TFavorites) => list.id === listId,
    );

    if (targetList) {
      setFavoriteList(targetList);
    }

    if (targetList.list.length === 0) {
      setTotalPrice(0);
      setFetchProduct(true); // mark fetch complete
      return;
    }

    async function fetchProduct() {
      const results = await Promise.all(
        targetList.list.map(async (item: { id: string; quantity: number }) => {
          const product = (await getProduct({ id: item.id })) as TProductEdit;
          return { ...product, quantity: item.quantity };
        }),
      );

      setProducts(results);

      let total = 0;
      results.forEach((product) => {
        total += (product.salePrice || product.price) * product.quantity;
      });

      setTotalPrice(total);
      setFetchProduct(true);
    }

    fetchProduct();
  }, []);

  async function fetchUserAndProducts() {
    if (!userId) {
      const localFavorites: TFavorites[] = JSON.parse(
        localStorage.getItem("favoriteList") as string,
      );

      const favouriteList = localFavorites.find((list) => list.id === listId);
      if (!favouriteList) return;

      const results = await Promise.all(
        favouriteList.list.map(async (item) => {
          const product = (await getProduct({ id: item.id })) as TProductEdit;
          return { ...product, quantity: item.quantity };
        }),
      );

      setProducts(results);

      console.log(results);

      let total = 0;
      results.forEach((product) => {
        total += (product.salePrice || product.price) * product.quantity;
      });

      setTotalPrice(total);
      setFetchProduct(true);
      return;
    }
    try {
      const user = (await getUser({ id: userId })) as TUser;
      setUser(user);

      const favouriteList = user?.favorites.find((list) => list.id === listId);
      if (!favouriteList) return;

      setFavoriteList(favouriteList);

      if (favouriteList.list.length === 0) {
        setTotalPrice(0);
        setFetchProduct(true); // mark fetch complete
        return;
      }

      const results = await Promise.all(
        favouriteList.list.map(async (item) => {
          const product = (await getProduct({ id: item.id })) as TProductEdit;
          return { ...product, quantity: item.quantity };
        }),
      );

      setProducts(results);

      let total = 0;
      results.forEach((product) => {
        total += (product.salePrice || product.price) * product.quantity;
      });

      setTotalPrice(total);
      setFetchProduct(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUserAndProducts();
  }, []);

  const length = favoriteList.list.length || 3;

  // loading
  if (!fetchProduct)
    return (
      <>
        <Skeleton variant="rectangular" height={40} width={350} />
        <div className="mt-10 flex gap-25">
          <div className="flex-2">
            <div className={`mb-10 flex items-center justify-between`}>
              <Button variant="border" className="w-[161px] rounded-full">
                <span
                  className={`animate-ball-bounce-x-small block h-2 w-2 rounded-full bg-black`}
                />
              </Button>
              <span
                className={`animate-ball-bounce-x-small block h-2 w-2 rounded-full bg-black`}
              />
            </div>

            <div className="flex items-center gap-5 border-b border-black/20 pb-3 font-semibold">
              <span>Buy online </span>
              <Skeleton variant="rectangular" height={18} width={80} />
            </div>
            <div className={`flex flex-col`}>
              {Array.from({ length: length }).map((_, length) => {
                return (
                  <section
                    key={length}
                    className={`relative flex origin-top cursor-pointer border-b border-black/20 py-10 transition-all duration-300 ease-in-out`}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={120}
                      width={120}
                      className="mr-16"
                    />
                    <div className="relative flex flex-col">
                      <Skeleton
                        width={100}
                        variant="rectangular"
                        height={20}
                        className="mb-1"
                      />
                      <Skeleton
                        width={200}
                        variant="rectangular"
                        height={15}
                        className="mb-2"
                      />
                      <Skeleton width={150} variant="rectangular" height={15} />

                      <div className="mt-auto flex items-center gap-6">
                        <div className="flex items-center gap-5 rounded-full border border-black p-[3px] opacity-20">
                          <button>
                            <Minus
                              className={`box-content rounded-full p-1.5`}
                              size={16}
                            />
                          </button>
                          <span>0</span>
                          <button>
                            <Plus
                              className={`box-content rounded-full p-1.5`}
                              size={16}
                            />
                          </button>
                        </div>

                        <span
                          className={`animate-ball-bounce-x-small block h-2 w-2 rounded-full bg-black`}
                        />
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between text-sm font-bold">
                      <Skeleton width={100} variant="rectangular" height={20} />
                      <span
                        className={`animate-ball-bounce-x-small block h-2 w-2 rounded-full bg-black`}
                      />
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton variant="rectangular" height={20} width={110} />
            <div className="flex justify-between text-black/80">
              <Skeleton variant="rectangular" height={20} width={90} />
              <Skeleton variant="rectangular" height={24} width={130} />
            </div>
            <Skeleton variant="rectangular" height={2} />
            <div className="flex justify-between">
              <Skeleton variant="rectangular" height={25} width={120} />
              <Skeleton variant="rectangular" height={40} width={180} />
            </div>
            <Button
              variant={"default"}
              className="mt-7 cursor-default rounded-full border-[#004f93] bg-[#004f93] py-6 hover:bg-[#004f93]"
            >
              <span
                className={`animate-ball-bounce-small block h-2 w-2 rounded-full bg-white`}
              />
            </Button>
          </div>
        </div>
      </>
    );

  return (
    <>
      <h1 className="text-4xl">
        {favoriteList.listName}
        {favoriteList.list.length === 0 && " is empty"}
      </h1>
      <ProductsListChild
        userId={userId}
        listId={listId}
        favoriteList={favoriteList}
        setFavoriteList={setFavoriteList}
        fetchUser={fetchUserAndProducts}
        user={user}
        totalPrice={totalPrice}
        products={products}
      />
    </>
  );
}

function ProductsListChild({
  userId,
  listId,
  favoriteList,
  setFavoriteList,
  fetchUser,
  user,
  totalPrice,
  products,
}: {
  userId: string | null;
  listId: string;
  favoriteList: TFavorites;
  setFavoriteList: React.Dispatch<React.SetStateAction<TFavorites>>;
  fetchUser: () => Promise<void>;
  user: TUser | null;
  totalPrice: number;
  products: TProductEdit[];
}) {
  const [showInfo, setShowInfo] = useState<string>("");
  const [changeName, setChangeName] = useState<boolean>(false);
  const [createList, setCreateList] = useState<string>();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [favorites, setFavorites] = useState<TFavorites[]>([]);

  const localFavorites: TFavorites[] = JSON.parse(
    window.localStorage.getItem("favoriteList") || "[]",
  );

  const router = useRouter();

  useEffect(() => {
    setListName(favoriteList.listName);
  }, [favoriteList]);

  async function handleChangeListName() {
    setBtnLoading(true);
    if (!userId) {
      const localLists = window.localStorage.getItem("favoriteList");
      let localListsArray: TFavorites[] = [];
      if (localLists) {
        localListsArray = JSON.parse(localLists);
      }
      const newList = localListsArray.map((list) => {
        if (list.id === favoriteList.id) {
          setFavoriteList((prev) => ({ ...prev, listName }));
          return { ...list, listName };
        }
        return list;
      });
      window.localStorage.setItem("favoriteList", JSON.stringify(newList));
      setBtnLoading(false);
      setShowInfo("");
      setChangeName(false);
      toast.success(`Your list name was changed to ${listName}`);
      return;
    }

    await updateListName(userId, listId, listName);
    await fetchUser();
    setBtnLoading(false);
    setShowInfo("");
    setChangeName(false);
    toast.success(`Your list name was changed to ${listName}`);
  }

  // move all items from one list to another
  async function handleMoveAllItems(targetList: string) {
    if (!userId) {
      const localLists = JSON.parse(
        window.localStorage.getItem("favoriteList") as string,
      );
      let localListsArray: TFavorites[] = [];
      if (localLists) {
        localListsArray = localLists;
      }
      const fromIndex = localListsArray.findIndex(
        (f: TFavorites) => f.id === listId,
      );
      const toIndex = localListsArray.findIndex(
        (f: TFavorites) => f.id === targetList,
      );
      if (fromIndex === -1 || toIndex === -1)
        return console.error("List not found");

      const fromList = localListsArray[fromIndex].list || [];
      const toList = localListsArray[toIndex].list || [];

      // Merge quantities
      const mergedList = [...toList];
      for (const item of fromList) {
        const existing = mergedList.find((i) => i.id === item.id);
        if (existing) existing.quantity += item.quantity;
        else mergedList.push(item);
      }

      const updatedFavorites = [...localListsArray];
      updatedFavorites[toIndex].list = mergedList;
      updatedFavorites[fromIndex].list = [];

      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(updatedFavorites),
      );

      // setFavorites(updatedFavorites);

      setFavoriteList((prev) => ({ ...prev, list: [] }));
      setShowInfo("");

      toast.success("All items moved successfully");
      return;
    }
    setBtnLoading(true);
    await moveAllItems({
      uid: userId,
      fromListId: listId,
      toListId: targetList,
    });
    setBtnLoading(false);
    setShowInfo("");
    await fetchUser();
    const fromName = favoriteList.listName;
    const toName =
      user?.favorites.find((f) => f.id === targetList)?.listName ||
      "another list";
    toast.success(`Your items in ${fromName} were moved to ${toName}`);
  }

  // remove list
  async function handleRemove() {
    if (!userId) {
      handleRemoveFromLocalStorage(listId);
      router.push("/favorites");
      // setConfirm(false);
      // setShowInfo("");
      toast.success(`Your list was removed successfully`);
      return;
    }

    setBtnLoading(true);
    await deleteFavoriteList({ uid: userId, listId });
    setBtnLoading(false);
    router.push("/favorites");
    setConfirm(false);
    setShowInfo("");
  }

  // handle remove from local storage
  function handleRemoveFromLocalStorage(listId: string) {
    if (typeof window === "undefined") return;
    const favoriteLists = window.localStorage.getItem("favoriteList");
    let favoriteListsArray: TFavorites[] = [];
    if (favoriteLists) {
      favoriteListsArray = JSON.parse(favoriteLists);
    }
    const newList = favoriteListsArray.filter((list) => list.id !== listId);
    window.localStorage.setItem("favoriteList", JSON.stringify(newList));
  }

  // disable scroll when showInfo is true
  useEffect(() => {
    const body = document.body;
    if (showInfo) {
      body.style.overflowY = "hidden";
      body.style.paddingRight = "15px";
    } else {
      body.style.overflowY = "auto";
      body.style.paddingRight = "0";
    }
  }, [showInfo, user]);

  function handleCreateList(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      if (typeof window === "undefined") return;

      const newList = {
        id: uuidv4(),
        listName,
        list: [],
      };

      const favoriteLists = window.localStorage.getItem("favoriteList");
      let favoriteListsArray: TFavorites[] = [];

      if (favoriteLists) {
        favoriteListsArray = JSON.parse(favoriteLists);
      }

      favoriteListsArray.push(newList);

      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(favoriteListsArray),
      );

      setCreateList("");
      setShowInfo("moveAll");

      // toast.success(`"${listName}" has been created`);

      return;
    }
  }

  return (
    <div className="mt-10 flex gap-25">
      <div className="flex-2">
        <div
          className={`mb-10 flex items-center ${favoriteList.list.length > 0 ? "justify-between" : "justify-start gap-5"}`}
        >
          <Link href="/favorites" className="space-x-2">
            <Button variant="border" className="rounded-full">
              <ArrowLeft className="inline-block" />
              <span>Back to Favorites</span>
            </Button>
          </Link>
          <button onClick={() => setShowInfo("settings")}>
            <Ellipsis
              size={18}
              className="box-content cursor-pointer rounded-full p-2.5 hover:bg-[#dfdfdf]"
            />
          </button>
        </div>
        {favoriteList.list.length > 0 ? (
          <>
            <div className="border-b border-black/20 pb-3 font-semibold">
              Buy online
              <span className="text-muted-foreground ml-3 text-sm">
                {favoriteList.list.length} item
                {favoriteList.list.length > 1 && "s"}
              </span>
            </div>
            <div className={`flex flex-col`}>
              {products.map((product) => (
                <ProductInFavorites
                  key={product.id}
                  user={user}
                  product={product}
                  userId={userId}
                  favouriteId={favoriteList.id}
                  fetchUser={fetchUser}
                  objectList={favoriteList.list}
                  setFavoriteList={setFavoriteList}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-6/10 text-black/70">
            This list is empty at the moment. Explore our vast selection and
            save the treasures you love, ready to transform your home when the
            time is right. We&apos;ll keep them safe here until you&apos;re
            ready to make them yours!
          </div>
        )}
      </div>
      {favoriteList.list.length > 0 && (
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-sm font-bold">Summery</p>
          <div className="flex justify-between text-sm text-black/80">
            <p>Products</p>
            <span className="text-base">EGP {formatEGP(totalPrice)}</span>
          </div>
          <span className="block h-0.5 bg-black" />
          <div className="flex justify-between">
            <p className="font-semibold">Total incl. VAT</p>
            <div className="flex font-bold">
              <span className="relative top-0.5 text-base">EGP</span>
              <span className="text-4xl">{formatEGP(totalPrice)}</span>
            </div>
          </div>
          <Button
            variant={"default"}
            className="mt-7 rounded-full border-[#004f93] bg-[#004f93] py-6 hover:border-[#004683] hover:bg-[#004683]"
          >
            <ShopPlus />
            Add all items to bag
          </Button>
        </div>
      )}
      {/* settings */}
      <FavoritesSidebar setShowInfo={setShowInfo} showInfo={showInfo}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "settings" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <h3 className="m-auto self-center">{favoriteList.listName}</h3>
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="flex h-full flex-col text-[15px] [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div]:border-b [&>div]:border-black/10 [&>div]:py-7">
            {favoriteList.list.length >= 1 && (
              <div
                className="cursor-pointer font-semibold hover:underline"
                onClick={() => {
                  setShowInfo("moveAll");
                }}
              >
                <ArrowRight size={20} /> Move all items to another list
              </div>
            )}

            <div
              className="cursor-pointer font-semibold hover:underline"
              onClick={() => {
                setListName(favoriteList.listName);
                setChangeName(true);
                setCreateList("");
              }}
            >
              <PenLine size={16} /> Change name of list
            </div>
            <div
              className="cursor-pointer font-semibold hover:underline"
              onClick={() => setConfirm(true)}
            >
              <Trash2 size={16} /> Remove list
            </div>
            {favoriteList.list.length > 0 && (
              <Button
                variant={"default"}
                className="mt-auto w-full rounded-full border-[#004f93] bg-[#004f93] py-6 hover:border-[#004683] hover:bg-[#004683]"
              >
                <ShopPlus />
                Add all items to bag
              </Button>
            )}
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "moveAll" ? "translate-x-0" : "translate-x-full"} flex flex-col ps-6 pt-6`}
        >
          <div className="flex items-center justify-between pe-5">
            <button
              onClick={() => setShowInfo("settings")}
              className="cursor-pointer"
            >
              <ArrowLeft size={20} opacity={0.6} strokeWidth={3} />
            </button>
            <h3 className="m-auto self-center">Move all items</h3>
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="mt-10 flex flex-1 flex-col overflow-y-auto pr-6">
            <h2>Which list should we move all items to?</h2>
            <div className="mt-10 flex flex-col gap-5">
              {(user ? user.favorites : localFavorites)
                ?.slice()
                .reverse()
                .filter((favorite) => favorite.id !== listId)
                .map((favorite) => (
                  <FavoritesList
                    key={favorite.id}
                    fav={favorite}
                    btnLoading={btnLoading}
                    handleMoveAllItems={handleMoveAllItems}
                  />
                ))}
            </div>
          </div>
          {user && user.favorites.length === 10 ? null : (
            <>
              {user ? (
                user.favorites.length === 10
              ) : localFavorites.length === 10 ? (
                <div className="-ml-6 rounded-[4px] border-l-4 border-[#f26a2f] shadow-[3px_8px_10px_rgba(0,0,0,0.08)]">
                  <div className="flex gap-3 p-4">
                    <TriangleAlert color="#f26a2f" className="shrink-0" />
                    <div>
                      <p className="mb-1 font-semibold">List limit reached</p>
                      <p className="text-sm text-gray-600">
                        Please remove one favourite list to be able to add more
                        lists. The number of products within each list is not
                        affected by this limit, so you can still add to or edit
                        the existing ones.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={"/favorites"}
                    className="float-right me-4 cursor-pointer rounded-full px-4 py-1 text-sm font-semibold hover:bg-[#dfdfdf]"
                  >
                    Go to favorites
                  </Link>
                </div>
              ) : (
                <Button
                  variant={"border"}
                  className="my-6 me-6 rounded-full py-6"
                  onClick={() => {
                    setShowInfo("create");
                    setListName("");
                  }}
                >
                  <svg
                    viewBox="0 0 22 22"
                    focusable="false"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M20 2H4v20h10v-2H6V4h12v8h2V2z"></path>
                    <path d="M18 14v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2zM8 6h8v2H8V6zm5 4H8v2h5v-2z"></path>
                  </svg>
                  Create new list
                </Button>
              )}
            </>
          )}
        </div>
        {/* create new list */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-0 h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "create" ? "translate-x-0" : "translate-x-full"} flex flex-col py-6 ps-6`}
        >
          <div className="flex items-center justify-between pe-1">
            <button
              onClick={() => setShowInfo("moveAll")}
              className="cursor-pointer"
            >
              <ArrowLeft size={20} opacity={0.6} strokeWidth={3} />
            </button>
            <h3>Create a new list</h3>
            <button
              onClick={() => {
                setShowInfo("");
                // setIsLoading(false);
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <form onSubmit={handleCreateList} className="flex h-full flex-col">
            <h4 className="text-md text-muted-foreground py-10">
              Why not name it after a room, theme, or project you have in mind?
            </h4>
            <label
              htmlFor="name"
              className="text-muted-foreground text-md pb-1 font-normal"
            >
              List name
            </label>
            <Input
              id="name"
              type="text"
              className={`rounded-sm py-6 ${listName.length > 50 && "border-[#e00751] focus-visible:ring-[#e00751]"}`}
              value={listName}
              onChange={(e) => {
                setListName(e.target.value);
                if (e.target.value.trim() && createList === "empty")
                  setCreateList("fine");
                if (!e.target.value.trim() && createList === "fine")
                  setCreateList("empty");
              }}
              onBlur={() => {
                if (!listName.trim() && createList === "") {
                  setCreateList("empty");
                }
              }}
              disabled={btnLoading}
            />
            <div className="flex justify-between pt-1">
              {listName.length > 50 && (
                <p className="flex items-center justify-center gap-1 text-[13px] text-[#e00751]">
                  <CircleAlert
                    fill="#e00751"
                    className="relative top-[1px]"
                    size={20}
                    color="#fff"
                  />
                  The name of your list is too long
                </p>
              )}
              {createList === "empty" && (
                <p className="flex items-center justify-center gap-1 text-[13px] text-[#e00751]">
                  <CircleAlert
                    fill="#e00751"
                    className="relative top-[1px]"
                    size={20}
                    color="#fff"
                  />
                  Your list needs a name
                </p>
              )}
              {createList === "fine" && listName.length <= 50 ? (
                <p className="flex items-center justify-center gap-1 text-[13px] text-[#e00751]">
                  <CircleCheck fill="green" size={20} color="#fff" />
                </p>
              ) : (
                <p></p>
              )}
              <span
                className={`text-[13px] ${listName.length > 50 ? "text-[#e00751]" : "text-muted-foreground"}`}
              >
                {listName.length}/50
              </span>
            </div>
            <Button
              className="mt-auto h-15 w-full rounded-full"
              loading={btnLoading}
              variant={"default"}
            >
              Save
            </Button>
          </form>
        </div>
        {/* change name */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${changeName ? "translate-x-0" : "translate-x-full"} `}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <button
              onClick={() => setChangeName(false)}
              className="cursor-pointer"
            >
              <ArrowLeft size={24} />
            </button>
            <h3>Change name</h3>
            <button
              onClick={() => setChangeName(false)}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <form
            className="flex h-full flex-col pt-10 text-[15px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleChangeListName();
            }}
          >
            <p className="text-muted-foreground mb-8">
              Ready for a new name? Make your list as fun as your plans.
            </p>
            <label
              htmlFor="name"
              className="text-muted-foreground text-md pb-1 font-normal"
            >
              List name
            </label>
            <Input
              id="name"
              type="text"
              className={`rounded-sm py-6 ${listName.length > 50 && "border-[#e00751] focus-visible:ring-[#e00751]"}`}
              value={listName}
              onChange={(e) => {
                setListName(e.target.value);
                if (e.target.value.trim() && createList === "empty")
                  setCreateList("fine");
                if (!e.target.value.trim() && createList === "fine")
                  setCreateList("empty");
              }}
              onBlur={() => {
                if (!listName.trim() && createList === "") {
                  setCreateList("empty");
                }
              }}
              disabled={btnLoading}
            />
            <div className="flex justify-between pt-1">
              {listName.length > 50 && (
                <p className="flex items-center justify-center gap-1 text-[13px] text-[#e00751]">
                  <CircleAlert
                    fill="#e00751"
                    className="relative top-[1px]"
                    size={20}
                    color="#fff"
                  />
                  The name of your list is too long
                </p>
              )}
              {createList === "empty" && (
                <p className="flex items-center justify-center gap-1 text-[13px] text-[#e00751]">
                  <CircleAlert
                    fill="#e00751"
                    className="relative top-[1px]"
                    size={20}
                    color="#fff"
                  />
                  Your list needs a name
                </p>
              )}
              {createList === "fine" && listName.length <= 50 ? (
                <p className="flex items-center justify-center gap-1 text-[13px] text-[#e00751]">
                  <CircleCheck fill="green" size={20} color="#fff" />
                </p>
              ) : (
                <p></p>
              )}
              <span
                className={`text-[13px] ${listName.length > 50 ? "text-[#e00751]" : "text-muted-foreground"}`}
              >
                {listName.length}/50
              </span>
            </div>
            <Button
              variant={"default"}
              loading={btnLoading}
              className="mt-auto h-15 w-full rounded-full"
            >
              Save
            </Button>
          </form>
        </div>
      </FavoritesSidebar>
      {/* remove list */}
      <div
        className={`fixed top-0 left-0 z-200 h-screen w-screen bg-black/30 transition duration-200 ${confirm ? "" : "pointer-events-none"}`}
        style={{
          opacity: confirm ? "1" : "0",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-1/2 right-1/2 h-[220px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-xl border border-black/30 bg-white px-10 transition duration-200 [scrollbar-gutter:stable] ${confirm ? "scale-100" : "scale-80"} flex flex-col justify-evenly`}
        >
          <h1>Should we remove your list?</h1>
          <p className="text-muted-foreground px-2 text-sm font-semibold">
            The list named &apos;{favoriteList.listName}&apos; with all items
            will be removed. Once the list is removed it can&apos;t be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant={"default"}
              className="flex-1 rounded-full py-6"
              onClick={() => {
                handleRemove();
              }}
              loading={btnLoading}
            >
              Remove
            </Button>
            <Button
              variant={"border"}
              className="flex-1 rounded-full py-6"
              onClick={() => {
                setConfirm(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
