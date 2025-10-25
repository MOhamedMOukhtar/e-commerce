import Link from "next/link";
import React from "react";

function SecTipsIdeas({
  showSections,
  display,
}: {
  showSections: boolean | (() => void);
  display: boolean | (() => void);
}) {
  return (
    <section
      className={`mb-[-15px] flex flex-col gap-5 transition-all duration-100 ease-out ${showSections ? "opacity-100" : "opacity-0"} ${display ? "block" : "hidden"} `}
      style={{
        maxHeight: showSections ? "120px" : "0px",
      }}
    >
      <ul className="flex gap-20 text-base text-black/70">
        <div className="underline-pointer flex flex-col gap-2">
          <li className="font-medium text-black/80">See all in Tips & ideas</li>
          <li>
            <Link href={"/cat/affordable-essentials"}>
              Affordable essentials
            </Link>
          </li>
          <li>
            <Link href={"/cat/lowest-price"}>Our lowest price</Link>
          </li>
          <li>
            <Link href={"/cat/limited-editions"}>Limited editions</Link>
          </li>
          <li>
            <Link href={"/cat/value-for-money"}>
              Small furniture value for money
            </Link>
          </li>
        </div>
        {/* <div className="underline-pointer flex flex-col gap-2">
          <li>Ideas</li>
          <li>Inspiration</li>
          <li>Brochures</li>
        </div> */}
      </ul>
    </section>
  );
}

export default SecTipsIdeas;
