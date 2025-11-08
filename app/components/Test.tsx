"use client";

import { useState } from "react";

export default function Test() {
  return (
    <div className="m-auto mt-30 flex w-1/2 flex-col border-t border-black/30 text-center">
      {Array.from({ length: 10 }).map((_, i) => (
        <Child key={i} />
      ))}
    </div>
  );
}

function Child() {
  const [scale, setScale] = useState<boolean>(false);
  return (
    <div
      onClick={() => setScale(true)}
      className={`origin-top cursor-pointer overflow-hidden border-b border-black/30 text-2xl font-bold transition-all duration-300 ease-in-out hover:underline ${
        scale
          ? "max-h-0 scale-y-0 opacity-0"
          : "max-h-24 scale-y-100 py-8 opacity-100"
      }`}
    >
      Mohamed
    </div>
  );
}
