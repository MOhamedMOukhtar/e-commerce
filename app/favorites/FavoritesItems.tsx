import { useEffect, useState } from "react";
import { TFavorites } from "./page";
import { getProduct } from "@/lib/firestore/products/read_server";
import { TProduct } from "@/types/product/product";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  CircleCheck,
  Ellipsis,
  PenLine,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import FavoritesList from "../components/FavoritesList";
import { moveAllItems } from "@/lib/firestore/user/write";

import { ShopPlus } from "@/components/icons/Shop";
import FavoritesSidebar, {
  ExtendedHTMLElement,
} from "./components/FavoritesSidebar";
import { Skeleton } from "@mui/material";
import { toast } from "sonner";

function FavoritesItems({
  id,
  fav,
  fetchUser,
  favorites,
  handleRemoveList,
  handleChangeListName,
  handleCreateList,
  handleRemoveFromLocalStorage,
  setFavorites,
}: {
  id: string;
  fav: TFavorites;
  fetchUser: () => Promise<void>;
  favorites: TFavorites[];
  handleRemoveList: (listId: string, listName: string) => Promise<void>;
  handleChangeListName: (listid: string, listName: string) => Promise<void>;
  handleCreateList: (
    e: React.FormEvent<HTMLFormElement>,
    name?: string,
  ) => Promise<void>;
  handleRemoveFromLocalStorage: (listId: string) => void;
  setFavorites: React.Dispatch<React.SetStateAction<TFavorites[] | null>>;
}) {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [showInfo, setShowInfo] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<boolean>(false);
  const [listName, setListName] = useState<string>(fav.listName);
  const [createList, setCreateList] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  useEffect(() => {
    setListName(fav.listName);
  }, [fav.listName]);

  useEffect(() => {
    setLoading(true);
    async function fetchAll() {
      const data = await Promise.all(
        fav.list.map((product) => getProduct({ id: product.id })),
      );
      setProducts(data as TProduct[]);
      setLoading(false);
    }
    fetchAll();
  }, [fav.list]);

  // handle remove list
  async function handleRemove() {
    setLoading(true);
    if (!id) {
      handleRemoveFromLocalStorage(fav.id);
      setLoading(false);
      return;
    }
    await handleRemoveList(fav.id, fav.listName);
    setLoading(false);
  }

  function handleSetChangeName() {
    setChangeName(false);
    setListName(fav.listName);
    setCreateList("");
  }

  async function handleSubmitChangeName(e: React.FormEvent) {
    e.preventDefault();
    setBtnLoading(true);
    if (!id) {
      const localLists = window.localStorage.getItem("favoriteList");
      let localListsArray: TFavorites[] = [];
      if (localLists) {
        localListsArray = JSON.parse(localLists);
      }
      const newList = localListsArray.map((list) => {
        if (list.id === fav.id) {
          return { ...list, listName };
        }
        return list;
      });
      window.localStorage.setItem("favoriteList", JSON.stringify(newList));
      setFavorites(newList);
      handleSetChangeName();
      setShowInfo("");
      setBtnLoading(false);
      return;
    }
    await handleChangeListName(fav.id, listName);
    handleSetChangeName();
    setShowInfo("");
    setBtnLoading(false);
  }

  // handle move all items
  async function handleMoveAllItems(toListId: string) {
    // setBtnLoading(true);
    if (!id) {
      const localLists = JSON.parse(
        window.localStorage.getItem("favoriteList") as string,
      );
      let localListsArray: TFavorites[] = [];
      if (localLists) {
        localListsArray = localLists;
      }
      const fromIndex = localListsArray.findIndex(
        (f: TFavorites) => f.id === fav.id,
      );
      const toIndex = localListsArray.findIndex(
        (f: TFavorites) => f.id === toListId,
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

      setFavorites(updatedFavorites);
      setShowInfo("");
      // setBtnLoading(false);
      toast.success("All items moved successfully");
      return;
    }
    await moveAllItems({
      uid: id as string,
      fromListId: fav.id,
      toListId,
    });
    await fetchUser();
    setShowInfo("");
    // setBtnLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setBtnLoading(true);
    await handleCreateList(e, listName);
    setBtnLoading(false);
    setShowInfo("moveAll");
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
  }, [showInfo, fav]);

  return (
    <div>
      <div className="flex items-center">
        <div>
          <h4 className="font-semibold">{fav.listName}</h4>
          <p className="text-muted-foreground text-sm">
            {fav.list.length === 1
              ? `${fav.list.length} item`
              : `${fav.list.length} items`}
          </p>
        </div>
        <button
          className="ml-auto cursor-pointer rounded-full p-4 hover:bg-[#dfdfdf]"
          onClick={() => setShowInfo("settings")}
        >
          <Ellipsis size={18} />
        </button>
      </div>
      {loading ? (
        <Skeleton
          width={258}
          height={258}
          variant="rectangular"
          animation="wave"
        />
      ) : products.length ? (
        <Link href={`/favorites/${fav.id}-${id ?? "guest"}`}>
          <div>
            <div className="flex w-fit cursor-pointer gap-1 overflow-x-auto bg-[#f5f5f5] p-1">
              {products.slice(0, 5).map((products) => (
                <Image
                  key={products?.id}
                  src={
                    typeof products?.featureImage === "string"
                      ? products?.featureImage
                      : "ikean-logo.png"
                  }
                  alt=""
                  width={250}
                  height={250}
                />
              ))}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={`/favorites/${fav.id}-${id ?? "guest"}`}
          className="cursor-pointer"
        >
          <span className="text-muted-foreground flex h-[258px] w-[258px] items-center bg-[#f5f5f5] px-10 text-center text-sm underline">
            This list is waiting for your first product
          </span>
        </Link>
      )}
      {/* show settings */}
      <FavoritesSidebar showInfo={showInfo} setShowInfo={setShowInfo}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "settings" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <h3 className="m-auto self-center">{fav.listName}</h3>
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
            {fav.list.length >= 1 && (
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
            <Button
              variant={"default"}
              className="mt-auto w-full rounded-full border-[#004f93] bg-[#004f93] py-6 hover:border-[#004683] hover:bg-[#004683]"
            >
              <ShopPlus />
              Add all items to bag
            </Button>
          </div>
        </div>
        {/* move all items to another list */}
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
            <h3 className="m-auto self-center">Move all items </h3>
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
              {favorites
                ?.slice()
                .reverse()
                .filter((favorite) => favorite.id !== fav.id)
                .map((favorite) => (
                  <FavoritesList
                    key={favorite.id}
                    fav={favorite}
                    handleMoveAllItems={handleMoveAllItems}
                    btnLoading={btnLoading}
                  />
                ))}
            </div>
          </div>
          {favorites.length === 10 ? (
            <div className="mt-6 -ml-6 rounded-[4px] border-l-4 border-[#f26a2f] shadow-[3px_8px_10px_rgba(0,0,0,0.08)]">
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
        {/* create a new list */}
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
          className={`fixed top-0 right-0 box-border h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/40 bg-white p-6 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "create" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-7 left-2 flex w-full items-center justify-between pr-4">
            <h2 className="m-auto self-center">Create a new list</h2>
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex h-full flex-col">
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
            >
              Save
            </Button>
          </form>
        </div>
      </FavoritesSidebar>
      {/* show change name */}
      <FavoritesSidebar
        changeName={changeName}
        setChangeName={setChangeName}
        // onClick={handleSetChangeName}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${changeName ? "translate-x-0" : "translate-x-full"} `}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <button onClick={handleSetChangeName} className="cursor-pointer">
              <ArrowLeft size={24} />
            </button>
            <h3>Change name</h3>
            <button onClick={handleSetChangeName} className="cursor-pointer">
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <form
            className="flex h-full flex-col pt-10 text-[15px]"
            onSubmit={handleSubmitChangeName}
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
          <h1>Should we remove your list?</h1>
          <p className="text-muted-foreground px-2 text-sm font-semibold">
            The list named &apos;{fav.listName}&apos; with all items will be
            removed. Once the list is removed it can&apos;t be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant={"default"}
              className="flex-1 rounded-full py-6"
              onClick={() => {
                handleRemove();
              }}
              loading={loading}
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

export default FavoritesItems;
