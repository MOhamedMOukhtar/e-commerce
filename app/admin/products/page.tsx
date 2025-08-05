import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <main className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Products</h1>
        <Link href={"/admin/products/create"}>
          <Button>Create Product</Button>
        </Link>
      </div>
    </main>
  );
}

export default page;
