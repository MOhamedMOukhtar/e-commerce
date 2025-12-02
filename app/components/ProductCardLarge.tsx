import { ShopPlus } from "@/components/icons/Shop";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TProduct } from "@/types/product/product";
import {
  ArrowLeft,
  Check,
  CircleAlert,
  CircleCheck,
  Heart,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TFavorites } from "../favorites/page";
import {
  addProductToList,
  createFavoriteList,
  deleteItemFromList,
  updateCarts,
  updateFavorites,
} from "@/lib/firestore/user/write";
import AuthContextProvider, { useAuth } from "@/context/AutnContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import RemoveList from "./RemoveList";
import { Button } from "@/components/ui/button";
import FavoritesList from "./FavoritesList";
import { Input } from "@/components/ui/input";
import FavoritesSidebar from "../favorites/components/FavoritesSidebar";

export default function ProductCardLarge({
  product,
  commonProducts,
  fetchUser,
  favoritesLists,
  favoriteList,
}: {
  product: TProduct;
  commonProducts?: TProduct[];
  fetchUser: () => Promise<void>;
  favoritesLists: TFavorites[];
  favoriteList: { id: string; quantity: number }[];
}) {
  return (
    <AuthContextProvider>
      <ProductCardLargeChild
        {...{
          product,
          commonProducts,
          fetchUser,
          favoritesLists,
          favoriteList,
        }}
      />
    </AuthContextProvider>
  );
}

