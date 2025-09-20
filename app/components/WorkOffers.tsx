import { Button } from "@/components/ui/button";
import React from "react";
import IndicatorTooltip from "./IndicatorTooltip";

function WorkOffers() {
  return (
    <div className="my-20">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl">
            Getting back to work feels like building something great!
          </h2>
          <p>Up to 20% discount on select products</p>
        </div>
        <Button variant={"border"} className="rounded-full border px-6 py-5">
          See more
        </Button>
      </div>
      <div>
        <div className="grid-work relative grid grid-cols-[repeat(15,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))] gap-5 text-center">
          <IndicatorTooltip
            image={
              "https://firebasestorage.googleapis.com/v0/b/e-commerce-ikean-e962e.firebasestorage.app/o/sections%2FJL7jlggRTc0Q130zM0Nf?alt=media&token=95cb8d2d-daa8-409a-8bb9-36bf5f10002c%22(stri"
            }
          />

          <IndicatorTooltip
            image={
              "https://www.ikea.com/ext/ingkadam/m/51f1444d25f0c148/original/PH194229.jpg?f=m"
            }
            props={[
              {
                side: "right",
                align: "center",
                className: "top-[26%] left-[29%]",
                name: "ISNÅLEN",
                summery: "LED work lamp",
                price: "2,199",
              },
              {
                side: "right",
                align: "center",
                className: "top-[47%] left-[61%]",
                name: "VATTENKAR",
                summery: "Laptop/monitor stand",
                price: "2,499",
              },
              {
                side: "left",
                align: "center",
                className: "top-[75%] left-[55%]",
                name: "TROTTEN",
                summery: "Desk sit/stand",
                price: "27,495",
              },
            ]}
          />
          <IndicatorTooltip
            image={
              "https://www.ikea.com/ext/ingkadam/m/56e3cc79a6e32840/original/PE976953.jpg?f=m"
            }
            props={[
              {
                side: "bottom",
                align: "start",
                className: "top-[14%] left-[36%]",
                name: "LACK",
                summery: "Wall shelf",
                price: "1,495",
              },
              {
                side: "right",
                align: "center",
                className: "top-[30%] left-[16%]",
                name: "FLÖNSA",
                summery: "Memo board with pins",
                price: "649",
              },
              {
                side: "right",
                align: "end",
                className: "top-[52%] left-[19%]",
                name: "ALEX",
                summery: "Desk",
                price: "17,495",
              },
              {
                side: "right",
                align: "center",
                className: "top-[75%] left-[29%]",
                name: "ALEX",
                summery: "Drawer unit on castors",
                price: "8,795",
              },
              {
                side: "top",
                align: "end",
                className: "top-[60%] left-[70%]",
                name: "TOSSBERG / MALSKÄR",
                summery: "Swivel chair",
                price: "18,995",
              },
            ]}
          />
          <IndicatorTooltip
            image={
              "https://www.ikea.com/ext/ingkadam/m/729bdd041a8e9054/original/PH191859.jpg?f=m"
            }
            props={[
              {
                side: "right",
                align: "center",
                className: "top-[35%] left-[11%]",
                name: "IDANÄS",
                summery: "Bookcase",
                price: "27,795",
              },
              {
                side: "right",
                align: "end",
                className: "top-[70%] left-[30%]",
                name: "IDANÄS",
                summery: "Desk",
                price: "37,295",
              },
              {
                side: "top",
                align: "center",
                className: "top-[80%] left-[65%]",
                name: "MULLFJÄLLET",
                summery: "Conference chair with castors",
                price: "14,895",
              },
            ]}
          />
          <IndicatorTooltip
            image={
              "https://www.ikea.com/ext/ingkadam/m/23d305ed57d73c0e/original/PH204317.jpg?f=m"
            }
            props={[
              {
                side: "right",
                align: "center",
                className: "top-[33%] left-[19%]",
                name: "NÄVLINGE",
                summery: "LED clamp spotlight",
                price: "1,699",
              },
              {
                side: "right",
                align: "center",
                className: "top-[54%] left-[20%]",
                name: "MITTPLAN",
                summery: "Desk",
                price: "5,895",
              },
              {
                side: "top",
                align: "start",
                className: "top-[70%] left-[45%]",
                name: "SMÖRKULL",
                summery: "Office chair with armrests",
                price: "14,995",
              },
              {
                side: "right",
                align: "center",
                className: "top-[70%] left-[5%]",
                name: "NISSAFORS",
                summery: "Trolley",
                price: "3,495",
              },
              {
                side: "top",
                align: "end",
                className: "top-[88%] left-[84%]",
                name: "RYKTA",
                summery: "Storage box with lid",
                price: "449",
              },
              {
                side: "top",
                align: "end",
                className: "top-[75%] left-[78%]",
                name: "EKENABBEN",
                summery: "Open shelving unit",
                price: "6,295",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkOffers;
