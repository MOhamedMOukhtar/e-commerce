import { useAuth } from "@/context/AutnContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { user } = useAuth();
  const { data: admin } = useAdmin({ email: user?.email });

  return (
    <section className="flex items-center gap-1 border-b bg-white px-4 py-2">
      <div className="flex items-center justify-center md:hidden">
        <button
          className="-ml-1 block cursor-pointer md:hidden"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>
      </div>
      <div className="flex w-full items-center justify-between pr-0">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <p className="text-md font-semibold text-black">{admin?.name}</p>
            <p className="text-sm text-gray-500">{admin?.email}</p>
          </div>
          <Image
            src={admin?.imageURL}
            width={30}
            height={30}
            alt="avatar"
            className="rounded-full"
          />
        </div>
      </div>
    </section>
  );
}

export default Header;
