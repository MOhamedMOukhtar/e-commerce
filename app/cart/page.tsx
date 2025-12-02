"use client";

import Link from "next/link";
import FavoritesSidebar from "../favorites/components/FavoritesSidebar";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

function Page() {
  const [showInfo, setShowInfo] = useState<string>("");

  // disable scroll when showInfo is true
  useEffect(() => {
    const body = document.body;
    if (showInfo) {
      body.style.overflowY = "hidden";
      body.style.paddingRight = "15px";
    } else {
      body.style.overflowY = "auto";
      body.style.paddingRight = "0";
    }
  }, [showInfo]);

  return (
    <div className="mx-12 my-20 space-y-5">
      <h1 className="mb-4 text-4xl">Your bag is empty</h1>
      <p className="my-12 text-sm text-[#484848]">
        You can add products to your shopping bag, either by searching or by
        <Link href={"/"} className="cursor-pointer underline">
          {" "}
          browsing products.
        </Link>
      </p>
      <div className="space-y-2 text-sm font-bold text-[#111111]">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path d="M19.205 5.599c.9541.954 1.4145 2.2788 1.4191 3.6137 0 3.0657-2.2028 5.7259-4.1367 7.5015-1.2156 1.1161-2.5544 2.1393-3.9813 2.9729L12 20.001v-2.3516c.6699-.4304 1.9095-1.2834 3.1347-2.4084 1.8786-1.7247 3.4884-3.8702 3.4894-6.0264-.0037-.849-.2644-1.6326-.8333-2.2015-1.1036-1.1035-2.9413-1.0999-4.0445.0014l-1.7517 1.7448-1.7461-1.7462c-1.1165-1.1164-2.9267-1.1164-4.0431 0-1.6837 1.6837-.5313 4.4136.6406 6.0155.3487.4768.7386.9326 1.1472 1.3617L8 11.9982l2 .0057-.017 6-6-.0171.0056-2 2.7743.0079c-.5387-.5472-1.0629-1.1451-1.5311-1.7852-1.0375-1.4183-1.8594-3.1249-1.8597-4.9957-.0025-1.2512.3936-2.5894 1.419-3.6149 1.8976-1.8975 4.974-1.8975 6.8716 0l.3347.3347.336-.3347c1.8728-1.8722 4.9989-1.8727 6.8716 0z"></path>
          </svg>
          <p
            className="cursor-pointer underline"
            onClick={() => setShowInfo("change")}
          >
            90 days to change your mind
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 3C9.7909 3 8 4.7909 8 7v4H5v11h14V11h-3V7c0-2.2091-1.7909-4-4-4zm2 8V7c0-1.1046-.8954-2-2-2s-2 .8954-2 2v4h4zm-7 9v-7h10v7H7z"
            ></path>
          </svg>
          <p
            className="cursor-pointer underline"
            onClick={() => setShowInfo("secure")}
          >
            Secure shopping with SSL encryption
          </p>
        </div>
      </div>
      <FavoritesSidebar showInfo={showInfo} setShowInfo={setShowInfo}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "change" ? "translate-x-0" : "translate-x-full"} flex flex-col px-8 pt-6`}
        >
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="mt-14">
            <h1>It`s ok to change your mind!</h1>
            <p className="my-8 text-sm text-[#484848]">
              If you`re not totally satisfied with your IKEA purchase, you can
              return it within 90 days, together with proof of purchase, for a
              full refund. Refunds will be made in the same form of payment
              originally used to make the purchase.
            </p>
            <p className="text-sm font-bold">
              Enjoy the benefit of 90 days to return unopened products.
            </p>
            <Link
              href={`/returns-claims`}
              className="mt-8 block cursor-pointer text-sm font-bold underline"
            >
              Explore IKEA&apos;s return policy for more information
            </Link>
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-[-15px] h-screen w-[460px] overflow-y-auto rounded-l-lg border border-black/30 bg-white transition duration-200 [scrollbar-gutter:stable] ${showInfo === "secure" ? "translate-x-0" : "translate-x-full"} flex flex-col px-8 pt-6`}
        >
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowInfo("");
              }}
              className="cursor-pointer"
            >
              <X size={20} opacity={0.6} strokeWidth={3} />
            </button>
          </div>
          <div className="mt-14">
            <h1 className="text-3xl font-bold">This site is secure</h1>
            <p className="my-8 text-sm text-[#484848]">
              www.ikea.com is validated as a secure site for sending and
              receiving sensitive data by DigiCert OV SSL Certificate.
            </p>
            <p className="my-8 text-sm text-[#484848]">
              The SSL technology encrypts the communication between the web
              browser and website, ensuring that no information can be
              intercepted or accessed by a third party.
            </p>
          </div>
        </div>
      </FavoritesSidebar>
    </div>
  );
}

export default Page;
