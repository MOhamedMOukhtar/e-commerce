import { Menu } from "lucide-react";
import React from "react";

function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <section className="flex items-center gap-1 border-b bg-white px-4 py-3">
      <button
        className="-ml-1 block cursor-pointer md:hidden"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </section>
  );
}

export default Header;
