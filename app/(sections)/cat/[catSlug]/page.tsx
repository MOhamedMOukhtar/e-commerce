"use client";

import { usePathname } from "next/navigation";

function Page() {
  const pathName = usePathname();

  return <div className="mt-50">{pathName.split("/").at(-1)}</div>;
}

export default Page;
