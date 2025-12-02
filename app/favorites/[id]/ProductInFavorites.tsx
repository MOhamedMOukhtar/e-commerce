"use client";

import { ShopPlus } from "@/components/icons/Shop";
import { formatEGP } from "@/lib/helper/formatMoney";
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Ellipsis,
  Minus,
  Plus,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FavoritesSidebar, {
  ExtendedHTMLElement,
} from "../components/FavoritesSidebar";
import {
  createFavoriteList,
  moveOneProduct,
  removeItemFromFavoriteList,
  updateQuantity,
} from "@/lib/firestore/user/write";

import { Button } from "@/components/ui/button";
import { TUser } from "./page";
import FavoritesList from "@/app/components/FavoritesList";
import { Input } from "@/components/ui/input";
import { TProductEdit } from "./ProductsList";
import { TFavorites } from "../page";

function ProductInFavorites({
  user,
  userId,
  favouriteId,
  product,
  fetchUser,
  objectList,
  setFavoriteList,
}: {
  user: TUser | null;
  userId: string | null;
  favouriteId: string;
  product: TProductEdit;
  fetchUser: () => Promise<void>;
  objectList: { id: string; quantity: number }[];
  setFavoriteList: React.Dispatch<React.SetStateAction<TFavorites>>;
}) {
  const [quantity, setQuantity] = useState(0);
  const [showInfo, setShowInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const [createList, setCreateList] = useState<string>("");
  const [scale, setScale] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const localFavorites: TFavorites[] = JSON.parse(
    window.localStorage.getItem("favoriteList") || "[]",
  );

  useEffect(() => {
    objectList.map((pro) => {
      if (pro.id === product.id) {
        setQuantity(pro.quantity);
      }
    });
  }, [objectList, product.id]);

  // Function to handle quantity changes
  async function handleQuantity(action: "plus" | "minus") {
    //WORK-HERE
    setIsLoading(true);
    if (!userId) {
      const localFavorites = window.localStorage.getItem("favoriteList");
      let favoritesArray: TFavorites[] = [];
      if (localFavorites) {
        favoritesArray = JSON.parse(localFavorites);
      }
      const updatedFavorites = favoritesArray.map((fav) => {
        if (fav.id === favouriteId) {
          return {
            ...fav,
            list: fav.list?.map((p) => {
              if (p.id === product.id) {
                return {
                  ...p,
                  quantity: action === "plus" ? p.quantity + 1 : p.quantity - 1,
                };
              }
              return p;
            }),
          };
        }
        return fav;
      });

      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(updatedFavorites),
      );
      setQuantity(action === "plus" ? quantity + 1 : Math.max(0, quantity - 1));
      await fetchUser();
      setIsLoading(false);
      // setFavoriteList(updatedFavorites);
      return;
    }

    if (!favouriteId) return;
    const newQuantity = action === "plus" ? quantity + 1 : quantity - 1;

    // Update quantity in Firestore
    try {
      await Promise.all([
        updateQuantity({
          uid: userId,
          listId: favouriteId,
          productId: product.id as string,
          quantity: newQuantity,
        }),
        fetchUser(),
      ]);

      setQuantity(newQuantity);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }

  // handle remove product from list
  async function handleRemove() {
    if (!userId) {
      // setBtnLoading(true);
      const localFavorites = window.localStorage.getItem("favoriteList");
      let favoritesArray: TFavorites[] = [];
      if (localFavorites) {
        favoritesArray = JSON.parse(localFavorites);
      }
      const updatedFavorites = favoritesArray.map((fav) => {
        if (fav.id === favouriteId) {
          return { ...fav, list: fav.list?.filter((p) => p.id !== product.id) };
        }
        return fav;
      });

      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(updatedFavorites),
      );

      setFavoriteList((prev) => ({
        ...prev,
        list: prev.list.filter((p) => p.id !== product.id),
      }));

      setScale(true);
      await fetchUser();
      // setBtnLoading(false);
      setConfirm(false);
      setShowInfo("");
      return;
    }

    if (!favouriteId) return;
    setIsLoading(true);
    setBtnLoading(true);
    await removeItemFromFavoriteList({
      uid: userId,
      listId: favouriteId,
      productId: product.id as string,
    });
    setScale(true);
    await fetchUser();
    setBtnLoading(false);
  }

  // handle move one product
  async function handleMoveOneItem(tragetListId: string) {
    if (!userId) {
      setBtnLoading(true);
      const localFavorites = window.localStorage.getItem("favoriteList");
      let favoritesArray: TFavorites[] = [];
      if (localFavorites) {
        favoritesArray = JSON.parse(localFavorites);
      }
      const fromIndex = favoritesArray.findIndex((f) => f.id === favouriteId);
      const toIndex = favoritesArray.findIndex((f) => f.id === tragetListId);

      const fromList = favoritesArray[fromIndex].list || [];
      const toList = favoritesArray[toIndex].list || [];

      const itemIndex = fromList.findIndex((i) => i.id === product.id);

      const [item] = fromList.splice(itemIndex, 1);

      const existing = toList.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        toList.push(item);
      }

      favoritesArray[fromIndex].list = fromList;
      favoritesArray[toIndex].list = toList;

      console.log(favoritesArray);

      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(favoritesArray),
      );

      setFavoriteList((prev) => ({
        ...prev,
        list: prev.list.filter((p) => p.id !== product.id),
      }));
      setScale(true);
      await fetchUser();
      setBtnLoading(false);
      return;
    }
    setBtnLoading(true);
    await moveOneProduct({
      uid: userId,
      fromListId: favouriteId,
      toListId: tragetListId,
      productId: product.id as string,
    });
    await fetchUser();
    setBtnLoading(false);
  }

  // handle create list
  async function handleCreateList() {
    setBtnLoading(true);
    await createFavoriteList({
      uid: userId as string,
      listName,
    });
    await fetchUser();
    setBtnLoading(false);
    setShowInfo("moveItem");
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
    return () => {
      body.style.overflowY = "auto";
      body.style.paddingRight = "0";
    };
  }, [showInfo, user]);

  console.log(showInfo);

  return (
    <>
      <div className="relative">
        <section
          className={`relative flex origin-top border-b border-black/20 transition-all duration-300 ease-in-out ${
            scale
              ? "max-h-0 scale-y-0 py-0 opacity-0"
              : "max-h-[250px] scale-y-100 py-10 opacity-100"
          }`}
        >
          <div className="mr-16">
            <Link href={`/product/${product.slug}-${product.id}`}>
              <Image
                src={product.featureImage || "/ikean-logo.png"}
                width={0}
                height={0}
                sizes="120px"
                style={{ width: "120px", height: "auto" }}
                alt={product.title}
                className="cursor-pointer"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              />
            </Link>
          </div>
          <div className="relative flex flex-col">
            {product.salePrice && (
              <span className="absolute bottom-[calc(100%+5px)] text-sm font-semibold text-red-500">
                Special offers
              </span>
            )}
            <Link
              href={`/product/${product.slug}-${product.id}`}
              className={`text-sm font-bold hover:underline ${hover && "underline"}`}
            >
              {product.title}
            </Link>
            <span className="text-sm text-gray-600">
              {product.shortSummary}
            </span>
            {product.salePrice && (
              <span className="text-muted-foreground text-xs font-semibold">
                Previous price: EGP {formatEGP(product.price)}
              </span>
            )}
            {quantity > 1 && (
              <span className="text-muted-foreground mt-3 mb-6 text-xs font-semibold">
                EGP {formatEGP(product.salePrice || product.price)}/piece
              </span>
            )}
            <div className="mt-auto flex gap-3">
              <div className="flex items-center gap-5 rounded-full border border-black p-[3px]">
                <button
                  onClick={() => {
                    if (quantity === 1) {
                      handleRemove();
                      return;
                    }
                    handleQuantity("minus");
                  }}
                  // onClick={() => setScale(true)}
                  disabled={quantity === 0}
                >
                  <Minus
                    className={`box-content cursor-pointer rounded-full p-1.5 hover:bg-[#dfdfdf] ${quantity === 0 && "pointer-events-none opacity-30"}`}
                    size={16}
                  />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => {
                    handleQuantity("plus");
                  }}
                  disabled={quantity === product.stock}
                >
                  <Plus
                    className={`box-content cursor-pointer rounded-full p-1.5 hover:bg-[#dfdfdf] ${quantity === product.stock && "pointer-events-none opacity-30"}`}
                    size={16}
                  />
                </button>
              </div>
              <div className="cursor-pointer rounded-full border p-1.5 outline outline-black hover:border-black">
                <ShopPlus />
              </div>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end justify-between text-sm font-bold">
            <span>
              EGP {formatEGP((product.salePrice || product.price) * quantity)}
            </span>
            <Ellipsis
              size={18}
              onClick={() => setShowInfo("settings")}
              className="box-content cursor-pointer rounded-full p-2.5 hover:bg-[#dfdfdf]"
            />
          </div>
        </section>
        {isLoading && (
          <div className="absolute bottom-[1px] -left-5 h-[calc(100%-2px)] w-[calc(100%+40px)] backdrop-blur-[3px]">
            <div className="relative h-full w-full">
              <span
                className={`animate-ball-bounce-large absolute top-15 right-1/2 block h-4 w-4 rounded-full bg-[#004f93]`}
              />
            </div>
          </div>
        )}
      </div>
      <FavoritesSidebar showInfo={showInfo} setShowInfo={setShowInfo}>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            const overlay = e.currentTarget
              .parentElement as ExtendedHTMLElement;
            overlay._dragStartedOnOverlay = false;
          }}
          onMouseUp={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
          onMouseLeave={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-8 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "settings" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
              <h3 className="m-auto self-center">{product.title}</h3>
              <button
                onClick={() => {
                  setShowInfo("");
                }}
                className="cursor-pointer"
              >
                <X size={20} opacity={0.6} strokeWidth={3} />
              </button>
            </div>
            <div
              className={`border-gray-300 text-[15px] [&>button]:flex [&>button]:items-center [&>button]:gap-2 [&>button]:py-7 ${btnLoading && "pointer-events-none opacity-40"}`}
            >
              <button
                className="w-full cursor-pointer border-b-1 font-semibold hover:underline"
                onClick={async () => {
                  setBtnLoading(true);
                  await fetchUser();
                  setShowInfo("moveItem");
                  setBtnLoading(false);
                }}
              >
                <ArrowRight size={20} /> Move item to another list
              </button>

              <button
                className="w-full cursor-pointer border-b-1 font-semibold hover:underline"
                onClick={() => setConfirm(true)}
              >
                <Trash2 size={16} /> Remove item
              </button>
            </div>
            <Button
              variant={"default"}
              className="mt-7 w-full rounded-full border-[#004f93] bg-[#004f93] py-6 hover:border-[#004683] hover:bg-[#004683]"
            >
              <ShopPlus />
              Add {product.title} to bag
            </Button>
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "moveItem" ? "translate-x-0" : "translate-x-full"} flex flex-col ps-6 pt-6`}
        >
          <div className="flex items-center justify-between pe-5">
            <button
              onClick={() => setShowInfo("settings")}
              className="cursor-pointer"
            >
              <ArrowLeft size={20} opacity={0.6} strokeWidth={3} />
            </button>
            <h3 className="m-auto self-center">Move {product.title}</h3>
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
            <h2 className="text-[19px]">
              Which list should we move {product.title} to?
            </h2>
            <div className={`my-10 flex flex-col gap-5`}>
              {(user ? user.favorites : localFavorites)
                ?.slice()
                .reverse()
                .filter((favorite) => favorite.id !== favouriteId)
                .map((favorite) => (
                  <FavoritesList
                    key={favorite.id}
                    fav={favorite}
                    handleMoveAllItems={handleMoveOneItem}
                    btnLoading={btnLoading}
                  />
                ))}
            </div>
          </div>
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
                    affected by this limit, so you can still add to or edit the
                    existing ones.
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
        </div>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            const overlay = e.currentTarget
              .parentElement as ExtendedHTMLElement;
            overlay._dragStartedOnOverlay = false;
          }}
          onMouseUp={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
          onMouseLeave={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white px-9 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "create" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <button
              onClick={() => setShowInfo("moveItem")}
              className="cursor-pointer"
            >
              <ArrowLeft size={20} opacity={0.6} strokeWidth={3} />
            </button>
            <h3 className="m-auto self-center">Create a new list</h3>
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              handleCreateList();
            }}
            className="flex h-full flex-col"
          >
            <h4 className="text-md text-muted-foreground pt-5 pb-10">
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
      </FavoritesSidebar>
      {/* show confirm remove */}
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
          <h1>Should we remove your item?</h1>
          <p className="text-muted-foreground px-2 text-sm font-semibold">
            The item named &apos;{product.title}&apos; will be removed. Once the
            item is removed it can&apos;t be undone.
          </p>
          <div className="flex gap-3">
            <Button
              className="flex-1 rounded-full py-6"
              onClick={handleRemove}
              loading={btnLoading}
              variant={"default"}
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
    </>
  );
}

export default ProductInFavorites;
