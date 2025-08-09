import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  LayoutDashboard,
  LibraryBig,
  ShoppingCart,
  Star,
  User,
  PackageOpen,
  Layers2,
  Cat,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

type MenuItem = {
  name: string;
  link: string;
  icon: React.ReactNode;
};

////////////// FUNCTIONAL COMPONENT //////////////
export default function Sidebar() {
  const menuList: MenuItem[] = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers2 className="h-5 w-5" />,
    },
    {
      name: "Brands",
      link: "/admin/brands",
      icon: <Cat className="h-5 w-5" />,
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Reviews",
      link: "/admin/reviews",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Collections",
      link: "/admin/collections",
      icon: <LibraryBig className="h-5 w-5" />,
    },
    {
      name: "Admins",
      link: "/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];
  return (
    <section className="sticky top-0 flex h-screen w-[260px] flex-col gap-20 border-r bg-white py-3 ps-3">
      <div className="flex items-center justify-center">
        {/* <Image
          src="/ikean-logo.png"
          alt="logo"
          width={70}
          height={70}
          priority
        /> */}
        <h1 className="pe-1 text-3xl font-bold">IKEAN STORE</h1>
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {menuList.map((item) => (
          <Sections item={item} key={item.name} />
        ))}
      </ul>
      <button
        onClick={async () => {
          try {
            await signOut(auth);
            toast.success("Logout successfully", {
              style: {
                border: "3px solid #dedede",
              },
            });
          } catch {
            toast.error("Failed to logout");
          }
        }}
        className="flex cursor-pointer items-center gap-1 rounded-l-md p-2 font-semibold transition-all duration-200 ease-out hover:bg-gray-200"
      >
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </section>
  );
}

////////////// FUNCTIONAL COMPONENT //////////////
function Sections({ item }: { item: MenuItem }) {
  const pathName = usePathname();
  const isActive = pathName === item.link;

  return (
    <Link href={item.link} key={item.name}>
      <li
        className={`flex items-center gap-2 rounded-l-md px-3 py-2 font-semibold transition-all duration-200 ease-out ${isActive ? "bg-black/90 text-white" : "text-black/80 hover:bg-gray-200"}`}
      >
        {item.icon}
        {item.name}
      </li>
    </Link>
  );
}
