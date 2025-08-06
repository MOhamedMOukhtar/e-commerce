import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ListView from "./component/ListView";

function page() {
  return (
    <main className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Products</h1>
        <Link href={"/admin/products/create"}>
          <Button>Create Product</Button>
        </Link>
      </div>
      <ListView />
    </main>
  );
}

export default page;
