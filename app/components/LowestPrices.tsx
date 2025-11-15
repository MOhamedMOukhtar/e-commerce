import { Button } from "@/components/ui/button";
import React from "react";
import { PopupInfo } from "./IndicatorPopup";
import Link from "next/link";

function LowestPrices() {
  return (
    <div className="-mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-8 text-2xl">Our Lowest Prices</h2>
        </div>
        <Button variant={"border"} className="rounded-full border">
          <Link href="/cat/lowest-price">Lowest Prices</Link>
        </Button>
      </div>
      <div className="my-element relative grid grid-cols-[repeat(12,minmax(0,1fr))] gap-5 text-center">
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/727ed766ccb51e7/original/PH181543.jpg?f=xxs"
          }
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[33%] left-[35%]",
              name: "KONSTFULL",
              summery: "Vase",
              price: "2999",
              id: "zVdaozV89FOU5zVyaT2S",
            },
            {
              side: "right",
              align: "center",
              className: "top-[46%] left-[25%]",
              name: "LACK",
              summery: "Side table, 55x55 cm",
              price: "795",
              id: "cDuJN9QW8ADR5VVaBvyG",
            },
            {
              side: "top",
              align: "center",
              className: "top-[60%] left-[57%]",
              name: "LACK",
              summery: "Side table, 35x35 cm",
              price: "495",
              highlight: true,
              id: "TtxCQNCZrl0LuecmqkPK",
            },
          ]}
        />

        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/6e6843164a14a438/original/PH201874_SHI_001.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "center",
              className: "top-[9%] left-[42%]",
              name: "KARAFF",
              summery: "Carafe",
              price: "169",
              highlight: true,
              id: "Fize241Jf2JvBcoyPbF8",
            },
            {
              side: "bottom",
              align: "start",
              className: "top-[22%] left-[6%]",
              name: "POKAL",
              summery: "Glass",
              price: "89",
              id: "RH5hKDhXK4NLRCNCEt4y",
            },
            {
              side: "bottom",
              align: "end",
              className: "top-[24%] left-[70%]",
              name: "OFTAST",
              summery: "Serving bowl",
              price: "139",
              highlight: true,
              id: "7pW8ASuRSAaqUhW50aAE",
            },
            {
              side: "top",
              align: "center",
              className: "top-[60%] left-[54%]",
              name: "ENHET",
              summery: "High fr w shelves",
              price: "2695",
              id: "TAl2EK4D0Va8BIzi5TnB",
            },
            {
              side: "top",
              align: "start",
              className: "top-[70%] left-[10%]",
              name: "OFTAST",
              summery: "Bowl",
              price: "69",
              highlight: true,
              active: true,
              id: "bCOjVLXlPOQBhu8K6IAZ",
            },
            {
              side: "top",
              align: "center",
              className: "top-[74%] left-[43%]",
              name: "OFTAST",
              summery: "Side plate",
              price: "69",
              highlight: true,
              id: "FI1qO7Tm6vxguGHiWDFL",
            },
            {
              side: "top",
              align: "end",
              className: "top-[76%] left-[64%]",
              name: "OFTAST",
              summery: "Plate",
              price: "69",
              highlight: true,
              id: "NyC2tgrqkMK29kBfxV8F",
            },
            {
              side: "top",
              align: "end",
              className: "top-[68%] left-[73%]",
              name: "UPPDATERA",
              summery: "Cutlery caddy",
              price: "329",
              id: "hXhuR7hWECAUGYzb2eCy",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/7fea7c95ef63df42/original/PH184996-crop001.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "start",
              className: "top-[22%] right-[40%]",
              name: "BURHULT / SIBBHULT",
              summery: "Wall shelf",
              price: "325",
              id: "qRV5EVOJBrsiVtNN9ofD",
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[45%] left-[40%]",
              name: "VEBJÖRN",
              summery: "Desk",
              price: "21995",
              id: "idUmmICX6quQqyHBcLLo",
            },
            {
              side: "right",
              align: "center",
              className: "top-[64%] left-[32%]",
              name: "GLOSTAD",
              summery: "2-seat sofa",
              price: "9995",
              active: true,
              highlight: true,
              id: "PkjJ78cWqcMLgc3s6dVw",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/2ab3fed9df5e0aca/original/PH197598.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "start",
              className: "top-[7%] left-[32%]",
              name: "RÄFFELBJÖRK",
              summery: "Vase",
              price: "1799",
              id: "wT0rVI6VmkG5Zu2OcMMd",
            },

            {
              side: "left",
              align: "center",
              className: "top-[47%] right-[9%]",
              name: "IKEA 365+",
              summery: "Glass",
              price: "499",
              id: "oTir3M0Kv9e1ZM1qpuYl",
            },
            {
              side: "top",
              align: "start",
              className: "top-[54%] left-[25%]",
              name: "BAGGEBO",
              summery: "Bookcase",
              price: "2795",
              highlight: true,
              id: "yN8bKz15YeiCAGMIpBnY",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/images/our-lowest-prices-05cb57a4b1c5c4406620f558a43f126f.jpg?f=xxs"
          }
          href="/cat/lowest-price"
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/4e3cfde417215408/original/PH193233.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "start",
              className: "top-[8.5%] left-[31.5%]",
              name: "REGOLIT",
              summery: "Pendant lamp shade",
              price: "169",
              id: "wbq2vYtnsKBRGoqbtSM4",
            },
            {
              side: "bottom",
              align: "end",
              className: "top-[10%] right-[2%]",
              name: "VALLSTENA",
              summery: "Door",
              price: "945",
              active: true,
              id: "SCQxwntOHLzQ5n56fCqk",
            },
            {
              side: "left",
              align: "center",
              className: "top-[38%] right-[8%]",
              name: "PÅLYCKE",
              summery: "Clip-on basket",
              price: "399",
              highlight: true,
              id: "FT8vrKWfnTHl6nw6IR6e",
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[40%] left-[47%]",
              name: "TRONES",
              summery: "Shoe cabinet/storage",
              price: "1999",
              highlight: true,
              id: "baIxSqXOjbKJOgDSUQLr",
            },
            {
              side: "right",
              align: "center",
              className: "top-[38%] left-[32%]",
              name: "TJUSIG",
              summery: "Hanger",
              price: "1349",
              id: "32lASJOo8ESYwqBZKWKr",
            },
          ]}
        />
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/28b434bdc948942a/original/PH204423.jpg?f=xxs"
          props={[
            {
              side: "bottom",
              align: "end",
              className: "top-[15%] left-[54%]",
              name: "SILVTJÄRN",
              summery: "Toothbrush holder",
              price: "549",
              id: "7c1KWkLdwvmzKrhu2b0l",
            },
            {
              side: "bottom",
              align: "end",
              className: "top-[31%] left-[56%]",
              name: "TAVELÅN",
              summery: "Tray",
              price: "899",
              active: true,
              id: "rQS7kBUuA0tCETYLnQFY",
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[42%] left-[42%]",
              name: "TISKEN",
              summery: "Toothbrush holder with suction cup",
              price: "349",
              id: "EuE6tdrOAYBIsMmgjNUv",
            },
            {
              side: "right",
              align: "center",
              className: "top-[46%] left-[9%]",
              name: "TACKAN",
              summery: "Soap dispenser",
              price: "99",
              highlight: true,
              id: "KNjR8B3a3FWFnT6QGDDb",
            },
            {
              side: "top",
              align: "start",
              className: "top-[74%] left-[10%]",
              name: "VESKEN",
              summery: "Trolley",
              price: "1199",
              highlight: true,
              id: "dKU3AJnUZ3z5eU8G4RyS",
            },
            {
              side: "top",
              align: "center",
              className: "top-[74%] left-[34%]",
              name: "GUBBARP",
              summery: "Handle",
              price: "50",
              highlight: true,
              id: "uz6OurvSAbvelAOITHYq",
            },
            {
              side: "top",
              align: "end",
              className: "top-[78%] right-[29%]",
              name: "KLUNKA",
              summery: "Laundry bag",
              price: "899",
              id: "FNQeOuPsTyBIKmG6QA48",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/136499b057bb1a57/original/PE653321.jpg?f=xxs"
          }
          props={[
            {
              side: "top",
              align: "end",
              className: "top-[12%] left-[42%]",
              name: "LINNMON / ADILS",
              summery: "Table",
              price: "3495",
              id: "dBiqfAMkyrlfCfFyTEdM",
            },
            {
              side: "top",
              align: "end",
              className: "top-[50%] right-[5%]",
              name: "OLOV",
              summery: "Leg, adjustable",
              price: "1000",
              id: "lhcK75qqPmp2ci2GUa2g",
            },
            {
              side: "top",
              align: "end",
              className: "top-[73%] right-[30%]",
              name: "FNISS",
              summery: "Waste bin",
              price: "99",
              highlight: true,
              id: "nwLvZqULetJl08tht4wf",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default LowestPrices;
