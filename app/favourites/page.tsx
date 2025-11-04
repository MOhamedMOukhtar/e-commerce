"use client";

import z from "zod";
import Link from "next/link";
import { toast } from "sonner";
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
import FavouritesSidebar, {
  ExtendedHTMLElement,
} from "./components/FavouritesSidebar";
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
  updateListName,
} from "@/lib/firestore/user/write";
import {
  CircleAlert,
  CircleCheck,
  Heart,
  List,
  LogOut,
  UserRound,
  X,
} from "lucide-react";

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
  list: string[];
  listName: string;
}

function PageChild() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<TFavorites[] | null>(null);
  const [listName, setListName] = useState<string>("");
  const [showInfo, setShowInfo] = useState<string>("");
  const [createList, setCreateList] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  });

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

  // fetch user favorites

  // async function fetchUser() {
  //   const userN = await getUser({ id });
  //   setFavorites(userN?.favorites);
  // }

  const fetchUser = useCallback(async () => {
    const userN = await getUser({ id });
    setFavorites(userN?.favorites);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchUser();
  }, [fetchUser, id]);

  console.log("render");

  // google login
  async function handleLogin() {
    setIsLoading(true);
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());

      await createUser({
        uid: credential.user?.uid,
        displayName: credential.user?.displayName as string,
        photoURL: credential.user?.photoURL as string,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setShowInfo("");
  }, [user]);

  //create list
  async function handleCreateList(e: React.FormEvent, name?: string) {
    setIsLoading(true);
    e.preventDefault();
    await createFavoriteList({
      uid: user?.uid as string,
      listName: name || listName,
    });
    await fetchUser();
    setIsLoading(false);
    setShowInfo("");
  }

  //handle remove list
  async function handleRemoveList(listId: string) {
    await deleteFavoriteList({ uid: id as string, listId });
    await fetchUser();
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

  return (
    <>
      <div className="mx-12 my-20 space-y-5">
        {favorites?.length ? (
          <>
            <h1 className="mb-4 text-4xl">Your favourites</h1>
            <p className="text-muted-foreground text-sm">
              {favorites?.length} {favorites?.length === 1 ? "list" : "lists"}{" "}
              in total
            </p>
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
                    />
                  );
                })}
          </>
        ) : (
          <>
            <h1 className="mb-7 text-4xl">
              You don`t seem to have any favourites yet
            </h1>
            <p className="text-[15px] text-gray-600">
              Save and arrange the best bits of your future home here until
              you`re ready for them.
            </p>

            <div className="flex items-center gap-4">
              <Heart size={18} strokeWidth={3} />
              <p className="font-semibold">
                Save products using the Save to favourites button
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
        {user ? (
          <Button
            variant={"default"}
            className="mt-7 rounded-full border-black py-4"
            onClick={() => setShowInfo("create")}
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
            >
              Create a new list
            </Button>
          </div>
        )}
      </div>
      {/* show login */}
      <FavouritesSidebar showInfo={showInfo} setShowInfo={setShowInfo}>
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
          className={`fixed top-0 right-[-15px] h-screen w-1/3 overflow-y-auto rounded-l-lg border border-black/30 bg-white p-12 pt-24 pb-12 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "login" ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => {
              setShowInfo("");
            }}
            className={`absolute top-5 right-5 cursor-pointer`}
          >
            <X />
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <h1 className="text-1xl mb-4 font-bold">
                Log in to your account
              </h1>
              <p className="text-muted-foreground mb-2 text-[15px]">
                Get a more personalised experience where you don`t need to fill
                in your information every time
              </p>
              <div>
                <label
                  htmlFor="email2"
                  className="text-muted-foreground text-md font-normal"
                >
                  Email
                </label>
                <Input
                  {...register("email")}
                  id="email2"
                  type="email"
                  className="py-6"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="text-muted-foreground text-md font-normal"
                >
                  Password
                </label>
                <Input
                  {...register("password")}
                  id="password2"
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
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full cursor-pointer rounded-full p-6 disabled:bg-gray-950"
              >
                <FcGoogle size={25} />
                <span>Sign in with Google</span>
              </Button>
              <p className="text-muted-foreground after:content-[' '] before:content-[' '] relative my-6 text-center text-sm before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[38%] before:bg-black/30 after:absolute after:top-1/2 after:right-0 after:h-[1px] after:w-[38%] after:bg-black/30">
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
            </form>
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
          className={`fixed top-0 right-0 box-border h-screen w-3/10 overflow-y-auto rounded-l-lg border border-black/40 bg-white p-6 pt-24 pb-6 transition duration-200 [scrollbar-gutter:stable] ${showInfo === "create" ? "translate-x-0" : "translate-x-full"}`}
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
      </FavouritesSidebar>
    </>
  );
}
