"use client";

import z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import FavoritesItems from "./FavoritesItems";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser } from "@/lib/firestore/user/read_server";
import AuthContextProvider, { useAuth } from "@/context/AutnContext";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createFavoriteList,
  createUser,
  deleteFavoriteList,
  mergeFavorites,
  updateListName,
} from "@/lib/firestore/user/write";
import {
  CircleAlert,
  CircleCheck,
  Heart,
  List,
  LogOut,
  TriangleAlert,
  UserRound,
  X,
} from "lucide-react";
import FavoritesSidebar, {
  ExtendedHTMLElement,
} from "./components/FavoritesSidebar";
import { Skeleton } from "@mui/material";

const logInSchema = z.object({
  email: z
    .string()
    .min(1, "The email field cannot be left empty")
    .email("Invalid email address"),
  password: z.string().min(1, "The password field cannot be left empty"),
});

type TLogInSchema = z.infer<typeof logInSchema>;

export default function Page() {
  return (
    <AuthContextProvider>
      <PageChild />
    </AuthContextProvider>
  );
}

export interface TFavorites {
  id: string;
  list: { id: string; quantity: number }[];
  listName: string;
}

function PageChild() {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<TFavorites[] | null>(null);
  const [listName, setListName] = useState<string>("");
  const [showInfo, setShowInfo] = useState<string>("");
  const [createList, setCreateList] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [notMergedList, setNotMergedList] = useState<TFavorites[] | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  });

  // set favorites to null if no user and no local storage favorites
  useEffect(() => {
    const local = localStorage.getItem("favoriteList");
    const parsed: TFavorites[] = local ? JSON.parse(local) : [];

    if (!user && parsed.length === 0) {
      setFavorites(null);
      return;
    }

    async function mergeFavoritesOnLogin() {
      const firebaseUser = await getUser({ id });
      const firebaseLists = firebaseUser?.favorites || [];
      const localLists = JSON.parse(
        localStorage.getItem("favoriteList") || "[]",
      );
      const MAX_LISTS = 10;
      const availableSlots = MAX_LISTS - firebaseLists.length;
      if (availableSlots <= 0) {
        setFavorites(firebaseUser?.favorites);
        setIsLoading(false);
        toast.info("You have reached the maximum number of favorite lists.");
        window.localStorage.removeItem("favoriteList");
        return;
      }
      const listsToTake = localLists.slice(0, availableSlots);

      await mergeFavorites({
        uid: id as string,
        localFavorites: [...listsToTake],
      });
      setFavorites([...firebaseLists, ...listsToTake]);
      if (firebaseLists.length + localLists.length > 10) {
        const notMerged = localLists.slice(10 - firebaseLists.length);
        setNotMergedList(notMerged);
      } else if (localLists.length > 0) {
        toast.success(
          "You are now logged in! Lists saved to favourites before login have been added to your account.",
        );
      }
      window.localStorage.removeItem("favoriteList");
    }

    if (user && parsed.length > 0) {
      mergeFavoritesOnLogin();
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    setIsLoading(false);
  }, [authLoading]);

  useEffect(() => {
    if (user) return;
    setFavorites(() => {
      const result = window.localStorage.getItem("favoriteList");
      if (result) {
        return JSON.parse(result);
      }
    });
  }, []);

  async function onSubmit(data: TLogInSchema) {
    try {
      await signInWithEmailAndPassword(auth, data?.email, data?.password);
      toast.success("Logged in successfully!");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error logging in");
      }
    }
  }

  const id = user?.uid || null;

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    const userN = await getUser({ id });
    setFavorites(userN?.favorites);
    setIsLoading(false);
  }, [id]);

  // const fetchUser = useCallback(async () => {
  //   setIsLoading(true);
  //   const userN = await getUser({ id });
  //   const firebaseLists = userN?.favorites || [];
  //   const localLists = JSON.parse(localStorage.getItem("favoriteList") || "[]");
  //   const MAX_LISTS = 10;
  //   const availableSlots = MAX_LISTS - firebaseLists.length;
  //   if (availableSlots <= 0) {
  //     setFavorites(userN?.favorites);
  //     setIsLoading(false);
  //     toast.info(
  //       "You have reached the maximum number of favorite lists. Please remove some lists to add more.",
  //     );

  //     return;
  //   }
  //   const listsToTake = localLists.slice(0, availableSlots);
  //   setFavorites([...firebaseLists, ...listsToTake]);
  //   if (firebaseLists.length + localLists.length > 10) {
  //     toast.info(
  //       "Some favorite lists from your local storage could not be added because you have reached the maximum limit.",
  //     );
  //   } else {
  //     toast.success(
  //       "You are now logged in! Products saved to favourites before login have been added to your account.",
  //     );
  //   }
  //   setIsLoading(false);
  // }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchUser();
  }, [fetchUser, id, authLoading]);

  // google login
  async function handleLogin() {
    setBtnLoading(true);
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());

      await createUser({
        uid: credential.user?.uid,
        displayName: credential.user?.displayName as string,
        photoURL: credential.user?.photoURL as string,
      });
      // const id = credential.user?.uid;
      // if (id) {
      //   const firebaseUser = await getUser({ id });
      //   const firebaseLists = firebaseUser?.favorites || [];
      //   const localLists = JSON.parse(
      //     localStorage.getItem("favoriteList") || "[]",
      //   );
      //   const MAX_LISTS = 10;
      //   const availableSlots = MAX_LISTS - firebaseLists.length;
      //   if (availableSlots <= 0) {
      //     setFavorites(firebaseUser?.favorites);
      //     setIsLoading(false);
      //     toast.info("You have reached the maximum number of favorite lists.");
      //     window.localStorage.removeItem("favoriteList");
      //     return;
      //   }
      //   const listsToTake = localLists.slice(0, availableSlots);

      //   await mergeFavorites({
      //     uid: id,
      //     localFavorites: [...listsToTake],
      //   });
      //   setFavorites([...firebaseLists, ...listsToTake]);
      //   if (firebaseLists.length + localLists.length > 10) {
      //     // toast.info(
      //     //   "Some favorite lists from your local storage could not be added because you have reached the maximum limit.",
      //     // );

      //     const notMerged = localLists.slice(10 - firebaseLists.length);
      //     setNotMergedList(notMerged);
      //   } else if (localLists.length > 0) {
      //     toast.success(
      //       "You are now logged in! Products saved to favourites before login have been added to your account.",
      //     );
      //   }
      //   window.localStorage.removeItem("favoriteList");
      // }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setBtnLoading(false);
  }

  useEffect(() => {
    setShowInfo("");
  }, [user]);

  //create list
  async function handleCreateList(e: React.FormEvent, name?: string) {
    setIsLoading(true);
    e.preventDefault();

    if (!user) {
      if (typeof window === "undefined") return;

      const newList = {
        id: uuidv4(),
        listName: name || listName,
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

      toast.success(`"${listName || name}" has been created`);

      setFavorites(() => {
        const result = window.localStorage.getItem("favoriteList");
        if (result) {
          return JSON.parse(result);
        }
      });

      setIsLoading(false);
      setCreateList("");
      setShowInfo("");

      return;
    }

    await createFavoriteList({
      uid: user?.uid as string,
      listName: name || listName,
    });
    await fetchUser();
    toast.success(`"${listName || name}" has been created`);
    setIsLoading(false);
    setShowInfo("");
  }

  //handle remove list
  async function handleRemoveList(listId: string, listName: string) {
    await deleteFavoriteList({ uid: id as string, listId });
    toast.success(` "${listName}" has been removed`);
    await fetchUser();
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
    setFavorites(newList);
  }

  // change list name
  async function handleChangeListName(listid: string, listName: string) {
    await updateListName(id as string, listid, listName);
    await fetchUser();
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

  // reset when showInfo is false
  useEffect(() => {
    setListName("");
    setCreateList("");
  }, [showInfo]);

  // loading
  if (authLoading || isLoading)
    return (
      <div className="mx-12 my-20 space-y-2">
        <Skeleton
          variant="rectangular"
          width={400}
          height={70}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={400}
          height={20}
          animation="wave"
        />
        <div className="mt-10 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton
              variant="rectangular"
              width={150}
              height={15}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width={150}
              height={15}
              animation="wave"
            />
          </div>
          <span
            className={`animate-ball-bounce-small block h-2 w-2 rounded-full bg-black`}
          />
        </div>
        <div className="mt-5 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={250}
              height={250}
              animation="wave"
            />
          ))}
        </div>
        {user ? (
          <Button className="mt-8 flex w-35 cursor-default items-center justify-center rounded-full border-4 border-black hover:bg-black/90">
            <span
              className={`animate-ball-bounce-x-small block h-2 w-2 rounded-full bg-white`}
            />
          </Button>
        ) : (
          <div className="mt-8 flex gap-5">
            <Button
              variant={"border"}
              className="flex w-35 cursor-default items-center justify-center rounded-full border-black outline-none"
            >
              <span
                className={`animate-ball-bounce-x-small block h-2 w-2 cursor-default rounded-full bg-black`}
              />
            </Button>
            <Button className="flex w-35 cursor-default items-center justify-center rounded-full border-4 border-black hover:bg-black/90">
              <span
                className={`animate-ball-bounce-x-small block h-2 w-2 rounded-full bg-white`}
              />
            </Button>
          </div>
        )}
      </div>
    );

  return (
    <>
      <div className="mx-12 my-20 space-y-5">
        {favorites?.length ? (
          <>
            <h1 className="mb-4 text-4xl">Your favorites</h1>
            <p className="text-muted-foreground text-sm">
              {favorites?.length} {favorites?.length === 1 ? "list" : "lists"}{" "}
              in total
            </p>
            {!user && (
              <div className="mb-10 flex gap-3 rounded-[4px] border-l-4 border-[#f26a2f] p-4 shadow-[3px_8px_10px_rgba(0,0,0,0.08)]">
                <TriangleAlert color="#f26a2f" />
                <div>
                  <p className="font-semibold">
                    These lists are only temporary
                  </p>
                  <p className="text-sm text-gray-600">
                    <span
                      className="cursor-pointer underline"
                      onClick={() => setShowInfo("login")}
                    >
                      Log in or join{" "}
                    </span>
                    to make sure your lists are here when you come back and to
                    view them on other devices.
                  </p>
                </div>
              </div>
            )}
            {favorites &&
              favorites
                .slice()
                .reverse()
                .map((fav: TFavorites) => {
                  return (
                    <FavoritesItems
                      key={fav.id}
                      id={id as string}
                      fav={fav}
                      favorites={favorites}
                      handleRemoveList={handleRemoveList}
                      handleChangeListName={handleChangeListName}
                      fetchUser={fetchUser}
                      handleCreateList={handleCreateList}
                      handleRemoveFromLocalStorage={
                        handleRemoveFromLocalStorage
                      }
                      setFavorites={setFavorites}
                    />
                  );
                })}
          </>
        ) : (
          <>
            <h1 className="mb-7 text-4xl">
              You don`t seem to have any favorites yet
            </h1>
            <p className="text-[15px] text-gray-600">
              Save and arrange the best bits of your future home here until
              you`re ready for them.
            </p>

            <div className="flex items-center gap-4">
              <Heart size={18} strokeWidth={3} />
              <p className="font-semibold">
                Save products using the Save to favorites button
              </p>
            </div>
            <div className="flex items-center gap-4">
              <List size={18} strokeWidth={2.5} />
              <p className="font-semibold">
                Save your products to different lists
              </p>
            </div>
            <div className="flex items-center gap-4">
              <UserRound size={18} strokeWidth={3} />
              <p className="font-semibold">
                Join or log in to view saved lists on different devices
              </p>
            </div>
          </>
        )}
        {favorites?.length === 10 && (
          <div className="flex gap-3 rounded-[4px] border-l-4 border-[#f26a2f] p-4 shadow-[3px_8px_10px_rgba(0,0,0,0.08)]">
            <TriangleAlert color="#f26a2f" />
            <div>
              <p className="font-semibold">List limit reached</p>
              <p className="text-sm text-gray-600">
                Please remove one favourite list to be able to add more lists.
                The number of products within each list is not affected by this
                limit, so you can still add to or edit the existing ones.
              </p>
            </div>
          </div>
        )}
        {user ? (
          <Button
            variant={"default"}
            className={`mt-7 rounded-full border-black py-4`}
            onClick={() => setShowInfo("create")}
            disabled={favorites?.length === 10}
          >
            Create a new list
          </Button>
        ) : (
          <div className="mt-7 flex items-center gap-4">
            <Button
              variant={"border"}
              className="rounded-full px-10"
              onClick={() => setShowInfo("login")}
            >
              Log in
            </Button>
            <Button
              variant={"default"}
              className="rounded-full border-black py-4"
              onClick={() => setShowInfo("create")}
              disabled={favorites?.length === 10}
            >
              Create a new list
            </Button>
          </div>
        )}
      </div>
      {/* show login */}
      <FavoritesSidebar showInfo={showInfo} setShowInfo={setShowInfo}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white p-8 pt-24 pb-12 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "login" ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => {
              setShowInfo("");
            }}
            className={`absolute top-5 right-5 cursor-pointer`}
          >
            <X size={20} />
          </button>
          {user ? (
            <div className="flex h-full flex-col justify-between">
              <h2>Hey {user.displayName?.split(" ")[0]}!</h2>
              <button
                onClick={async () => {
                  try {
                    await signOut(auth);
                    toast.success("Logout successfully", {
                      style: {
                        border: "3px solid #dedede",
                      },
                    });
                  } catch {
                    toast.error("Failed to logout");
                  }
                }}
                className="flex w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 font-semibold transition-all duration-200 ease-out hover:bg-gray-200"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <h1 className="text-1xl mb-4 font-bold">
                  Log in to your account
                </h1>
                <p className="text-muted-foreground mb-2 text-[15px]">
                  Get a more personalised experience where you don`t need to
                  fill in your information every time
                </p>
                <div>
                  <label
                    htmlFor="email"
                    className="text-muted-foreground text-md font-normal"
                  >
                    Email
                  </label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    className="py-6"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-muted-foreground text-md font-normal"
                  >
                    Password
                  </label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    className="py-6"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Link
                  href="/reset-password"
                  className="text-muted-foreground block underline"
                >
                  Forgot your password?
                </Link>
                <Button
                  disabled={isSubmitting}
                  className="mt-10 w-full cursor-pointer rounded-full p-6 disabled:bg-gray-950"
                >
                  Log in
                </Button>
              </form>
              <Button
                onClick={handleLogin}
                disabled={btnLoading}
                className="mt-4 w-full cursor-pointer rounded-full p-6 disabled:bg-gray-950"
              >
                <FcGoogle size={25} />
                <span>Sign in with Google</span>
              </Button>
              <p className="text-muted-foreground after:content-[' '] before:content-[' '] relative my-10 text-center text-sm before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[38%] before:bg-black/30 after:absolute after:top-1/2 after:right-0 after:h-[1px] after:w-[38%] after:bg-black/30">
                New at IKEAN?
              </p>
              <Button
                variant={"border"}
                className="w-full cursor-pointer rounded-full p-6"
              >
                <Link href={"/sign-up"} onClick={() => setShowInfo("")}>
                  Create account
                </Link>
              </Button>
            </>
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
          className={`fixed top-0 right-0 box-border h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/40 bg-white p-6 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "create" ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute top-7 left-2 flex w-full items-center justify-between pr-4">
            <h2 className="m-auto self-center">Create a new list </h2>
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} />
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
              loading={isLoading}
            >
              Save
            </CustomButton>
          </form>
        </div>
      </FavoritesSidebar>
      {/*  notMergedList */}
      <div
        className={`fixed top-0 left-0 z-200 h-screen w-screen bg-black/30 transition duration-200 ${notMergedList ? "" : "pointer-events-none"}`}
        style={{
          opacity: notMergedList ? "1" : "0",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-1/2 right-1/2 w-[500px] translate-x-1/2 -translate-y-1/2 rounded-xl border border-black/30 bg-white p-10 transition duration-200 [scrollbar-gutter:stable] ${notMergedList ? "scale-100" : "scale-80"} flex flex-col justify-evenly`}
        >
          <div
            className="flex justify-end"
            onClick={() => setNotMergedList(null)}
          >
            <X size={22} className="cursor-pointer" />
          </div>
          <h1 className="my-6 text-2xl">Maximum favorites lists reached</h1>
          <p className="text-[15px] text-[#737373]">
            You&apos;ve reached the maximum number of favorite lists allowed Due
            to the limit, some lists created before login couldn&apos;t be saved
            to your account.
          </p>
          <p className="mt-6 font-semibold">
            These exceeded lists have been removed:
          </p>
          <ul className="ms-8 mt-2 space-y-1 text-sm font-semibold text-[#737373] [&>li]:list-disc">
            {notMergedList?.map((list) => (
              <li key={list.id}>{list.listName}</li>
            ))}
          </ul>
          <Button
            variant={"default"}
            className="mt-6 rounded-full py-6 font-bold"
            onClick={() => setNotMergedList(null)}
          >
            Okay, got it!
          </Button>
        </div>
      </div>
    </>
  );
}
