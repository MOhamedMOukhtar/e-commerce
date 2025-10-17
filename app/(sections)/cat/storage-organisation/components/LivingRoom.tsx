import { PopupInfo } from "@/app/components/IndicatorPopup";
import Image from "next/image";
import React from "react";

function LivingRoom() {
  return (
    <div>
      <h2 className="mt-25 mb-4 text-2xl font-bold">
        Learn from your living room
      </h2>
      <p className="mb-10 max-w-60/100 text-sm leading-5 text-[#484848]">
        Storage helps your indoor life run more smoothly, right? Bring the same
        thinking outdoors and let the good times flow. Made of durable acacia,
        NÄMMARÖ series has a shelving unit and a storage box that give your
        essentials a home. So when your plant baby has outgrown its pot, you can
        easily find your trusty trowel.
      </p>
      {/* grid-work relative grid grid-cols-[repeat(15,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))] gap-5 text-center */}
      <div className="relative grid aspect-[1/.55] grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-1 gap-5 text-center">
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/5ce4710b3e3660b5/original/PH191292-crop001.jpg?f=m"
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[50%] left-[15%]",
              name: "NÄMMARÖ",
              summery: "Storage box, 80x40x45 cm",
              price: "6370",
              previousPrice: "7495",
              id: "EVPUwKUrwXyo5RaBnbYx",
              active: true,
            },
          ]}
        />
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/5c242cbbe5d7d0d2/original/PH204288.jpg?f=m"
          props={[
            {
              side: "top",
              align: "end",
              className: "top-[75%] right-[37%]",
              name: "NÄMMARÖ",
              summery: "Shelving unit, outdoor, 83x75 cm",
              price: "9995",
              id: "lAINQpctiNUHLDJnX1AE",
              active: true,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default LivingRoom;
