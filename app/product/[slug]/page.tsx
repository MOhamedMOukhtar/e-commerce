"use client";

import FavoritesList from "@/app/components/FavoritesList";
import RemoveList from "@/app/components/RemoveList";
import { TFavorites } from "@/app/favorites/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getCommonProducts,
  getProduct,
} from "@/lib/firestore/products/read_server";
import { getUser } from "@/lib/firestore/user/read_server";
import {
  addProductToList,
  createFavoriteList,
  deleteItemFromList,
  updateFavorites,
} from "@/lib/firestore/user/write";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TProduct } from "@/types/product/product";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleAlert,
  CircleCheck,
  Heart,
  Minus,
  Plus,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import FavoritesSidebar from "@/app/favorites/components/FavoritesSidebar";

type TProductEdit = Omit<TProduct, "featureImage"> & {
  featureImage: string;
};

function Product() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);
  const [showInfo, setShowInfo] = useState("");
  const [showArrow, setShowArrow] = useState(false);
  const [product, setProduct] = useState<TProductEdit | null>(null);
  const [mainProduct, setMainProduct] = useState<TProductEdit | null>(null);
  const [commonProduct, setCommonProduct] = useState<TProductEdit[] | null>(
    null,
  );
  const [hoverProduct, setHoverProduct] = useState<TProductEdit | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [detMeas, setDetMeas] = useState<"details" | "measurements">("details");
  const [showGoodToKnow, setShowGoodToKnow] = useState(false);
  const [showMaterialsAndCare, setShowMaterialsAndCare] = useState(false);
  const [packagingShow, setPackagingShow] = useState(false);
  const [listName, setListName] = useState<string>("");
  const [createList, setCreateList] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [favoritesLists, setFavoritesLists] = useState<TFavorites[]>([]);
  const [favoriteList, setFavoriteList] = useState<
    { id: string; quantity: number }[]
  >([]);
  const [localStorageFavorites, setLocalStorageFavorites] = useState<
    TFavorites[] | null
  >(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = window.localStorage.getItem("favoriteList");
      return storedFavorites ? JSON.parse(storedFavorites) : null;
    }
    return null;
  });
  const [listsRemove, setListsRemove] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  let localFavorites: TFavorites[] = [];
  if (typeof window !== "undefined") {
    localFavorites = JSON.parse(
      window.localStorage.getItem("favoriteList") as string,
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const pathname = usePathname();
  const id = pathname.split("-").at(-1) ?? null;

  let productDetails = mainProduct?.details || "";
  const goodToKnow = mainProduct?.goodToKnow || "";
  let materialsAndCare = mainProduct?.materialsAndCare || "";
  let measurements = mainProduct?.measurements || "";
  let packaging = mainProduct?.packaging || "";

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
    if (product && !measurements) {
      setPackagingShow(true);
    }
    if (measurements === "<p></p>") {
      setPackagingShow(true);
    }
  }, [measurements, showInfo, product]);

  productDetails = productDetails.replace(
    /<p><strong>Designer<\/strong><\/p>/,
    '<p class="mb-0"><strong>Designer</strong></p>',
  );

  productDetails = productDetails.replace(
    /<p>Article number<\/p><p><strong>305.008.93<\/strong><\/p>/,
    '<p class="mb-1">Article number<\/p><p class="px-3 bg-black w-fit text-white"><strong>305.008.93<\/strong><\/p>',
  );
  productDetails = productDetails.replace(
    /<p>Article number<\/p><p>/,
    "<p class='mb-1'>Article number</p><p class='px-3 bg-black w-fit text-white'>",
  );

  materialsAndCare = materialsAndCare.replace(/h3/g, "h4");

  materialsAndCare = materialsAndCare.replace(
    /<p><strong>/g,
    "<p class='mt-7'><strong>",
  );

  materialsAndCare = materialsAndCare.replace(
    /<h4 style="text-align: left;">/g,
    '<h4 style="text-align: left;" class="mt-7">',
  );

  measurements = measurements.replace(/class="list-disc ml-3"/, "");
  measurements = measurements.replace(/<ul >/, '<ul class="space-y-[2px]">');

  packaging = packaging.replace(/h3/g, "h4");
  packaging = packaging.replace(
    /<\/li><\/ul><p>/g,
    "</li></ul><p class='mt-3'>",
  );
  packaging = packaging.replace(
    /<ul class="list-disc ml-3"><li>/g,
    "<ul class='mt-6'><li>",
  );
  packaging = packaging.replace(
    /<p>Article number<\/p><p>/g,
    "<p class='mt-6'>Article number</p><p class='bg-black w-fit text-white px-3 mb-2 '>",
  );

  // fetch product
  useEffect(() => {
    async function fetchProduct() {
      const product = (await getProduct({ id })) as TProductEdit;
      setProduct(product);
      setMainProduct(product);
      setActiveImage(product?.featureImage);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  // fetch common product
  useEffect(() => {
    async function fetchCommonProduct() {
      const products = (await getCommonProducts(
        product?.commonID || "",
      )) as TProductEdit[];
      setCommonProduct(products);
    }

    if (product?.commonID) {
      fetchCommonProduct();
    }

    if (commonProduct) {
      commonProduct.map((p) => {
        if (p.description) {
          setMainProduct(p);
        }
      });
    }
  }, [product, commonProduct]);

  // scroll to top when component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // handle favorite
  async function handleFavorite() {
    setIsLoading(true);

    // local storage
    if (!user && product) {
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
    if (favoriteList && favoriteList.some((pro) => pro.id === product?.id)) {
      setShowInfo("update");
      return;
    }

    if (favoritesLists.length === 0) {
      await createFavoriteList({
        uid: user?.uid as string,
        listName: "Favorites",
        list: [{ id: product?.id as string, quantity: 1 }],
      });

      toast.success(`${product?.title} was added to your favorites`);
    }

    if (favoritesLists.length === 1) {
      const res = await updateFavorites({
        uid: user?.uid as string,
        list: [{ id: product?.id as string, quantity: 1 }],
      });
      await fetchUser();
      toast.success(`${product?.title} was added to your ${res}`);
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
        products: [{ id: product?.id as string, quantity: 1 }],
      });
    } else {
      const favoriteListsArray: TFavorites[] = JSON.parse(
        window.localStorage.getItem("favoriteList") as string,
      );
      favoriteListsArray.map((list) => {
        if (list.id === listId) {
          list.list.push({ id: product?.id as string, quantity: 1 });
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
    toast.success(`${product?.title} was added to your ${res}`);
  }

  // delete from list
  async function handleDeleteFromList() {
    setBtnLoading(true);
    const localFavorites: TFavorites[] = JSON.parse(
      window.localStorage.getItem("favoriteList") as string,
    );

    let count = 0;
    (user ? favoritesLists : localFavorites).map((list) => {
      if (list.list.some((item) => item.id === product?.id)) ++count;
    });

    if (count > 1) {
      setShowInfo("removeFromList");
      setBtnLoading(false);
      return;
    }

    if (!user && product) {
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
      productId: product?.id as string,
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product?.title} was removed from your  ${res}`);
  }

  //create list
  async function handleCreateList(e: React.FormEvent) {
    setBtnLoading(true);
    e.preventDefault();

    if (!user && product) {
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
      list: [{ id: product?.id as string, quantity: 1 }],
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product?.title} was added to your ${res}`);
  }

  async function removeFromList() {
    setBtnLoading(true);
    if (!user && product) {
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
      productId: product?.id as string,
      listIds: listsRemove as string[],
    });
    await fetchUser();
    setBtnLoading(false);
    setIsLoading(false);
    setShowInfo("");
    toast.success(`${product?.title} was removed from your selected lists`);
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
  }, [showInfo]);

  // handle show buttons for image scroll
  useEffect(() => {
    if (!contentRef.current) return;
    const { current: content } = contentRef;

    const handleScroll = () => {
      setShowUp(content.scrollTop > 0);
      setShowDown(
        content.scrollTop < content.scrollHeight - content.clientHeight,
      );
    };
    handleScroll();
    content.addEventListener("scroll", handleScroll);
    return () => {
      content.removeEventListener("scroll", handleScroll);
    };
  }, [product]);

  // scroll images list
  function scrollImage(direction: "up" | "down") {
    if (!contentRef.current) return;
    const { current: content } = contentRef;
    const { clientHeight } = content;
    if (content && direction === "down") {
      content.scrollBy({
        top: clientHeight - 100,
        behavior: "smooth",
      });
    }
    if (content && direction === "up") {
      content.scrollBy({
        top: (clientHeight - 100) * -1,
        behavior: "smooth",
      });
    }
  }

  if (loading)
    return (
      <div className="relative mx-12 mt-6">
        <div className="mb-15 flex gap-12">
          <div className="flex max-w-6/10 flex-col gap-6">
            <div className="flex gap-12">
              <div className="flex w-fit flex-col gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-20 bg-stone-300" />
                ))}
              </div>
              <div>
                <Skeleton className="aspect-square w-160 bg-stone-300" />
              </div>
            </div>

            <div className="my-10 max-w-[85%]">
              <div className="space-y-2 border-b pb-12">
                <Skeleton className="h-6 w-9/10 bg-stone-300" />
                <Skeleton className="h-6 w-9/10 bg-stone-300" />
                <Skeleton className="h-6 w-6/10 bg-stone-300" />
              </div>
              <div className="border-b py-9">
                <Skeleton className="h-6 w-9/10 bg-stone-300" />
              </div>
              <div className="border-b py-9">
                <Skeleton className="h-6 w-9/10 bg-stone-300" />
              </div>
            </div>
          </div>
          {/* work here */}
          <div className="sticky top-24 h-fit flex-1 space-y-2 pt-6">
            <Skeleton className="h-4 w-2/10 bg-stone-300" />
            <Skeleton className="h-5 w-3/10 bg-stone-300" />
            <Skeleton className="h-4 w-1/2 bg-stone-300" />
            <Skeleton className="h-6 w-2/10 bg-stone-300" />
            <Skeleton className="h-3 w-2/10 bg-stone-300" />
            <div>
              <Skeleton className="mt-8 mb-2 h-4 w-2/10 bg-stone-300" />
              <div className="border p-4">
                <div className="flex gap-5 border-b pb-4">
                  <Skeleton className="h-fit text-stone-300">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      width="24"
                      height="24"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 4h15v3h3.0246l3.9793 5.6848V18h-2.6567c-.4218 1.3056-1.6473 2.25-3.0933 2.25-1.446 0-2.6715-.9444-3.0932-2.25h-3.9044c-.4217 1.3056-1.6472 2.25-3.0932 2.25S4.4916 19.3056 4.0698 18H1V4zm3.0698 12c.4218-1.3056 1.6473-2.25 3.0933-2.25 1.446 0 2.6715.9444 3.0932 2.25H14V6H3v10h1.0698zM16 14.0007a3.24 3.24 0 0 1 1.2539-.2507c1.446 0 2.6715.9444 3.0933 2.25h.6567v-2.6848L17.9833 9H16v5.0007zM7.163 15.75c-.6903 0-1.25.5596-1.25 1.25s.5597 1.25 1.25 1.25c.6904 0 1.25-.5596 1.25-1.25s-.5596-1.25-1.25-1.25zm10.0909 0c-.6904 0-1.25.5596-1.25 1.25s.5596 1.25 1.25 1.25 1.25-.5596 1.25-1.25-.5596-1.25-1.25-1.25z"
                      ></path>
                    </svg>
                  </Skeleton>
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-30 bg-stone-300" />
                    <div className="flex items-start gap-2">
                      <Skeleton className="mt-1.5 bg-stone-300 p-1.5" />
                      <div className="flex flex-col">
                        <Skeleton className="mt-1.5 h-3 w-30 bg-stone-300" />
                        <Skeleton className="mt-1.5 h-3 w-50 bg-stone-300" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 pt-4">
                  <Skeleton className="h-fit text-stone-300">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      width="24"
                      height="24"
                      aria-hidden="true"
                      className="pip-svg-icon pip-section__icon"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 4v16h20V4H2zm2 4V6h16v2H4zm0 2v8h3v-6h10v6h3v-8H4zm11 4h-2v4h2v-4zm-4 0H9v4h2v-4z"
                      ></path>
                    </svg>
                  </Skeleton>
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-30 bg-stone-300" />
                    <div className="flex items-start gap-2 font-semibold text-black/60">
                      <Skeleton className="mt-1.5 bg-stone-300 p-1.5" />
                      <Skeleton className="mt-1.5 h-3 w-30 bg-stone-300" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm font-bold">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-30 rounded-full bg-stone-300" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-14 w-full rounded-full bg-stone-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (product)
    return (
      <div className="relative mx-12 mt-6">
        <div className="mb-15 flex gap-12">
          <div className="flex max-w-6/10 flex-col gap-6">
            <div className="flex gap-12">
              <div
                className="relative"
                onMouseEnter={() => setShowArrow(true)}
                onMouseLeave={() => setShowArrow(false)}
              >
                {showUp && (
                  <button
                    className={`absolute -top-4 right-1/2 translate-x-1/2 cursor-pointer rounded-full bg-black p-1.5 transition duration-200 hover:bg-stone-800 ${showArrow ? "opacity-100" : "opacity-0"}`}
                    onClick={() => scrollImage("up")}
                  >
                    <ChevronUpIcon className="h-5 w-5" color="white" />
                  </button>
                )}

                <div className="h-160 overflow-y-hidden" ref={contentRef}>
                  <ul className="flex w-fit flex-col gap-4">
                    <li
                      className="cursor-pointer border hover:border-black/50"
                      onMouseEnter={() => setActiveImage(product?.featureImage)}
                    >
                      <Image
                        src={
                          typeof product?.featureImage === "string"
                            ? product.featureImage
                            : "/ikean.png"
                        }
                        width={80}
                        height={80}
                        alt={product?.title || "Product"}
                      />
                    </li>
                    {product?.imageList?.map((image, index) => (
                      <li
                        className="cursor-pointer border hover:border-black/50"
                        onMouseEnter={() => {
                          if (typeof image === "string") {
                            setActiveImage(image);
                          }
                        }}
                        key={index}
                      >
                        <Image
                          src={typeof image === "string" ? image : "/ikean.png"}
                          width={80}
                          height={80}
                          alt={product?.title || "Product"}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {showDown && (
                  <button
                    onClick={() => scrollImage("down")}
                    className={`absolute right-1/2 -bottom-4 translate-x-1/2 cursor-pointer rounded-full bg-black p-1.5 transition duration-200 hover:bg-stone-800 ${showArrow ? "opacity-100" : "opacity-0"}`}
                  >
                    <ChevronDownIcon className="h-5 w-5" color="white" />
                  </button>
                )}
              </div>
              <div>
                <Image
                  src={hoverProduct?.featureImage || activeImage}
                  width={1000}
                  height={1000}
                  alt="featureImage"
                  className="aspect-square w-160"
                />
              </div>
            </div>
            <div className="my-10 max-w-[85%] text-xl blur-[0.3px]">
              <div className="border-b pb-12 text-black/70">
                {mainProduct?.description}
              </div>
              <div
                className="relative cursor-pointer border-b py-9 text-2xl font-bold hover:underline"
                onClick={() => {
                  setShowInfo("open");
                  setDetMeas("details");
                }}
              >
                Product details
                <span className="absolute top-1/2 right-0 translate-y-[-50%]">
                  <ArrowRight size={30} />
                </span>
              </div>
              <div
                className="relative cursor-pointer border-b py-9 text-2xl font-bold hover:underline"
                onClick={() => {
                  setShowInfo("open");
                  setDetMeas("measurements");
                }}
              >
                Measurements
                <span className="absolute top-1/2 right-0 translate-y-[-50%]">
                  <ArrowRight size={30} />
                </span>
              </div>
            </div>
          </div>
          <div className="sticky top-24 h-fit flex-1 pt-6">
            {product?.salePrice && (
              <span className="absolute top-0 font-bold text-red-700">
                Special offers
              </span>
            )}
            <div className="relative flex items-center justify-between">
              <div className="font-bold">{product?.title}</div>
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
                              favorite.list?.some(
                                (pro) => pro.id === product.id,
                              ),
                            )
                          ? "black"
                          : "none"
                    }
                  />
                </button>
              )}
            </div>
            <div>{product?.summary}</div>
            <div
              className={`py-2 text-3xl font-bold ${product.highlight ? "mt-2 w-fit bg-amber-300 px-3 py-1 shadow-[2px_2px_0_#cc0008] before:left-1" : ""}`}
            >
              <span className="inline-block -translate-y-3 transform text-xs font-bold">
                EGP
              </span>
              {product && product.salePrice
                ? formatEGP(product.salePrice)
                : formatEGP(product?.price ?? 0)}
            </div>
            {product?.salePrice && (
              <div className="border-b pb-7 text-xs font-semibold text-black/50">
                Previous price: EGP {formatEGP(product?.price ?? 0)}
              </div>
            )}
            {commonProduct && (
              <>
                <div className="mt-6 mb-3 font-semibold">Choose colour</div>
                <div className="mb-1">
                  {hoverProduct ? hoverProduct.color : product.color}
                </div>
              </>
            )}
            <div className="flex gap-1">
              {commonProduct &&
                commonProduct.map((p) => {
                  console.log(p);
                  return (
                    <div
                      key={p.id}
                      className={`cursor-pointer rounded border-2 p-1 ${p.id === product.id ? "border-black/50" : "border-transparent hover:border-black/20"}`}
                      onMouseEnter={() => {
                        if (p.id === product.id) return;
                        setHoverProduct(p);
                      }}
                      onMouseLeave={() => setHoverProduct(null)}
                      onClick={() => {
                        setProduct(p);
                        setActiveImage(p.featureImage);
                      }}
                    >
                      <Image
                        src={
                          typeof p.featureImage === "string"
                            ? p.featureImage
                            : "ikean-logo.png"
                        }
                        width={40}
                        height={40}
                        alt="icon"
                      />
                    </div>
                  );
                })}
            </div>

            <div>
              <span className="mt-6 mb-2 inline-block text-sm font-bold">
                How to get it
              </span>
              <div className="rounded-lg border p-4 text-sm">
                <div className="flex gap-5 border-b pb-4">
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 4h15v3h3.0246l3.9793 5.6848V18h-2.6567c-.4218 1.3056-1.6473 2.25-3.0933 2.25-1.446 0-2.6715-.9444-3.0932-2.25h-3.9044c-.4217 1.3056-1.6472 2.25-3.0932 2.25S4.4916 19.3056 4.0698 18H1V4zm3.0698 12c.4218-1.3056 1.6473-2.25 3.0933-2.25 1.446 0 2.6715.9444 3.0932 2.25H14V6H3v10h1.0698zM16 14.0007a3.24 3.24 0 0 1 1.2539-.2507c1.446 0 2.6715.9444 3.0933 2.25h.6567v-2.6848L17.9833 9H16v5.0007zM7.163 15.75c-.6903 0-1.25.5596-1.25 1.25s.5597 1.25 1.25 1.25c.6904 0 1.25-.5596 1.25-1.25s-.5596-1.25-1.25-1.25zm10.0909 0c-.6904 0-1.25.5596-1.25 1.25s.5596 1.25 1.25 1.25 1.25-.5596 1.25-1.25-.5596-1.25-1.25-1.25z"
                    ></path>
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-bold">Delivery</span>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block rounded-full bg-green-700 p-1.5"></span>
                      <div className="flex flex-col font-semibold text-black/60">
                        <span>Available</span>
                        <span>Find all options at checkout</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 pt-4">
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    width="24"
                    height="24"
                    aria-hidden="true"
                    className="pip-svg-icon pip-section__icon"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 4v16h20V4H2zm2 4V6h16v2H4zm0 2v8h3v-6h10v6h3v-8H4zm11 4h-2v4h2v-4zm-4 0H9v4h2v-4z"
                    ></path>
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-bold"> IKEA Cairo Festival City</span>
                    <div className="flex items-start gap-2 font-semibold text-black/60">
                      <span className="mt-1.5 inline-block rounded-full bg-green-700 p-1.5"></span>
                      <span>Store — In stock</span>
                    </div>
                  </div>
                </div>
              </div>

              {/*Action */}
              <div className="mt-8 flex items-center gap-3 text-sm font-bold">
                <div className="flex items-center justify-between gap-2 rounded-full border p-2">
                  <button
                    className={`rounded-full p-2 ${count === 1 ? "opacity-30" : "cursor-pointer hover:bg-gray-200"}`}
                    onClick={() =>
                      setCount((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                  >
                    <Minus size={20} />
                  </button>
                  <span className="inline-block w-6 rounded-full text-center text-lg">
                    {count}
                  </span>
                  <button
                    className={`rounded-full p-2 ${count === product.stock ? "opacity-30" : "cursor-pointer hover:bg-gray-200"}`}
                    onClick={() =>
                      setCount((prev) =>
                        prev < (product.stock ?? 0) ? prev + 1 : prev,
                      )
                    }
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex-1">
                  <button className="w-full cursor-pointer rounded-full bg-[#0059a7] p-4 text-white hover:bg-[#004f93]">
                    {count > 1 ? `Add ${count} items to cart` : `Add to bag`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Info side panel */}
        <FavoritesSidebar
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          onClick={() => {
            setShowGoodToKnow(false);
            setShowMaterialsAndCare(false);
            setListName("");
            setCreateList("");
            setIsLoading(false);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed top-0 right-0 h-screen w-[480px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-8 pt-24 pb-12 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "open" ? "translate-x-0" : "translate-x-full"}`}
          >
            <button
              onClick={() => {
                setShowInfo("");
                setShowGoodToKnow(false);
                setShowMaterialsAndCare(false);
              }}
              className={`absolute top-5 right-5 cursor-pointer`}
            >
              <X />
            </button>
            {detMeas === "details" ? (
              <div className="text-stone-700">
                <div>
                  <h2 className="pb-6 text-[21px]">Product details</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: productDetails || "" }}
                    className="space-y-5 border-b pb-10 text-sm"
                  />
                </div>
                {goodToKnow !== "<p></p>" && goodToKnow !== "" && (
                  <div className="border-b">
                    <div
                      className="relative cursor-pointer overflow-hidden py-8 hover:underline"
                      onClick={() => setShowGoodToKnow(!showGoodToKnow)}
                    >
                      <h2 className="text-[15px] font-bold">Good to know</h2>
                      <button className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer">
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          size={20}
                          className={`${showGoodToKnow ? "rotate-180" : ""} transition duration-200`}
                        />
                      </button>
                    </div>
                    <div
                      className={`overflow-hidden text-sm transition-all duration-200 ${
                        showGoodToKnow ? "max-h-96 pt-2 pb-10" : "max-h-0 pt-2"
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: goodToKnow || "" }}
                        className="space-y-5"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div
                    className="relative cursor-pointer overflow-hidden py-8 hover:underline"
                    onClick={() =>
                      setShowMaterialsAndCare(!showMaterialsAndCare)
                    }
                  >
                    <h2 className="text-[15px] font-bold">
                      Materials and care
                    </h2>
                    <button className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer">
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        size={20}
                        className={`${showMaterialsAndCare ? "rotate-180" : ""} transition duration-200`}
                      />
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden text-sm transition-all duration-200 ${
                      showMaterialsAndCare ? "pt-2 pb-10" : "max-h-0 pt-2"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: materialsAndCare || "",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-stone-700">
                <div>
                  <h2 className="pb-6 text-[21px]">Measurements</h2>
                  {measurements && measurements !== "<p></p>" && (
                    <>
                      <div
                        dangerouslySetInnerHTML={{ __html: measurements || "" }}
                        className="space-y-5 text-sm"
                      />
                      <Image
                        src={
                          typeof mainProduct?.measurementImage === "string"
                            ? mainProduct?.measurementImage
                            : "/ikean.png"
                        }
                        width={400}
                        height={400}
                        alt={product?.title || "Product"}
                        className="border-b pb-10"
                      />
                    </>
                  )}
                </div>
                <div>
                  <div
                    className="relative cursor-pointer overflow-hidden py-8 hover:underline"
                    onClick={() => setPackagingShow(!packagingShow)}
                  >
                    <h2 className="text-[15px] font-bold">Packaging</h2>
                    <button className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer">
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        size={20}
                        className={`${packagingShow ? "rotate-180" : ""} transition duration-200`}
                      />
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden text-sm transition-all duration-200 ${
                      packagingShow ? "max-h-fit pt-2 pb-10" : "max-h-0 pt-2"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: packaging || "" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* show settings */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed top-0 right-0 h-screen w-[460px] rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "settings" ? "translate-x-0" : "translate-x-full"} flex flex-col ps-6 pt-6`}
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
            className={`fixed top-0 right-0 h-screen w-[460px] rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "update" ? "translate-x-0" : "translate-x-full"} flex flex-col py-6 ps-6`}
          >
            <div className="flex items-center justify-between pe-5">
              <h3 className="m-auto self-center">{product.title}</h3>
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
              <h3>Create a new list</h3>
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
              <h4 className="text-md text-muted-foreground py-10">
                Why not name it after a room, theme, or project you have in
                mind?
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
              <h3 className="m-auto self-center">Save {product.title}</h3>
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
              <div className="mt-10 flex flex-col gap-5">
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
              <h3>Remove {product.title}</h3>
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

export default Product;
