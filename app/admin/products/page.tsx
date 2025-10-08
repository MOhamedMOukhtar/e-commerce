"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import ListView from "./component/ListView";
import { getProductsbySubSection } from "@/lib/firestore/products/read_server";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const [filter, setFilter] = useState("all");
  const [numberProducts, setNumberProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNumberProducts() {
      setLoading(true);
      const data = await getProductsbySubSection(filter);
      setNumberProducts(data.length);
      setLoading(false);
    }
    fetchNumberProducts();
  }, [filter]);

  return (
    <main className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl">
          <h1>Products,</h1>
          {loading ? (
            <Skeleton className="h-7 w-32 rounded-sm bg-black/40" />
          ) : (
            <span className="rounded-sm bg-black/40 px-3 text-xl font-semibold">
              {numberProducts} product
            </span>
          )}
        </div>
        <Link href={"/admin/products/create"}>
          <Button>Create Product</Button>
        </Link>
      </div>
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Sub Section" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0O2C0aBMeT7dnwtBVq2S">Ideas </SelectItem>
            <SelectItem value="1jp2rVyoJyVj3XwVP057">
              Small furniture value for money
            </SelectItem>
            <SelectItem value="317H68U36iOAOEDoVDeE">Bathroom</SelectItem>
            <SelectItem value="3PzG1uqngJl7IM7f3qMT">
              Children&apos;s room
            </SelectItem>
            <SelectItem value="EZF9QPF4wpbFipU5oDj7">Lighting</SelectItem>
            <SelectItem value="HTB3JJDO3lMgr6YV5KH4">Special offers</SelectItem>
            <SelectItem value="IqOcO54cFPY2Uk6KfoDI">Dining</SelectItem>
            <SelectItem value="J2XoHhirJOMYOsSDESkb">Bedroom</SelectItem>
            <SelectItem value="MDJtEcIWQM1MZNu3uAO6">
              Small storage & organisers
            </SelectItem>
            <SelectItem value="Q9EB7SYZPMRQoeZaM7c0">Textiles</SelectItem>
            <SelectItem value="W8smVCUj0w00tyPiI8YY">
              Trending this season
            </SelectItem>
            <SelectItem value="X8SZpwUPOMV2osiLadkM">
              Affordable essentials
            </SelectItem>
            <SelectItem value="XoihwXM3dA9PK5Me0Got">
              Limited edition
            </SelectItem>
            <SelectItem value="YAZoWeO5j8C0oY06PmmY">
              Bathroom products
            </SelectItem>
            <SelectItem value="YOn3z2Z6P3q9GC6ZnlDZ">
              Tables & chairs
            </SelectItem>
            <SelectItem value="aqSMTWp3bjhtSYGBuz6c">
              Our lowest price
            </SelectItem>
            <SelectItem value="c6GpaXLE7bbmj53G3pmC">Hallway</SelectItem>
            <SelectItem value="dO718AnhVEx0Jagsxx3b">
              Laundry & cleaning
            </SelectItem>
            <SelectItem value="eRbOdm13dExeeHUmUY78">
              Storage furniture
            </SelectItem>
            <SelectItem value="kHLrzIIPhtwz3azKUQ48">Decoration</SelectItem>
            <SelectItem value="kQ6LsYwTz27Wo8b0SuSc">
              Outdoor products
            </SelectItem>
            <SelectItem value="my3dJRXVFHWv8TFSk2B7">
              Sofas & armchairs
            </SelectItem>
            <SelectItem value="uHcLM3LhjgeeA9fJACS0">Campaigns</SelectItem>
            <SelectItem value="ucNrWvV20hBwGFrN04Bj">
              Kitchenware & tableware
            </SelectItem>
            <SelectItem value="ujE2c67J8e77EjtyjQVv">Inspiration </SelectItem>
            <SelectItem value="w8oztY8JEGWj1DmblZ5m">
              Baby & children
            </SelectItem>
            <SelectItem value="yxwEc0Mjk86rwG9bacWQ">
              Desk & desk chairs
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ListView filter={filter} />
    </main>
  );
}

export default Page;
