"use client";

import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleAlert, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordCheck from "@/components/PasswordCheck";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firestore/user/write";
import { useRouter } from "next/navigation";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must be no more than 20 characters")
  .refine((val) => /[a-z]/.test(val), {
    message: "Must include at least one lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Must include at least one uppercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Must include at least one number",
  })
  .refine((val) => /[^a-zA-Z0-9]/.test(val), {
    message: "Must include at least one special character",
  });

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "The first name field cannot be left empty"),
    lastName: z.string().min(1, "The last name field cannot be left empty"),
    email: z
      .string()
      .min(1, "The email field cannot be left empty")
      .email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TLogInSchema = z.infer<typeof signUpSchema>;

export default function SignIn() {
  const [checked, setChecked] = useState<true | false | "indeterminate">(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const router = useRouter();

  const passwordChecks = {
    minLength: password.length >= 8 && password.length <= 20,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLogInSchema>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: TLogInSchema) {
    if (checked !== true) {
      setError("root", {
        message: "You must have read and accepted the privacy policy.",
      });
      return;
    }
    const credential = await createUserWithEmailAndPassword(
      auth,
      data?.email,
      data?.password,
    );
    await updateProfile(credential.user, { displayName: data?.firstName });
    const user = credential.user;
    const userName = data?.firstName + " " + data?.lastName;
    await createUser({
      uid: user?.uid,
      displayName: userName,
      photoURL: user?.photoURL,
    });
    router.push("/account");
    reset();
  }

  return (
    <div className="mt-10 flex justify-around">
      <div className="space-y-5">
        <h1 className="text-4xl">Create an IKEAN account</h1>
        <p className="text-muted-foreground text-start text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in here
          </Link>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-20 my-5 flex w-1/3 flex-col gap-5"
      >
        <h1 className="mb-4 text-lg font-bold">
          From your profile, you will find all information connected to your
          account. And it`s free to join!
        </h1>
        <div>
          <label
            htmlFor="firstName"
            className="text-muted-foreground text-md font-normal"
          >
            First name
          </label>
          <Input
            {...register("firstName")}
            id="firstName"
            type="text"
            className="py-5"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="text-muted-foreground text-md font-normal"
          >
            Last name
          </label>
          <Input
            {...register("lastName")}
            id="lastName"
            type="text"
            className="py-5"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-muted-foreground text-md font-normal"
          >
            Email address
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
          <div className="relative">
            <Input
              {...register("password")}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={() => setShowPasswordCheck(true)}
              id="password"
              type={showPassword ? "text" : "password"}
              className="py-5"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full p-1 hover:bg-gray-200"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
          {showPasswordCheck && (
            <PasswordCheck
              passwordChecks={passwordChecks}
              check={password.length > 0}
            />
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-muted-foreground text-md font-normal"
          >
            Confirm Password
          </label>
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            className="py-5"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div>
          <div className="group relative flex w-fit items-center gap-3">
            <Checkbox
              id="terms"
              className="h-6 w-6"
              checked={checked}
              onCheckedChange={(value) => {
                setChecked(value);
              }}
            />
            <label
              htmlFor="terms"
              className="text-muted-foreground text-md font-normal"
            >
              I have read and understood the
              <Link
                target="_blank"
                className="pl-1 underline"
                href={"/privacy-policy"}
              >
                privacy policy
              </Link>
            </label>
            {!checked && (
              <Check
                size={15}
                className="absolute top-1/2 left-1 -z-10 -translate-y-1/2 text-transparent group-hover:text-[#ababab]"
              />
            )}
          </div>
          {errors.root && checked !== true && (
            <p className="mt-1 text-xs text-red-600">
              <CircleAlert size={16} className="mr-1 inline-block" />
              {errors.root.message}
            </p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-full p-6 disabled:bg-gray-950"
        >
          Create account
        </Button>
      </form>
    </div>
  );
}

// register("password").onChange(e); // inform RHF
