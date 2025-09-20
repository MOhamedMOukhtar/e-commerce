import { Button } from "@/components/ui/button";
import React from "react";
import IndicatorTooltip from "./IndicatorTooltip";

function LowestPrices() {
  return (
    <div className="my-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-8 text-2xl">Our Lowest Prices</h2>
        </div>
        <Button variant={"border"} className="rounded-full border">
          special offers
        </Button>
      </div>
      <div className="my-element relative grid grid-cols-[repeat(12,minmax(0,1fr))] gap-5 text-center">
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/727ed766ccb51e7/original/PH181543.jpg?f=xxs"
          }
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[33%] left-[35%]",
              name: "KONSTFULL",
              summery: "Vase",
              price: "2,999",
            },
            {
              side: "right",
              align: "center",
              className: "top-[46%] left-[25%]",
              name: "LACK",
              summery: "Side table, 55x55 cm",
              price: "795",
            },
            {
              side: "top",
              align: "center",
              className: "top-[60%] left-[57%]",
              name: "LACK",
              summery: "Side table, 35x35 cm",
              price: "495",
              highlight: true,
            },
          ]}
        />
        <IndicatorTooltip
          image={
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
            },
            {
              side: "bottom",
              align: "start",
              className: "top-[22%] left-[6%]",
              name: "POKAL",
              summery: "Glass",
              price: "89",
            },
            {
              side: "bottom",
              align: "end",
              className: "top-[24%] left-[70%]",
              name: "OFTAST",
              summery: "Serving bowl",
              price: "139",
              highlight: true,
            },
            {
              side: "top",
              align: "center",
              className: "top-[60%] left-[54%]",
              name: "ENHET",
              summery: "High fr w shelves",
              price: "2,695",
              previousPrice: "7,995",
            },
            {
              side: "top",
              align: "start",
              className: "top-[70%] left-[10%]",
              name: "OFTAST",
              summery: "Bowl",
              price: "69",
              highlight: true,
              show: true,
            },
            {
              side: "top",
              align: "center",
              className: "top-[74%] left-[43%]",
              name: "OFTAST",
              summery: "Side plate",
              price: "69",
              highlight: true,
            },
            {
              side: "top",
              align: "end",
              className: "top-[76%] left-[64%]",
              name: "OFTAST",
              summery: "Plate",
              price: "69",
              highlight: true,
            },
            {
              side: "top",
              align: "end",
              className: "top-[68%] left-[73%]",
              name: "UPPDATERA",
              summery: "Cutlery caddy",
              price: "329",
            },
          ]}
        />
        <IndicatorTooltip
          image={
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
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[45%] left-[40%]",
              name: "VEBJÖRN",
              summery: "Desk",
              price: "21,995",
            },
            {
              side: "right",
              align: "center",
              className: "top-[64%] left-[32%]",
              name: "GLOSTAD",
              summery: "2-seat sofa",
              price: "9,995",
              show: true,
              highlight: true,
            },
          ]}
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/2ab3fed9df5e0aca/original/PH197598.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "start",
              className: "top-[7%] left-[32%]",
              name: "RÄFFELBJÖRK",
              summery: "Vase",
              price: "1,799",
            },
            {
              side: "top",
              align: "start",
              className: "top-[38%] left-[44%]",
              name: "TESAMMANS",
              summery: "Carafe",
              price: "999",
              previousPrice: "799",
            },
            {
              side: "left",
              align: "center",
              className: "top-[47%] right-[9%]",
              name: "IKEA 365+",
              summery: "Glass",
              price: "499",
            },
            {
              side: "top",
              align: "start",
              className: "top-[54%] left-[25%]",
              name: "BAGGEBO",
              summery: "Bookcase",
              price: "2,795",
              highlight: true,
            },
          ]}
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/images/our-lowest-prices-05cb57a4b1c5c4406620f558a43f126f.jpg?f=xxs"
          }
        />
        <IndicatorTooltip
          image={
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
            },
            {
              side: "bottom",
              align: "end",
              className: "top-[10%] right-[2%]",
              name: "VALLSTENA",
              summery: "Door",
              price: "945",
              show: true,
            },
            {
              side: "left",
              align: "center",
              className: "top-[38%] right-[8%]",
              name: "PÅLYCKE",
              summery: "Clip-on basket",
              price: "399",
              highlight: true,
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[40%] left-[47%]",
              name: "TRONES",
              summery: "Shoe cabinet/storage",
              price: "1,999",
              highlight: true,
            },
            {
              side: "right",
              align: "center",
              className: "top-[38%] left-[32%]",
              name: "TJUSIG",
              summery: "Hanger",
              price: "1,349",
            },
          ]}
        />
        <IndicatorTooltip
          image="https://www.ikea.com/ext/ingkadam/m/28b434bdc948942a/original/PH204423.jpg?f=xxs"
          props={[
            {
              side: "bottom",
              align: "end",
              className: "top-[15%] left-[54%]",
              name: "SILVTJÄRN",
              summery: "Toothbrush holder",
              price: "549",
            },
            {
              side: "bottom",
              align: "end",
              className: "top-[31%] left-[56%]",
              name: "TAVELÅN",
              summery: "Tray",
              price: "899",
              show: true,
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[42%] left-[42%]",
              name: "TISKEN",
              summery: "Toothbrush holder with suction cup",
              price: "349",
            },
            {
              side: "right",
              align: "center",
              className: "top-[46%] left-[9%]",
              name: "TACKAN",
              summery: "Soap dispenser",
              price: "99",
              highlight: true,
            },
            {
              side: "top",
              align: "start",
              className: "top-[74%] left-[10%]",
              name: "VESKEN",
              summery: "Trolley",
              price: "1,199",
              highlight: true,
            },
            {
              side: "top",
              align: "center",
              className: "top-[74%] left-[34%]",
              name: "GUBBARP",
              summery: "Handle",
              price: "50",
              highlight: true,
            },
            {
              side: "top",
              align: "end",
              className: "top-[78%] right-[29%]",
              name: "KLUNKA",
              summery: "Laundry bag",
              price: "899",
            },
          ]}
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/136499b057bb1a57/original/PE653321.jpg?f=xxs"
          }
          props={[
            {
              side: "top",
              align: "end",
              className: "top-[12%] left-[42%]",
              name: "LINNMON / ADILS",
              summery: "Table",
              price: "3,495",
            },
            {
              side: "top",
              align: "end",
              className: "top-[50%] right-[5%]",
              name: "OLOV",
              summery: "Leg, adjustable",
              price: "1,000",
            },
            {
              side: "top",
              align: "end",
              className: "top-[73%] right-[30%]",
              name: "FNISS",
              summery: "Waste bin",
              price: "99",
              highlight: true,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default LowestPrices;

/**
https://www.ikea.com/eg/en/p/konstfull-vase-clear-glass-patterned-20511953/
https://www.ikea.com/eg/en/p/lack-side-table-white-30449908/
https://www.ikea.com/eg/en/p/lack-side-table-white-30514791/
https://www.ikea.com/eg/en/p/pokal-glass-clear-glass-10270478/
https://www.ikea.com/eg/en/p/karaff-carafe-clear-glass-00342975/
https://www.ikea.com/eg/en/p/oftast-serving-bowl-white-20439392/
https://www.ikea.com/eg/en/p/enhet-high-fr-w-shelves-anthracite-20448947/
https://www.ikea.com/eg/en/p/oftast-bowl-white-80258915/
https://www.ikea.com/eg/en/p/oftast-side-plate-white-60318939/
https://www.ikea.com/eg/en/p/oftast-plate-white-30258913/
https://www.ikea.com/eg/en/p/uppdatera-cutlery-caddy-anthracite-40433105/
https://www.ikea.com/eg/en/p/burhult-sibbhult-wall-shelf-white-white-s89325963/
https://www.ikea.com/eg/en/p/vebjoern-desk-beige-60460838/
https://www.ikea.com/eg/en/p/glostad-2-seat-sofa-knisa-dark-grey-50489012/
https://www.ikea.com/eg/en/p/raeffelbjoerk-vase-mother-of-pearl-colour-10537656/
https://www.ikea.com/eg/en/p/tesammans-carafe-blue-90568955/
https://www.ikea.com/eg/en/p/baggebo-bookcase-white-20436713/
https://www.ikea.com/eg/en/p/ikea-365-glass-clear-glass-10278356/
https://www.ikea.com/eg/en/p/silvtjaern-toothbrush-holder-30501915/
https://www.ikea.com/eg/en/p/tavelan-tray-50465756/
https://www.ikea.com/eg/en/p/tisken-toothbrush-holder-with-suction-cup-white-80381294/
https://www.ikea.com/eg/en/p/tackan-soap-dispenser-white-90322303/
https://www.ikea.com/eg/en/p/vesken-trolley-white-00471222/
https://www.ikea.com/eg/en/p/gubbarp-handle-white-00336432/
https://www.ikea.com/eg/en/p/klunka-laundry-bag-white-black-50364371/
https://www.ikea.com/eg/en/p/regolit-pendant-lamp-shade-white-handmade-70103410/
https://www.ikea.com/eg/en/p/vallstena-door-white-80541693/
https://www.ikea.com/eg/en/p/palycke-clip-on-basket-00534432/
https://www.ikea.com/eg/en/p/fniss-waste-bin-white-40295439/
https://www.ikea.com/eg/en/p/olov-leg-adjustable-white-10264302/
https://www.ikea.com/eg/en/p/linnmon-adils-table-white-s29932181/
https://www.ikea.com/eg/en/p/tjusig-hanger-black-80291707/
https://www.ikea.com/eg/en/p/trones-shoe-cabinet-storage-white-00397307/
 */
