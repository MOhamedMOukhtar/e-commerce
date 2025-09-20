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
      className={`mb-[-17px] flex flex-col gap-5 transition-all duration-100 ease-out ${showSections ? "opacity-100" : "opacity-0"} ${display ? "block" : "hidden"} `}
      style={{
        maxHeight: showSections ? "120px" : "0px",
      }}
    >
      <ul className="flex gap-20 text-base text-black/70">
        <div className="underline-pointer flex flex-col gap-2">
          <li className="font-medium text-black/80">See all in Tips & ideas</li>
          <li>Affordable essentials</li>
          <li>Our lowest price</li>
          <li>Limited editions</li>
          <li>Small furniture value for money</li>
        </div>
        <div className="underline-pointer flex flex-col gap-2">
          <li>Ideas</li>
          <li>Inspiration</li>
          <li>Brochures</li>
        </div>
      </ul>
    </section>
  );
}

export default SecTipsIdeas;
