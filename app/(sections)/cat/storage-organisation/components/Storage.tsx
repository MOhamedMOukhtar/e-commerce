import { PopupInfo } from "@/app/components/IndicatorPopup";

function Storage() {
  return (
    <div>
      <div className="grid-work-2 relative grid grid-cols-[repeat(15,minmax(0,1fr))] grid-rows-[repeat(7,minmax(0,1fr))] gap-5 text-center">
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/59278e0ab939e410/original/PH204874.jpg?f=xl"
          }
          props={[
            {
              side: "bottom",
              align: "end",
              className: "top-[32%] right-[7%]",
              name: "FJÄDERHARV",
              summery: "Mini chest with 2 drawers",
              price: "1349",
              id: "hDRHdgTtywOt3KpnTsU5",
              active: true,
            },
          ]}
        />

        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/2c130355576294d2/original/PH204882.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "end",
              className: "top-[25%] right-[10%]",
              name: "BYAKORRE",
              summery: "Open shelving unit",
              price: "16495",
              id: "MRurrAywWgr3sx6ZKndE",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/22eaca00eab7ab27/original/PE982619.jpg?f=xxs"
          }
          props={[
            {
              side: "top",
              align: "start",
              className: "top-[60%] left-[19%]",
              name: "STACKSTOD",
              summery: "Desk organiser",
              price: "269",
              id: "SWHSnj6FnHz4sXe46KMW",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/242b29333a5ad4f4/original/PH204884.jpg?f=xxs"
          }
          props={[
            {
              side: "top",
              align: "center",
              className: "top-[85%] right-[25%]",
              name: "RIDSTIG",
              summery: "Rug, flatwoven",
              price: "2799",
              id: "sJ9mXUU1vgXMlQ7Wzeqv",
            },
          ]}
        />
        <PopupInfo
          img={
            "https://www.ikea.com/ext/ingkadam/m/3548562d2f1a768/original/PH204885_SHI_001.jpg?f=xxs"
          }
          props={[
            {
              side: "bottom",
              align: "end",
              className: "top-[10%] right-[15%]",
              name: "VITARNA",
              summery: "Four-poster bed frame",
              price: "14995",
              id: "N6ibGJWws4sNByUOmLrr",
              active: true,
            },

            {
              side: "left",
              align: "center",
              className: "top-[47%] right-[10%]",
              name: "SKÅDIS",
              summery: "Storage basket, set of 3",
              price: "999",
              id: "NsqIRTzzfOj9rs2Bs9S7",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Storage;
