import Image from "next/image";
import Link from "next/link";
import React from "react";

function Sidebar() {
  const menuList = [
    { name: "Dashboard", link: "/admin" },
    { name: "Products", link: "/admin/products" },
    { name: "Categories", link: "/admin/categories" },
    { name: "Brands", link: "/admin/brands" },
    { name: "Orders", link: "/admin/orders" },
    { name: "Customers", link: "/admin/customers" },
    { name: "Reviews", link: "/admin/reviews" },
    { name: "Collections", link: "/admin/collections" },
  ];
  return (
    <section className="flex flex-col items-center gap-3 border-r bg-white px-5 py-3">
      <Image src="/ikean-logo.png" alt="logo" width={70} height={70} />
      <ul className="flex flex-1 flex-col gap-3">
        {menuList.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100"
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default Sidebar;
