"use client";

import { MdOutlineFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  if (pathname.includes("/admin")) return null;

  return (
    <div className="bg-[#f5f5f5] px-12 pt-20">
      <div className="flex pb-10 [&>div>h4]:font-bold">
        <div className="basis-1/4">
          <h4 className="cursor-default pb-5">Useful links</h4>
          <ul className="space-y-4 text-sm font-semibold text-black/50 [&>li]:cursor-pointer [&>li]:hover:underline">
            <li>Brochures</li>
            <li>IKEAN shopping app</li>
            <li>Planning tools</li>
            <li>Stores</li>
            <li>IKEAN restaurant</li>
            <li>IKEAN Family</li>
          </ul>
        </div>
        <div className="basis-1/4">
          <h4 className="cursor-default pb-5">Customer service</h4>
          <ul className="space-y-4 text-sm font-semibold text-black/50 [&>li]:cursor-pointer [&>li]:hover:underline">
            <li>Terms and conditions</li>
            <li>Guarantees & warranties</li>
            <li>Spare parts</li>
            <li>About services</li>
            <li>About shopping</li>
            <li>Return policy</li>
            <li>Contact us</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="basis-1/4">
          <h4 className="cursor-default pb-5">This is IKEAN</h4>
          <ul className="space-y-4 text-sm font-semibold text-black/50 [&>li]:cursor-pointer [&>li]:hover:underline">
            <li>About IKEAN</li>
            <li>Democratic design</li>
            <li>Sustainable everyday</li>
            <li>Community engagement</li>
            <li>Working at IKEAN</li>
          </ul>
        </div>
        <div className="basis-1/4">
          <h4 className="cursor-default pb-5">General information</h4>
          <ul className="space-y-4 text-sm font-semibold text-black/50 [&>li]:cursor-pointer [&>li]:hover:underline">
            <li>Newsroom</li>
            <li>Product recalls</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-1 border-black/10 py-8">
        <div className="flex items-center gap-10">
          <ul className="flex gap-6 text-black/70 [&>li]:box-content [&>li]:cursor-pointer [&>li]:rounded-full [&>li]:border [&>li]:border-black/10 [&>li]:p-1.5 [&>li]:hover:border-black/40">
            <li>
              <MdOutlineFacebook size={20} />
            </li>
            <li>
              <FaInstagram size={20} />
            </li>
            <li>
              <FaYoutube size={20} />
            </li>
            <li>
              <FaXTwitter size={20} className="text-black/50" />
            </li>
          </ul>
          <ul className="flex gap-6">
            <li className="border">
              <Image
                src={
                  "https://www.ikea.com/global/assets/logos/external-payment-providers/american-express.svg"
                }
                width={50}
                height={50}
                alt="american-express"
              />
            </li>
            <li className="border">
              <Image
                src="https://www.ikea.com/global/assets/logos/external-payment-providers/visa.svg"
                width={50}
                height={50}
                alt="visa"
              />
            </li>
            <li className="border">
              <Image
                src="https://www.ikea.com/global/assets/logos/external-payment-providers/master-card.svg"
                width={50}
                height={50}
                alt="master-card"
              />
            </li>
          </ul>
        </div>
        <div>
          <button className="flex cursor-pointer items-center gap-3 rounded-full border-1 border-transparent px-3 py-2 outline-1 outline-black hover:border-black">
            <Globe size={20} />
            <div className="text-xs font-bold">
              <span className="pr-2">EG</span>
              <span className="border-l border-l-black/20 pl-2">English</span>
            </div>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between py-10 text-xs font-semibold text-black/70">
        <div>© Inter IKEAN Systems B.V. 1999-2025</div>
        <ul className="flex items-center gap-6 [&>li]:cursor-pointer [&>li]:hover:text-black/60 [&>li]:hover:underline">
          <li>Privacy policy</li>
          <li>Cookie policy</li>
          <li>Cookie settings</li>
          <li>Terms and conditions</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
