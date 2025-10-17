import { PopupInfo } from "@/app/components/IndicatorPopup";

function ShelvingUnits() {
  return (
    <div>
      <div>
        <h2 className="mt-25 mb-4 text-2xl font-bold">
          KALLAX shelving units and their BFFs
        </h2>
        <p className="mb-10 max-w-60/100 text-sm leading-5 text-[#484848]">
          Once you`ve found the right KALLAX solution _ the series can deliver a
          neat, organised look to just about any corner of your home _ there`s
          no need to stop. We have a wide range of accessories that fit
          perfectly with the series _ boxes, baskets, doors, drawers and more _
          so you can tailor each compartment to the storage needs of that
          specific space.
        </p>
      </div>
      <div className="grid-work relative grid grid-cols-[repeat(15,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))] gap-5 text-center">
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/62afbf070d0e3dad/original/PH205065.jpg?f=m"
          }
          props={[
            {
              side: "bottom",
              align: "center",
              className: "top-[21%] left-[38%]",
              name: "BLÅSVERK",
              summery: "Table lamp, 36 cm",
              price: "1599",
              id: "mcO2c5nYEN8LfAgXaMcQ",
            },
            {
              side: "bottom",
              align: "start",
              className: "top-[40%] left-[15%]",
              name: "KALLAX",
              summery: "Shelving unit, 77x147 cm",
              price: "7695",
              id: "ngCO3RwJwbCW48qbx4Hn",
              active: true,
            },
            {
              side: "top",
              align: "end",
              className: "top-[62%] right-[15%]",
              name: "FRÖSET",
              summery: "Easy chair",
              price: "7995",
              id: "AAK80IPgOYI4LsjUTSGZ",
            },
          ]}
        />

        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/55223adbd371614e/original/PH205066.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "end",
              className: "top-[11%] right-[26%]",
              name: "KALLAX",
              summery: "Shelving unit, 77x147 cm",
              price: "7695",
              id: "ngCO3RwJwbCW48qbx4Hn",
            },
            {
              side: "top",
              align: "center",
              className: "top-[43%] right-[37%]",
              name: "DRÖNA",
              summery: "Box, dark grey",
              price: "499",
              id: "s55KCuT6AHcXm2h5odtL",
            },
            {
              side: "top",
              align: "start",
              className: "bottom-[10%] left-[10%]",
              name: "STOENSE",
              summery: "Rug, low pile",
              price: "5499",
              id: "78Os2ahVAPrSc0WvyBES",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/59bc68b5e2c9eff9/original/PH205068.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "start",
              className: "top-[13%] left-[19%]",
              name: "KALLAX",
              summery: "Shelving unit, 77x77 cm",
              price: "5395",
              id: "emPCbkFzGMsM47QSPpBI",
            },
            {
              side: "bottom",
              align: "end",
              className: "top-[35%] right-[18%]",
              name: "FJÄDERHARV",
              summery: "Storage box with lid",
              price: "429",
              id: "MVav9hK8CPczrthFpPfb",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/691a348a5cc06959/original/PH205067.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "center",
              className: "top-[10%] left-[38%]",
              name: "ZEBRASÄV",
              summery: "Pendant lamp",
              price: "449",
              id: "FxbbFCMYI9WbDoP5mElC",
              highlight: true,
            },
            {
              side: "top",
              align: "center",
              className: "top-[51%] right-[38%]",
              name: "KALLAX",
              summery: "Shelving unit with underframe",
              price: "10395",
              id: "YblFrwuStDhyZiRYqNay",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/7cb34815809435bc/original/PH205069.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "start",
              className: "top-[30%] left-[23%]",
              name: "KALLAX",
              summery: "Shelving unit, 77x77 cm",
              price: "5395",
              id: "emPCbkFzGMsM47QSPpBI",
            },
            {
              side: "left",
              align: "center",
              className: "top-[43%] right-[30%]",
              name: "DRÖNA",
              summery: "Box, 33x38x33 cm",
              price: "499",
              id: "s55KCuT6AHcXm2h5odtL",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ShelvingUnits;
