"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { PulseLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AutnContext";
import { useRouter } from "next/navigation";

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
  const authContext = useAuth();
  const user = authContext?.user;

  const router = useRouter();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  });

  console.log(user);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  async function onSubmit(data: TLogInSchema) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    reset();
  }

  async function handleLogin() {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Login failed:", error);
    }
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-20 flex w-1/3 flex-col gap-4"
    >
      <h1 className="text-1xl mb-4 font-bold">
        Log in or join IKEA today to benefit from a more personalized experience
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
      <Link href="/reset" className="text-muted-foreground block underline">
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
        disabled={isloading}
        className="relative w-full cursor-pointer rounded-full p-5 disabled:bg-gray-950"
      >
        <PulseLoader
          color="#fff"
          size={8}
          loading={isloading}
          className="absolute top-1/2 left-4 -translate-y-1/2"
        />
        <FcGoogle size={25} />
        Sign in with Google
      </Button>
      <p className="text-muted-foreground after:content-[' '] before:content-[' '] relative text-center text-sm before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[38%] before:bg-black/30 after:absolute after:top-1/2 after:right-0 after:h-[1px] after:w-[38%] after:bg-black/30">
        New at IKEA?
      </p>
      <Button
        variant={"border"}
        className="w-full cursor-pointer rounded-full p-5"
      >
        <Link href={"/sign-up"}>Create account</Link>
      </Button>
    </form>
  );
}

export default SignIn;
