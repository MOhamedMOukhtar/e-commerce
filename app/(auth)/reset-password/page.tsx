"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";

import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  const handleData = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data?.email);
      toast.success("Reset Link has been sent to your email!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error("Error sending reset link");
      }
    }
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-300 p-10 md:p-24">
      <section className="flex flex-col gap-3">
        <div className="flex justify-center">
          <Image width={300} height={300} src="/ikean-logo.png" alt="Logo" />
        </div>
        <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-5 md:min-w-[440px] md:p-10">
          <h1 className="text-xl font-bold">Forgot Password</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendEmail();
            }}
            className="flex flex-col gap-3"
          >
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              value={data?.email}
              onChange={(e) => {
                handleData("email", e.target.value);
              }}
              className="w-full rounded-xl border px-3 py-2 focus:outline-none"
            />

            <Button disabled={isLoading} type="submit" color="primary">
              Send Reset Link
            </Button>
          </form>
          <div className="flex justify-between">
            <Link href={`/login`}>
              <button className="text-sm font-semibold text-blue-700">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