function ProductCardLargeChild({
  product,
  commonProducts,
  fetchUser,
  favoritesLists,
  favoriteList,
}: {
  product: TProduct;
  commonProducts?: TProduct[];
  fetchUser: () => Promise<void>;
  favoritesLists: TFavorites[];
  favoriteList: { id: string; quantity: number }[];
}) {
  const [hover, setHover] = useState(false);
  const [activeProduct, setActiveProduct] = useState<TProduct>(product);
  const [showInfo, setShowInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadCart, setLoadCart] = useState<boolean>(false);
  const [checkCart, setCheckCart] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const [createList, setCreateList] = useState<string>("");
  const [listsRemove, setListsRemove] = useState<string[]>([]);
  const [localStorageFavorites, setLocalStorageFavorites] = useState<
    TFavorites[] | null
  >(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = window.localStorage.getItem("favoriteList");
      return storedFavorites ? JSON.parse(storedFavorites) : null;
    }
    return null;
  });
  const { user } = useAuth();

  const localFavorites: TFavorites[] = JSON.parse(
    window.localStorage.getItem("favoriteList") as string,
  );

  // handle favorite
  async function handleFavorite() {
    setIsLoading(true);
    if (!user) {
      // check if product is already in favorites
      const localFavorites: TFavorites[] = JSON.parse(
        window.localStorage.getItem("favoriteList") as string,
      );

      if (
        localFavorites &&
        localFavorites.some((favorite: TFavorites) =>
          favorite.list?.some(
            (pro: { id: string; quantity: number }) => pro.id === product.id,
          ),
        )
      ) {
        setShowInfo("update");
        return;
      }

      // add to local storage if there is no favorites list
      if (!localFavorites) {
        const favoriteListsArray = [
          {
            id: uuidv4(),
            listName: "Favorites",
            list: [{ id: product.id as string, quantity: 1 }],
          },
        ];
        window.localStorage.setItem(
          "favoriteList",
          JSON.stringify(favoriteListsArray),
        );
      }

      if (localFavorites?.length === 1) {
        const favoriteListsArray = localFavorites;
        favoriteListsArray[0].list.push({
          id: product.id as string,
          quantity: 1,
        });
        window.localStorage.setItem(
          "favoriteList",
          JSON.stringify(favoriteListsArray),
        );
        setLocalStorageFavorites(favoriteListsArray);
        setIsLoading(false);
        toast.success(`${product.title} was added to your favorites`);
        return;
      }

      if (localFavorites?.length > 1) {
        setShowInfo("settings");
        return;
      }

      setIsLoading(false);
      toast.success(`${product.title} was added to your favorites`);
      return;
    }
    await fetchUser();
    if (favoriteList && favoriteList.some((pro) => pro.id === product.id)) {
      setShowInfo("update");
      return;
    }

    if (favoritesLists.length === 0) {
      await createFavoriteList({
        uid: user?.uid as string,
        listName: "Favorites",
        list: [{ id: product.id as string, quantity: 1 }],
      });

      toast.success(`${product.title} was added to your favorites`);
    }

    if (favoritesLists.length === 1) {
      const res = await updateFavorites({
        uid: user?.uid as string,
        list: [{ id: product.id as string, quantity: 1 }],
      });
      await fetchUser();
      toast.success(`${product.title} was added to your ${res}`);
      setIsLoading(false);
    }
    if (favoritesLists.length > 1) {
      setShowInfo("settings");
    }
  }

  // add to list
  async function handleAddToList(listId: string) {
    setBtnLoading(true);
    let res = "empty";
    if (user) {
      res = await addProductToList({
        uid: user?.uid as string,
        listId,
        products: [{ id: product.id as string, quantity: 1 }],
      });
    } else {
      const favoriteListsArray: TFavorites[] = JSON.parse(
        window.localStorage.getItem("favoriteList") as string,
      );
      favoriteListsArray.map((list) => {
        if (list.id === listId) {
          list.list.push({ id: product.id as string, quantity: 1 });
          res = list.listName;
        }
      });
      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(favoriteListsArray),
      );
      setLocalStorageFavorites(favoriteListsArray);
    }
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product.title} was added to your ${res}`);
  }

  //create list
  async function handleCreateList(e: React.FormEvent) {
    setBtnLoading(true);
    e.preventDefault();

    if (!user) {
      const favoriteListsArray: TFavorites[] =
        JSON.parse(window.localStorage.getItem("favoriteList") as string) || [];
      favoriteListsArray.push({
        id: uuidv4(),
        listName,
        list: [{ id: product.id as string, quantity: 1 }],
      });
      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(favoriteListsArray),
      );
      setLocalStorageFavorites(favoriteListsArray);
      setBtnLoading(false);
      setIsLoading(false);
      setShowInfo("");
      toast.success(`${product.title} was added to your ${listName}`);
      return;
    }
    const res = await createFavoriteList({
      uid: user?.uid as string,
      listName,
      list: [{ id: product.id as string, quantity: 1 }],
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product.title} was added to your ${res}`);
  }

  // delete from list
  async function handleDeleteFromList() {
    setBtnLoading(true);

    const localFavorites: TFavorites[] = JSON.parse(
      window.localStorage.getItem("favoriteList") as string,
    );

    let count = 0;
    (user ? favoritesLists : localFavorites).map((list) => {
      if (list.list.some((item) => item.id === product.id)) ++count;
    });

    if (count > 1) {
      setShowInfo("removeFromList");
      setBtnLoading(false);
      return;
    }

    if (!user) {
      let listName = "";
      const favoriteListsArray: TFavorites[] = JSON.parse(
        window.localStorage.getItem("favoriteList") as string,
      );
      favoriteListsArray.map((list) => {
        if (list.list.some((item) => item.id === product.id)) {
          listName = list.listName;
          list.list = list.list.filter((item) => item.id !== product.id);
        }
      });
      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(favoriteListsArray),
      );
      setLocalStorageFavorites(favoriteListsArray);
      setBtnLoading(false);
      setIsLoading(false);
      setShowInfo("");
      toast.success(`${product.title} was removed from your ${listName}`);
      return;
    }

    const res = await deleteItemFromList({
      uid: user?.uid as string,
      productId: product.id as string,
    });

    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product.title} was removed from your  ${res}`);
  }

  async function removeFromList() {
    setBtnLoading(true);
    if (!user) {
      const favoriteListsArray: TFavorites[] = JSON.parse(
        window.localStorage.getItem("favoriteList") as string,
      );
      const listNames: string[] = [];
      favoriteListsArray.map((list) => {
        if (listsRemove.includes(list.id)) {
          list.list = list.list.filter((item) => item.id !== product.id);
          listNames.push(list.listName);
        }
      });
      window.localStorage.setItem(
        "favoriteList",
        JSON.stringify(favoriteListsArray),
      );
      setLocalStorageFavorites(favoriteListsArray);
      setBtnLoading(false);
      setIsLoading(false);
      setShowInfo("");
      toast.success(
        `${product.title} was removed from your ${listNames.length > 1 ? listNames.slice(0, -1).join(", ") + ", and " + listNames[listNames.length - 1] : listNames[0]}`,
      );
      return;
    }
    await deleteItemFromList({
      uid: user?.uid as string,
      productId: product.id as string,
      listIds: listsRemove as string[],
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product.title} was removed from your selected lists`);
  }

  // if (product.commonID && !product.description) return null;

  // update bag
  async function handleAddToBag() {
    setLoadCart(true);
    await updateCarts({
      uid: user?.uid as string,
      productId: product.id as string,
    });
    setLoadCart(false);
    toast.success(`${product.title} has been added to your bag`);
    setCheckCart(true);
    setTimeout(() => setCheckCart(false), 2000);
  }

  return (
    <div className="group after:content-[' '] relative min-w-46 py-15 after:absolute after:bottom-[-1px] after:left-0 after:h-[1px] after:w-[calc(100%+40px)] after:bg-[oklch(0.922_0_0)]">
      <Link href={`/product/${product.slug}-${activeProduct.id}`}>
        <div className="cursor-pointer">
          <div
            className="relative h-full w-full"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {product.imageList && product.imageList.length > 0 && (
              <Image
                src={
                  typeof activeProduct.imageList?.[0] === "string"
                    ? activeProduct.imageList?.[0]
                    : "ikean-logo.png"
                }
                width={200}
                height={200}
                alt={activeProduct.title}
                className={`absolute w-full object-cover transition duration-200 ${hover ? "opacity-100" : "opacity-0"}`}
              />
            )}
            <Image
              src={
                typeof activeProduct.featureImage === "string"
                  ? activeProduct.featureImage
                  : "ikean.png"
              }
              width={200}
              height={200}
              alt={activeProduct.title}
              className="w-full object-cover"
            />
          </div>
          <div className="relative mt-6">
            {activeProduct.salePrice && (
              <p className="absolute -top-4 text-[13px] font-semibold text-red-700">
                Special offers
              </p>
            )}
            <p className={`py-1 text-sm font-bold group-hover:underline`}>
              {product.title}
            </p>
            <p className="text-sm">{product.shortSummary}</p>
            <p
              className={`py-2 text-3xl font-bold ${product.highlight ? "mt-2 w-fit bg-amber-300 px-3 py-1 shadow-[2px_2px_0_#cc0008] before:left-1" : ""}`}
            >
              <span className="inline-block -translate-y-3 transform text-xs font-bold">
                EGP
              </span>
              {activeProduct.salePrice
                ? formatEGP(activeProduct.salePrice)
                : formatEGP(activeProduct.price)}
            </p>
            {activeProduct.salePrice && (
              <p className="text-xs font-semibold">
                Previous price: EGP {formatEGP(activeProduct.price)}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-center gap-5">
        <button
          className="cursor-pointer rounded-full bg-[#0059a7] p-2 text-white hover:bg-[#004f93]"
          onClick={handleAddToBag}
        >
          {loadCart ? (
            <div className="h-6 w-6 rounded-full">
              <span className="animate-ball-bounce-small block h-2 w-2 translate-x-2 translate-y-1 rounded-full bg-white" />
            </div>
          ) : checkCart ? (
            <Check />
          ) : (
            <ShopPlus />
          )}
        </button>
        {isLoading ? (
          <button className="rounded-full p-[15px] hover:bg-gray-200">
            <span className="animate-ball-bounce-small block h-2 w-2 -translate-y-1 rounded-full bg-black" />
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
                user
                  ? favoriteList?.some((item) => item.id === product.id)
                    ? "black"
                    : "none"
                  : localStorageFavorites?.some((favorite: TFavorites) =>
                        favorite.list?.some((pro) => pro.id === product.id),
                      )
                    ? "black"
                    : "none"
              }
            />
          </button>
        )}
      </div>
      {product.commonID && (
        <div>
          <p className="my-2 text-xs">More options</p>
          <div className="flex gap-2">
            <Image
              src={
                typeof product.featureImage === "string"
                  ? product.featureImage
                  : "ikean.png"
              }
              width={40}
              height={40}
              alt={product.title}
              className={`cursor-pointer border-b-3 pb-2 transition duration-100 ${activeProduct.id === product.id ? "border-black/70" : "border-transparent hover:border-black/25"}`}
              onClick={() => setActiveProduct(product)}
            />
            {commonProducts &&
              commonProducts
                .filter(
                  (pro) =>
                    pro.commonID === product.commonID && pro.id !== product.id,
                ) // exclude current product
                .map((pro) => (
                  <Image
                    key={pro.id}
                    src={
                      typeof pro.featureImage === "string"
                        ? pro.featureImage
                        : "ikean.png"
                    }
                    width={40}
                    height={40}
                    alt={pro.title}
                    className={`cursor-pointer border-b-3 pb-1 transition duration-100 ${activeProduct.id === pro.id ? "border-black/70" : "border-transparent hover:border-black/25"}`}
                    onClick={() => setActiveProduct(pro)}
                  />
                ))}
          </div>
        </div>
      )}
      {/* show info */}
      <FavoritesSidebar
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        onClick={() => {
          setListName("");
          setCreateList("");
          setIsLoading(false);
        }}
      >
        {/* show settings */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "settings" ? "translate-x-0" : "translate-x-full"} flex flex-col ps-6 pt-6`}
        >
          <div className="flex items-center justify-between pe-5">
            <h3 className="m-auto">Save {product.title}</h3>
            <button
              onClick={() => {
                setShowInfo("");
                setIsLoading(false);
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="mt-10 flex flex-1 flex-col overflow-y-auto pr-6">
            <h3>Which list should we save {product.title} to?</h3>
            <div className="my-10 flex flex-col gap-4">
              {(user ? favoritesLists : localFavorites)
                ?.slice()
                .reverse()
                .filter(
                  (fav) => !fav.list.some((item) => item.id === product.id),
                )
                .map((fav) => (
                  <FavoritesList
                    key={fav.id}
                    fav={fav}
                    btnLoading={btnLoading}
                    handleAddToList={handleAddToList}
                  />
                ))}
            </div>
          </div>
          {(user ? favoritesLists : localFavorites)?.length === 10 ? (
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
          )}
        </div>
        {/* update list */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-0 h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "update" ? "translate-x-0" : "translate-x-full"} flex flex-col py-6 ps-6`}
        >
          <div className="flex items-center justify-between pe-1">
            <h3 className="m-auto">{product.title}</h3>
            <button
              onClick={() => {
                setShowInfo("");
                setIsLoading(false);
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="mt-10 flex-1 pr-6">
            <p className="text-muted-foreground text-sm">
              {product.title} is saved to one of your lists. Would you like to
              remove it or save to another list?
            </p>
          </div>
          <div className="me-6 mt-6 space-y-3">
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
        {/* create new list */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-0 h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "create" ? "translate-x-0" : "translate-x-full"} flex flex-col py-6 ps-6`}
        >
          <div className="flex items-center justify-between pe-1">
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
                setIsLoading(false);
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
        {/* Save to another */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-0 h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "addToAnother" ? "translate-x-0" : "translate-x-full"} flex flex-col py-6 ps-6`}
        >
          <div className="me-1 flex items-center justify-between">
            <button
              onClick={() => setShowInfo("update")}
              className="cursor-pointer"
            >
              <ArrowLeft size={20} opacity={0.6} strokeWidth={3} />
            </button>
            <h3 className="m-auto">Save {product.title}</h3>
            <button
              onClick={() => {
                setShowInfo("");
                setIsLoading(false);
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="mt-10 flex flex-1 flex-col overflow-y-auto pr-6">
            <h3>Which list should we save {product.title} to?</h3>
            <div className="mt-10 flex flex-col gap-4">
              {(user ? favoritesLists : localFavorites)
                ?.slice()
                .reverse()
                .filter(
                  (fav) => !fav.list.some((item) => item.id === product.id),
                )
                .map((fav) => (
                  <FavoritesList
                    key={fav.id}
                    fav={fav}
                    handleAddToList={handleAddToList}
                    btnLoading={btnLoading}
                  />
                ))}
            </div>
          </div>
          {favoritesLists.length === 10 ? null : (
            <Button
              variant={"border"}
              className="me-1 mt-6 rounded-full py-6"
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
          )}
        </div>
        {/* Remove from list */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`fixed top-0 right-0 h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "removeFromList" ? "translate-x-0" : "translate-x-full"} flex flex-col py-6 ps-6`}
        >
          <div className="flex items-center justify-between pe-1">
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
                setIsLoading(false);
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="mt-10 flex flex-1 flex-col overflow-y-auto pr-6">
            <h2>Which list should we remove {product.title} from?</h2>
            <div className="mt-10 flex flex-col">
              {(user ? favoritesLists : localFavorites)
                ?.slice()
                .reverse()
                .filter((fav) =>
                  fav.list.some((item) => item.id === product.id),
                )
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
      </FavoritesSidebar>
    </div>
  );
}
