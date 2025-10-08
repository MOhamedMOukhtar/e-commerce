"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import SubSection from "./SubSection";
import CustomScrollSec from "@/app/components/CustomScrollSec";

const product = [
  {
    img: "https://www.ikea.com/images/1-1a2a4295350652d07e10f34ed9bb2b19.jpg?imwidth=160",
    title: "Special Offers",
    slug: "special-offers",
    id: "HTB3JJDO3lMgr6YV5KH4",
  },
  {
    img: "https://www.ikea.com/global/assets/range-categorisation/images/product/storage-organisation-st001.jpeg?imwidth=160",
    title: "Storage furniture",
    slug: "storage-organisation",
    id: "eRbOdm13dExeeHUmUY78",
  },
  {
    img: "https://www.ikea.com/global/assets/range-categorisation/images/product/desk-desk-chairs-fu004.jpeg?imwidth=160",
    title: "Desk & desk chairs",
    slug: "tables-desks",
    id: "yxwEc0Mjk86rwG9bacWQ",
  },
  {
    img: "https://www.ikea.com/global/assets/range-categorisation/images/product/outdoor-products-od001.jpeg?imwidth=160",
    title: "Outdoor products",
    slug: "outdoor-products",
    id: "kQ6LsYwTz27Wo8b0SuSc",
  },
  {
    img: "https://www.ikea.com/eg/ar/range-categorisation/images/product/kitchenware-tableware-kt001.jpeg?imwidth=160",
    title: "Kitchenware & tableware",
    slug: "kitchenware-tableware",
    id: "ucNrWvV20hBwGFrN04Bj",
  },
  {
    img: "https://www.ikea.com/eg/ar/range-categorisation/images/product/decoration-de001.jpeg?imwidth=160",
    title: "Decoration",
    slug: "decoration",
    id: "kHLrzIIPhtwz3azKUQ48",
  },
  {
    img: "https://www.ikea.com/eg/ar/range-categorisation/images/product/sofas-armchairs-700640.jpeg?imwidth=160",
    title: "Sofas & armchairs",
    slug: "sofas-armchairs",
    id: "my3dJRXVFHWv8TFSk2B7",
  },
  {
    img: "https://www.ikea.com/eg/ar/range-categorisation/images/product/tables-chairs-fu002.jpeg?imwidth=160",
    title: "Tables & chairs",
    slug: "tables-chairs",
    id: "YOn3z2Z6P3q9GC6ZnlDZ",
  },
  {
    img: "https://www.ikea.com/global/assets/range-categorisation/images/product/beds-mattresses-bm001.jpeg?imwidth=160",
    title: "Beds & mattresses",
    slug: "beds-mattresses",
    id: "xKunpDLR73dNYEMln0ca",
  },
  {
    img: "https://www.ikea.com/eg/ar/range-categorisation/images/product/textiles-tl001.jpeg?imwidth=160",
    title: "Textiles",
    slug: "textiles",
    id: "Q9EB7SYZPMRQoeZaM7c0",
  },
  {
    img: "https://www.ikea.com/global/assets/range-categorisation/images/product/lighting-li001.jpeg?imwidth=160",
    title: "Lighting",
    slug: "lighting",
    id: "EZF9QPF4wpbFipU5oDj7",
  },
  {
    img: "https://www.ikea.com/global/assets/range-categorisation/images/product/baby-children-bc001.jpeg?imwidth=160",
    title: "Baby & children",
    slug: "baby-children",
    id: "w8oztY8JEGWj1DmblZ5m",
  },
  {
    img: "https://www.ikea.com/global/assets/range-categorisation/images/product/laundry-cleaning-lc001.jpeg?imwidth=160",
    title: "Laundry & cleaning",
    slug: "laundry-cleaning",
    id: "dO718AnhVEx0Jagsxx3b",
  },
  {
    img: "https://www.ikea.com/eg/ar/range-categorisation/images/product/bathroom-products-ba001.jpeg?imwidth=160",
    title: "Bathroom products",
    slug: "bathroom-products",
    id: "YAZoWeO5j8C0oY06PmmY",
  },
  {
    img: "https://www.ikea.com/global/assets/range-categorisation/images/product/small-storage-organisers-st007.jpeg?imwidth=160",
    title: "Small storage & organisers",
    slug: "small-storage-organisers",
    id: "MDJtEcIWQM1MZNu3uAO6",
  },
];

export default function Products({
  setSectionTitle,
  handleExplore,
  showSections,
  display,
}: {
  setSectionTitle: Dispatch<SetStateAction<string | null>>;
  handleExplore: (subsection: string, item: string) => void;
  showSections: boolean | (() => void);
  display: boolean | (() => void);
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeProductId, setActiveProductId] = useState<string>("");

  return (
    <CustomScrollSec
      fixJump="mb-[-15px]"
      arrowPosition="-top-28"
      setActiveProductId={setActiveProductId}
      activeProductId={activeProductId}
      popupRef={popupRef}
      showSections={showSections}
      display={display}
    >
      <div className="relative mb-5 flex gap-3">
        {product.map((item) => (
          <SubSection
            setSectionTitle={setSectionTitle}
            key={item.id}
            popupRef={popupRef}
            item={item}
            activeProductId={activeProductId}
            setActiveProductId={setActiveProductId}
            handleExplore={handleExplore}
          />
        ))}
      </div>
    </CustomScrollSec>
  );
}
