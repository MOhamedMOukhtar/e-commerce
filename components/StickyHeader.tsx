"use client";

import z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { auth } from "@/lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/lib/firestore/user/write";
import AuthContextProvider, { useAuth } from "@/context/AutnContext";
import { Heart, LogOut, Search, UserRound, X } from "lucide-react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const logInSchema = z.object({
  email: z
    .string()
    .min(1, "The email field cannot be left empty")
    .email("Invalid email address"),
  password: z.string().min(1, "The password field cannot be left empty"),
});

type TLogInSchema = z.infer<typeof logInSchema>;

export default function StickyHeader() {
  return (
    <AuthContextProvider>
      <StickyHeaderChild />
    </AuthContextProvider>
  );
}

function StickyHeaderChild() {
  const pathname = usePathname();
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scrollDir, setScrollDir] = useState("up");

  const { user } = useAuth();
  if (user) console.log("User in sticky header:", user);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDir("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);

    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

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

  useEffect(() => {
    setShowInfo(false);
  }, [user]);

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
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

  async function handleLogin() {
    setIsLoading(true);
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());

      await createUser({
        uid: credential.user?.uid,
        displayName: credential.user?.displayName,
        photoURL: credential.user?.photoURL,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    reset();
  }, [showInfo, reset]);
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  if (pathname.includes("/admin")) return null;
  return (
    <>
      <nav
        className={`sticky top-0 z-100 flex items-center justify-between bg-white px-10 py-6 transition duration-400 ${scrollDir === "down" ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/ikean.png" width={100} height={100} alt="logo-IKean" />
          </Link>
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-black/50"
              size={18}
            />
            <Input
              placeholder="What are you looking for?"
              className="w-[400px] rounded-full border-none bg-[#f5f5f5] py-6 ps-10 !text-base focus-visible:ring-[2px] focus-visible:ring-[#004F93] xl:w-[600px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`cursor-pointer ${user ? "" : "rounded-full p-2.5 hover:bg-gray-200"}`}
            onClick={() => setShowInfo(true)}
          >
            {user ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-black/80">
                {user.displayName?.split(" ")[0][0].toUpperCase()}
              </div>
            ) : (
              <UserRound size={22} strokeWidth={2.5} />
            )}
          </div>
          <div className="cursor-pointer rounded-full p-2.5 hover:bg-gray-200">
            <Heart size={22} strokeWidth={2.5} />
          </div>
          <div className="cursor-pointer rounded-full p-2.5 hover:bg-gray-200">
            <svg viewBox="0 0 25 25" width="28" height="28" strokeWidth="0.5">
              <path
                fillOpacity="0.8"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9997 4c1.7048 0 2.9806 1.122 3.4578 2.7127.3246 1.0819.5718 2.1886.8335 3.2873h6.1517l-3.75 10H5.3067l-3.75-10h6.1516c.2617-1.0987.509-2.2054.8335-3.2873C9.019 5.122 10.2948 4 11.9997 4zm2.2348 6H9.7648c.2293-.9532.5299-2.1701.6927-2.7127C10.6838 6.533 11.1739 6 11.9997 6s1.3158.533 1.5421 1.2873c.1628.5426.4634 1.7595.6927 2.7127zm-9.7918 2 2.25 6h10.614l2.25-6h-3.3252c-.6633 2.1065-1.7665 4-4.2318 4-2.4654 0-3.5686-1.8935-4.2319-4h-3.325zm5.4308 0c.3635 1.0612.8841 2 2.1262 2 1.242 0 1.7626-.9388 2.1261-2H9.8735z"
              ></path>
            </svg>
          </div>
        </div>
        {/* show login */}
      </nav>
      <div
        className={`fixed top-0 left-0 z-200 h-screen w-screen bg-black/30 transition duration-200 ${showInfo ? "" : "pointer-events-none"}`}
        style={{
          opacity: showInfo ? "1" : "0",
        }}
        onClick={() => {
          setShowInfo(false);
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-1/3 overflow-y-auto rounded-l-lg border border-black/30 bg-white p-12 pt-24 pb-12 transition duration-200 [scrollbar-gutter:stable] ${showInfo ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => {
              setShowInfo(false);
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
                  <p className="text-sm text-red-600">{errors.email.message}</p>
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
              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full cursor-pointer rounded-full p-6 disabled:bg-gray-950"
              >
                {/* <PulseLoader color="#fff" size={8} loading={true} className={``} /> */}
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
                <Link href={"/sign-up"} onClick={() => setShowInfo(false)}>
                  Create account
                </Link>
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

// 0058A3
// 004F93 (hover)
