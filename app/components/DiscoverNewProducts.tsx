import React from "react";
import IndicatorTooltip from "./IndicatorTooltip";

function DiscoverNewProducts() {
  return (
    <div className="my-20">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl">Discover our new products</h2>
        </div>
      </div>
      <div>
        <div className="grid-work relative grid grid-cols-[repeat(15,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))] gap-5 text-center">
          <IndicatorTooltip
            image={
              "https://www.ikea.com/ext/ingkadam/m/7e00c55a5c1fbc8a/original/PH202379.jpg?f=m"
            }
            props={[
              {
                side: "bottom",
                align: "start",
                className: "top-[30%] left-[22.5%]",
                name: "STOCKHOLM 2025",
                summery: "Candlestick/tealight holder",
                price: "1,499",
              },
              {
                side: "top",
                align: "start",
                className: "top-[64%] left-[27%]",
                name: "STOCKHOLM 2025",
                summery: "Cabinet with 2 doors",
                price: "24,995",
                show: true,
              },
              {
                side: "top",
                align: "start",
                className: "bottom-[2%] left-[30%]",
                name: "STOCKHOLM 2025",
                summery: "Rug, flatwoven",
                price: "44,999",
              },
              {
                side: "top",
                align: "end",
                className: "bottom-[32%] right-[6%]",
                name: "STOCKHOLM 2025",
                summery: "Cushion cover",
                price: "599",
              },
              {
                side: "top",
                align: "end",
                className: "bottom-[26%] right-[22%]",
                name: "STOCKHOLM 2025",
                summery: "Throw",
                price: "3,999",
              },
              {
                side: "top",
                align: "end",
                className: "bottom-[12%] right-[30%]",
                name: "STOCKHOLM 2025",
                summery: "Bench with pad",
                price: "29,995",
              },
            ]}
          />

          <IndicatorTooltip
            image={
              "https://www.ikea.com/images/44/e7/44e7157a3ff299c59c194e0414e20958.jpg?f=xxs"
            }
          />
          <IndicatorTooltip
            image={
              "https://www.ikea.com/ext/ingkadam/m/152828c5100a0834/original/PH202065.jpg?f=xxs"
            }
            props={[
              {
                side: "bottom",
                align: "center",
                className: "top-[1%] right-[35%]",
                name: "SOLVINDEN",
                summery: "LED lighting chain with 12 lights",
                price: "799",
              },
              {
                side: "left",
                align: "center",
                className: "top-[52%] right-[18%]",
                name: "SUNDSÖ",
                summery: "Folding chair",
                price: "3,295",
              },
              {
                side: "right",
                align: "center",
                className: "top-[57%] left-[26%]",
                name: "PÅDRAG",
                summery: "Vase",
                price: "99",
                highlight: true,
              },
              {
                side: "top",
                align: "end",
                className: "top-[63%] right-[22%]",
                name: "SUNDSÖ",
                summery: "Table",
                price: "5,995",
              },
              {
                side: "top",
                align: "end",
                className: "top-[77%] right-[2%]",
                name: "NÄMMARÖ",
                summery: "Storage box",
                price: "7,495",
              },
              {
                side: "top",
                align: "start",
                className: "top-[83%] left-[24%]",
                name: "KUDDARNA",
                summery: "Chair cushion, outdoor",
                price: "200",
              },
            ]}
          />
          <IndicatorTooltip
            image={
              "https://www.ikea.com/ext/ingkadam/m/662f70e5dada0f78/original/PH202769.jpg?f=xxs"
            }
            props={[
              {
                side: "bottom",
                align: "end",
                className: "top-[32%] right-[34%]",
                name: "STOCKHOLM 2025",
                summery: "Vase, 32cm",
                price: "2,999",
              },
              {
                side: "left",
                align: "center",
                className: "top-[50%] right-[0%]",
                name: "STOCKHOLM 2025",
                summery: "Bowl and dish",
                price: "1,199",
              },
              {
                side: "top",
                align: "end",
                className: "top-[60%] right-[14%]",
                name: "STOCKHOLM 2025",
                summery: "Vase, 20cm",
                price: "1,999",
              },
              {
                side: "top",
                align: "end",
                className: "top-[68%] right-[40%]",
                name: "STOCKHOLM 2025",
                summery: "Bowl",
                price: "2,499",
              },
              {
                side: "top",
                align: "start",
                className: "top-[70%] left-[4%]",
                name: "STOCKHOLM 2025",
                summery: "Vase, 27cm",
                price: "2,199",
              },
              {
                side: "top",
                align: "start",
                className: "top-[82%] left-[35%]",
                name: "STOCKHOLM 2025",
                summery: "Candlestick/tealight holder",
                price: "1,499",
              },
              {
                side: "top",
                align: "center",
                className: "top-[85%] left-[50%]",
                name: "STOCKHOLM 2025",
                summery: "Coffee table",
                price: "11,995",
              },
            ]}
          />
          <IndicatorTooltip
            image={
              "https://www.ikea.com/ext/ingkadam/m/3ad20cbd659d327a/original/PE953618.jpg?f=xxs"
            }
            props={[
              {
                side: "bottom",
                align: "start",
                className: "top-[19%] left-[32%]",
                name: "DVÄRGSYREN",
                summery: "Mirror, 40x50cm",
                price: "3,499",
              },
              {
                side: "bottom",
                align: "end",
                className: "top-[33.5%] right-[12%]",
                name: "DVÄRGSYREN",
                summery: "Mirror, 28x37cm",
                price: "2,499",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default DiscoverNewProducts;
