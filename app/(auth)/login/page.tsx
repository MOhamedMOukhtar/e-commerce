"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AutnContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createUser } from "@/lib/firestore/user/write";

const logInSchema = z.object({
  email: z
    .string()
    .min(1, "The email field cannot be left empty")
    .email("Invalid email address"),
  password: z.string().min(1, "The password field cannot be left empty"),
});

type TLogInSchema = z.infer<typeof logInSchema>;

////////////// FUNCTIONAL COMPONENT //////////////
function SignIn() {
  const { user } = useAuth();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  });

  useEffect(() => {
    if (user) {
      router.push("/account");
    }
  }, [user, router]);

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

  return (
    <div className="mx-12 my-20 flex justify-around">
      <div className="w-3/10 space-y-5">
        <h1 className="">Log in to your account</h1>
        <p className="text-muted-foreground text-start">
          Get a more personalised experience where you don`t need to fill in
          your information every time
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-4/10 flex-col gap-4"
      >
        <h1 className="mb-4 w-8/10 text-lg font-bold">
          Log in or join IKEAN today to benefit from a more personalized
          experience
        </h1>
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
            className="py-5"
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
            className="py-5"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
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
          className="w-full cursor-pointer rounded-full p-5 disabled:bg-gray-950"
        >
          Log in
        </Button>
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full cursor-pointer rounded-full p-5 disabled:bg-gray-950"
        >
          {/* <PulseLoader color="#fff" size={8} loading={true} className={``} /> */}
          <FcGoogle size={25} />
          <span>Sign in with Google</span>
        </Button>
        <p className="text-muted-foreground after:content-[' '] before:content-[' '] relative text-center text-sm before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[38%] before:bg-black/30 after:absolute after:top-1/2 after:right-0 after:h-[1px] after:w-[38%] after:bg-black/30">
          New at IKEAN?
        </p>
        <Button
          variant={"border"}
          className="w-full cursor-pointer rounded-full p-5"
          onClick={() => reset()}
        >
          <Link href={"/sign-up"}>Create account</Link>
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
