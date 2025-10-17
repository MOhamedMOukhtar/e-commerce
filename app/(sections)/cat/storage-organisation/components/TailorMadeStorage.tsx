import { PopupInfo } from "@/app/components/IndicatorPopup";
import Image from "next/image";
import React from "react";

function TailorMadeStorage() {
  return (
    <div>
      <h2 className="mt-25 mb-4 text-2xl font-bold">
        Tailor-made storage at your service
      </h2>
      <p className="mb-10 max-w-60/100 text-sm leading-5 text-[#484848]">
        Together with KOMPLEMENT the interior of PAX wardrobe system can be
        planned and customised in every detail, to make it perfect for all your
        apparel. Then choose doors that match the room as well as the inside
        matches your storage needs. With PAX planning tool, designing a wardrobe
        is easier than choosing what to wear!
      </p>
      <div className="my-element grid grid-cols-[repeat(12,minmax(0,1fr))] gap-5 text-center">
        <Image
          src={
            "https://www.ikea.com/ext/ingkadam/m/7d4abdb248628d9b/original/PE953395.jpg?f=xxs"
          }
          width={1000}
          height={1000}
          alt="image"
        />

        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/3813d904300f3ccd/original/PH201729.jpg?f=xxs"
          }
          props={[
            {
              side: "left",
              align: "center",
              className: "top-[50%] right-[15%]",
              name: "KOMPLEMENT",
              summery: "Mesh basket, 50x58 cm",
              price: "900",
              id: "uxDBUFQPf4vVzrleEQ3L",
              active: true,
            },
          ]}
        />

        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/679562b7d2051c12/original/PH201726.jpg?f=xxs"
          }
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[50%] left-[30%]",
              name: "KOMPLEMENT",
              summery: "Insert with compartments",
              price: "1900",
              id: "fUDCzdwTD80gkkN9vQmi",
              active: true,
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/1e8e3e74b6bdbe72/original/PE953394.jpg?f=xxs"
          }
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[40%] left-[21%]",
              name: "TONSTAD",
              summery: "Door, 50x229 cm",
              price: "10000",
              id: "jEA5yiBLllKEVM5WBgCp",
            },
          ]}
        />
        <Image
          src={
            "https://www.ikea.com/ext/ingkadam/m/7aeed8cb3568dcfb/original/PE954001.jpg?f=xxs"
          }
          width={1000}
          height={1000}
          alt="image"
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/4a1bf5844bd5ed4f/original/PH202171.jpg?f=xxs"
          }
          props={[
            {
              side: "left",
              align: "center",
              className: "top-[40%] right-[11%]",
              name: "KOMPLEMENT",
              summery: "Box,15x27x12 cm",
              price: "899",
              id: "SFcQjwhXmRTi58vyIjwP",
            },
            {
              side: "top",
              align: "start",
              className: "top-[61%] left-[48%]",
              name: "KOMPLEMENT",
              summery: "Pull-out trouser hanger",
              price: "4000",
              id: "SHZGPvNY7a8SpwTjgtj2",
              active: true,
            },
          ]}
        />
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/21ac7fd586189823/original/PH202170.jpg?f=xxs"
          props={[
            {
              side: "bottom",
              align: "start",
              className: "top-[11%] left-[15%]",
              name: "KOMPLEMENT",
              summery: "Box,15x27x12 cm",
              price: "899",
              id: "SFcQjwhXmRTi58vyIjwP",
            },
            {
              side: "top",
              align: "center",
              className: "top-[50%] left-[38%]",
              name: "SKUBB",
              summery: "Shoe box",
              price: "1349",
              id: "VyYTpyRCXueNEL7GOj1V",
            },
            {
              side: "top",
              align: "start",
              className: "top-[83%] left-[25%]",
              name: "KOMPLEMENT",
              summery: "Pull-out tray",
              price: "2600",
              id: "xkdlWe2nCdf4sKjuvWbO",
              active: true,
            },
            {
              side: "top",
              align: "end",
              className: "top-[74%] right-[14%]",
              name: "KOMPLEMENT",
              summery: "Pull-out shoe shelf",
              price: "2500",
              id: "g4MP3Id0gYDj5boXEUUM",
              highlight: true,
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/644c88939c2958fd/original/PE953392.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "start",
              className: "top-[20%] left-[15%]",
              name: "TONSTAD",
              summery: "Door, brown stained oak veneer",
              price: "11000",
              id: "p2JfK7OvlfOa2JwSfTDa",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default TailorMadeStorage;
