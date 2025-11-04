import { ShopPlus } from "@/components/icons/Shop";
import {
  addProductToList,
  createFavoriteList,
  deleteItemFromList,
  updateFavorites,
} from "@/lib/firestore/user/write";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TProduct } from "@/types/product/product";
import {
  ArrowLeft,
  CircleAlert,
  CircleCheck,
  Heart,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { PageChildProps } from "../favourites/page";
import FavouritesList from "./FavouritesList";
import CustomButton from "@/components/CustomButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthContextProvider, { useAuth } from "@/context/AutnContext";
import RemoveList from "./RemoveList";
import Link from "next/link";

export default function ProductCardSmall({
  product,
  userD,
  favoritesList,
  fetchUser,
}: {
  product: TProduct;
  userD: PageChildProps[];
  favoritesList: string[];
  fetchUser: () => Promise<void>;
}) {
  return (
    <AuthContextProvider>
      <ProductCardSmallChild
        product={product}
        userD={userD}
        favoritesList={favoritesList}
        fetchUser={fetchUser}
      />
    </AuthContextProvider>
  );
}

function ProductCardSmallChild({
  product,
  userD,
  favoritesList,
  fetchUser,
}: {
  product: TProduct;
  userD: PageChildProps[];
  favoritesList: string[];
  fetchUser: () => Promise<void>;
}) {
  const [hover, setHover] = useState(false);
  const [showInfo, setShowInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [createList, setCreateList] = useState<string>("");
  const [listName, setListName] = useState<string>("");
  const [listsRemove, setListsRemove] = useState<string[]>([]);
  const { user } = useAuth();

  // handle favorite
  async function handleFavorite() {
    setIsLoading(true);
    await fetchUser();
    if (favoritesList.includes(product.id as string)) {
      setShowInfo("update");
      return;
    }

    if (userD.length === 0) {
      await createFavoriteList({
        uid: user?.uid as string,
        listName: "Favourites",
        list: [product.id] as string[],
      });
      toast.success(`${product.title} was added to your favourites`);
    }

    if (userD.length === 1) {
      await updateFavorites({
        uid: user?.uid as string,
        list: [product.id] as string[],
      });
      toast.success(`${product.title} was added to your favourites`);
    }
    if (userD.length > 1) {
      setShowInfo("settings");
    }
  }

  async function handleAddToList(listId: string) {
    setBtnLoading(true);
    await addProductToList({
      uid: user?.uid as string,
      listId,
      productIds: [product.id as string],
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product.title} was added to your list`);
  }

  // delete from list
  async function handleDeleteFromList() {
    setBtnLoading(true);

    let count = 0;

    userD.map((list) => {
      if (list.list.includes(product.id as string)) ++count;
    });

    if (count > 1) {
      setShowInfo("removeFromList");
      setBtnLoading(false);
      return;
    }

    await deleteItemFromList({
      uid: user?.uid as string,
      productId: product.id as string,
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product.title} was removed from your favourites`);
  }

  async function removeFromList() {
    setBtnLoading(true);
    await deleteItemFromList({
      uid: user?.uid as string,
      productId: product.id as string,
      listIds: listsRemove as string[],
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product.title} was removed from your favourites`);
  }

  //create list
  async function handleCreateList(e: React.FormEvent) {
    setBtnLoading(true);
    e.preventDefault();
    await createFavoriteList({
      uid: user?.uid as string,
      listName,
      list: [product.id] as string[],
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product.title} was added to your list`);
  }

  return (
    <>
      <div className="my-6 min-w-46">
        <Link href={`/product/${product.slug}-${product.id}`}>
          <div className="cursor-pointer">
            <div
              className="relative h-46 w-46"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Image
                src={
                  typeof product.imageList?.[0] === "string"
                    ? product.imageList?.[0]
                    : "ikean.png"
                }
                width={200}
                height={200}
                alt={product.title}
                className={`absolute object-cover transition duration-200 ${hover ? "opacity-100" : "opacity-0"}`}
              />
              <Image
                src={
                  typeof product.featureImage === "string"
                    ? product.featureImage
                    : "ikean.png"
                }
                width={200}
                height={200}
                alt={product.title}
                className="object-cover"
              />
            </div>
            <div className="relative mt-6">
              {product.salePrice && (
                <p className="absolute -top-4 text-xs font-semibold text-red-700">
                  Special offers
                </p>
              )}
              <p className="py-2 text-sm font-bold">{product.title}</p>
              <p className="text-[13px]">{product.shortSummary}</p>
              <p className="py-2 text-3xl font-bold">
                <span className="inline-block -translate-y-3 transform text-xs font-bold">
                  EGP
                </span>
                {product.salePrice
                  ? formatEGP(product.salePrice)
                  : formatEGP(product.price)}
              </p>
              {product.salePrice && (
                <p className="text-xs font-semibold">
                  Previous price: EGP {formatEGP(product.price)}
                </p>
              )}
            </div>
          </div>
        </Link>
        <div className="mt-4 flex items-center gap-5">
          <button className="cursor-pointer rounded-full bg-[#0059a7] p-2 text-white hover:bg-[#004f93]">
            <ShopPlus />
          </button>
          {isLoading ? (
            <button
              className="rounded-full p-[15px] hover:bg-gray-200"
              onClick={handleFavorite}
            >
              <span className="animate-bull-bounce block h-2 w-2 rounded-full bg-black" />
            </button>
          ) : (
            <button
              className="cursor-pointer rounded-full p-2.5 hover:bg-gray-200"
              onClick={handleFavorite}
            >
              <Heart
                size={18}
                strokeWidth={3}
                fill={
                  favoritesList?.includes(product.id as string)
                    ? "black"
                    : "none"
                }
              />
            </button>
          )}
        </div>
      </div>
      {/* show info */}
      <div
        className={`fixed top-0 left-0 z-200 h-screen w-screen bg-black/30 transition duration-200 ${showInfo ? "" : "pointer-events-none"}`}
        style={{
          opacity: showInfo ? "1" : "0",
        }}
        onClick={() => {
          setShowInfo("");
          setListName("");
          setCreateList("");
          setIsLoading(false);
        }}
      >
        {/* show settings */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[480px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-7 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "settings" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <h3 className="m-auto self-center">Save {product.title}</h3>
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="flex h-full flex-col">
            <h3>Which list should we save {product.title} to?</h3>
            <div className="mt-10 flex flex-col gap-5">
              {userD
                ?.slice()
                .reverse()
                .filter((fav) => !fav.list.includes(product.id as string))
                .map((fav) => (
                  <FavouritesList
                    key={fav.id}
                    fav={fav}
                    btnLoading={btnLoading}
                    handleAddToList={handleAddToList}
                  />
                ))}
            </div>
            <Button
              variant={"border"}
              className="mt-auto w-full rounded-full py-6"
              onClick={() => {
                setShowInfo("create");
                setCreateList("");
                setListName("");
              }}
              disabled={btnLoading}
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
          </div>
        </div>
        {/* update list */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[480px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-7 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "update" ? "translate-x-0" : "translate-x-full"}`}
        >
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
          <div className="flex h-full flex-col">
            <p className="text-muted-foreground text-sm">
              {product.title} is saved to one of your lists. Would you like to
              remove it or save to another list?
            </p>
            <div className="mt-auto space-y-4">
              <Button
                variant={"border"}
                className="w-full rounded-full py-6 font-semibold"
                onClick={() => {
                  handleDeleteFromList();
                  setListsRemove([]);
                }}
                loading={btnLoading}
              >
                <Trash2 size={16} /> Remove from list
              </Button>
              <Button
                variant={"default"}
                className="w-full rounded-full py-6 font-semibold"
                onClick={() => setShowInfo("addToAnother")}
              >
                <Heart size={16} /> Save to another list
              </Button>
            </div>
          </div>
        </div>
        {/* create new list */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[480px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-7 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "create" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <button
              onClick={() => setShowInfo("settings")}
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
          <form onSubmit={handleCreateList} className="flex h-full flex-col">
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
            <CustomButton
              className="mt-auto h-15 w-full rounded-full"
              loading={btnLoading}
            >
              Save
            </CustomButton>
          </form>
        </div>
        {/* Save to another */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[480px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-7 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "addToAnother" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <button
              onClick={() => setShowInfo("update")}
              className="cursor-pointer"
            >
              <ArrowLeft size={20} opacity={0.6} strokeWidth={3} />
            </button>
            <h3 className="m-auto self-center">Save {product.title}</h3>
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="flex h-full flex-col">
            <h3>Which list should we save {product.title} to?</h3>
            <div className="mt-10 flex flex-col gap-5">
              {userD
                ?.slice()
                .reverse()
                .filter((fav) => !fav.list.includes(product.id as string))
                .map((fav) => (
                  <FavouritesList
                    key={fav.id}
                    fav={fav}
                    handleAddToList={handleAddToList}
                    btnLoading={btnLoading}
                  />
                ))}
            </div>
            <Button
              variant={"border"}
              className="mt-auto w-full rounded-full py-6"
              onClick={() => {
                setShowInfo("create");
                setCreateList("");
                setListName("");
              }}
              disabled={btnLoading}
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
          </div>
        </div>
        {/* Remove from list */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`fixed top-0 right-[-15px] h-screen w-[480px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-9 pt-24 pb-7 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "removeFromList" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-5 left-0 flex w-full items-center justify-between px-5">
            <button
              onClick={() => {
                setShowInfo("update");
              }}
              className="cursor-pointer"
            >
              <ArrowLeft size={20} opacity={0.6} strokeWidth={3} />
            </button>
            <h3 className="m-auto self-center">Remove {product.title}</h3>
            <button
              onClick={() => {
                setShowInfo("");
                setListsRemove([]);
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="flex h-full flex-col">
            <h2>Which list should we remove {product.title} from?</h2>
            <div className="mt-10 flex flex-col">
              {userD
                ?.slice()
                .reverse()
                .filter((fav) => fav.list.includes(product.id as string))
                .map((fav) => (
                  <RemoveList
                    key={fav.id}
                    fav={fav}
                    listsRemove={listsRemove}
                    setListsRemove={setListsRemove}
                    btnLoading={btnLoading}
                  />
                ))}
            </div>
            <Button
              variant={"border"}
              className={`mt-auto w-full rounded-full py-6 ${listsRemove.length === 0 ? "pointer-events-none border-[#bbbbbb] bg-[#bbbbbb] opacity-50 outline-[#bbbbbb]" : ""}`}
              onClick={() => {
                removeFromList();
              }}
              loading={btnLoading}
            >
              <Trash2 size={20} opacity={0.6} strokeWidth={3} />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
