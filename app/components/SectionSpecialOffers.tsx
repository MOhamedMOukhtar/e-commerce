import { Button } from "@/components/ui/button";
import IndicatorTooltip from "./IndicatorTooltip";

export default function SectionSpecialOffers() {
  return (
    <div className="mb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="mb-2">We&apos;ve got special offers for you</h2>
          <p className="mb-8">
            Home rearrangements made easier with our special offers
          </p>
        </div>
        <Button variant={"border"} className="rounded-full border">
          special offers
        </Button>
      </div>
      <div className="my-element relative grid grid-cols-[repeat(12,minmax(0,1fr))] gap-5 text-center">
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/360be94e3ce1d775/original/PH185818-crop002.jpg?f=xxs"
          }
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[44%] left-[30%]",
              name: "OLDERDALEN",
              summery: "Bedside table",
              price: "10,995",
              previousPrice: "13,995",
              id: "1rOoy80nPBOfytFMZENC",
            },
          ]}
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/images/special-offers-at-a-lower-price-00dc306506b23807d2fa122ca23fedc6.jpg?f=xxs"
          }
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/5d9394c52c433e0a/original/PE793630.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "center",
              className: "top-[3%] right-[40%]",
              name: "FISKBO",
              summery: "Frame",
              price: "329",
              id: "XrfXm9f968AlHGpjLT26",
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[31%] left-[35%]",
              name: "SMÅSTAD",
              summery: "Desk",
              price: "12,695",
              previousPrice: "14,395",
              show: true,
              id: "bhAJ6j75VcNmFAoeqPGn",
            },
          ]}
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/3e932dd5add0c4de/original/PE821733.JPG?f=xxs"
          }
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[50%] left-[21%]",
              name: "KORKEN",
              summery: "Jar with lid",
              price: "249",
              id: "cqEh5rzSMSmTkb2SnxXh",
            },
            {
              side: "top",
              align: "start",
              className: "top-[34%] left-[40%]",
              name: "AVSTEG",
              summery: "Kitchen countertop organiser",
              price: "999",
              previousPrice: "1,399",
              id: "79NPiLBYVSyUizPB6dpb",
            },
            {
              side: "bottom",
              align: "end",
              className: "top-[22%] right-[1%]",
              name: "TREBENT",
              summery: "Chopsticks 4 pairs",
              price: "229",
              id: "Lph1BHSCcz2QgfingpeE",
            },
          ]}
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/535522ecec35c634/original/PH184732-crop002.jpg?f=xxs"
          }
          props={[
            {
              side: "top",
              align: "start",
              className: "top-[58%] left-[20%]",
              name: "NORRARYD",
              summery: "Chair",
              price: "5,995",
              previousPrice: "7,495",
              id: "KUce4Fe3sQRXz7yuSz7e",
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[43%] left-[40%]",
              name: "KLIMPFJÄLL",
              summery: "Dining table",
              price: "45,995",
              id: "xrOPXCJaZxeRlgcZt02U",
            },
          ]}
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/27e2d24e7a2d56ec/original/PH186422.jpg?f=xxs"
          }
          props={[
            {
              side: "top",
              align: "center",
              className: "top-[52%] left-[48%]",
              name: "KALKNÄS",
              summery: "Cabinet with sliding doors",
              price: "8,995",
              previousPrice: "11,495",
              id: "nlJb7sASlKVIc0yNKzez",
            },
          ]}
        />
        <IndicatorTooltip
          image="https://www.ikea.com/ext/ingkadam/m/120eea3248b38687/original/PE856970.jpg?f=xxs"
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[50%] left-[20%]",
              name: "VINGSÖN",
              summery: "Wing chair, in/outdoor",
              price: "17,995",
              previousPrice: "22,995",
              show: true,
              id: "e40LsXNXxOy2YqlJRqJA",
            },
            {
              side: "top",
              align: "start",
              className: "top-[72%] left-[20%]",
              name: "JÄRPÖN/DUVHOLMEN",
              summery: "Seat cushion, outdoor",
              price: "3,200",
              previousPrice: "3,700",
              id: "OgDT0iQUzDYje6sAzcQI",
            },
          ]}
        />
        <IndicatorTooltip
          image={
            "https://www.ikea.com/ext/ingkadam/m/3154facaae9b050e/original/PE945467.jpg?f=xxs"
          }
          props={[
            {
              side: "top",
              align: "end",
              className: "top-[40%] left-[42%]",
              name: "SILKESTRÄD",
              summery: "Scented candle in ceramic jar",
              price: "319",
              previousPrice: "399",
              show: false,
              id: "87FDKF3qYPhFnnjMnLgM",
            },
          ]}
        />
      </div>
    </div>
  );
}
