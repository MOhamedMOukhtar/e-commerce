"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SubSection from "./SubSection";
import CustomScroll from "./CustomScroll";

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
}: {
  setSectionTitle: Dispatch<SetStateAction<string | null>>;

  handleExplore: (subsection: string, item: string) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [clientWidth, setClientWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentLeft, setContentLeft] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(500);
  const [isDragging, setIsDragging] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string>("");
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [showArrowRight, setShowArrowRight] = useState(false);
  const [showArrowLeft, setShowArrowLeft] = useState(false);
  const [initialContentScrollLeft, setInitialContentScrollLeft] =
    useState<number>(0);
  const fromParent = true;

  // resize thumb
  function handleResize() {
    if (!scrollTrackRef.current || !contentRef.current) return;

    requestAnimationFrame(() => {
      const trackSize = scrollTrackRef.current
        ? scrollTrackRef.current.clientWidth
        : 0;
      const contentVisible = contentRef.current
        ? contentRef.current.clientWidth
        : 0;
      const contentTotalWidth = contentRef.current
        ? contentRef.current.scrollWidth
        : 0;

      setThumbWidth(
        Math.max((contentVisible / contentTotalWidth) * trackSize, 20),
      );
      setClientWidth(contentVisible);
    });
  }

  // set thumb position
  const handleThumbPosition = useCallback(() => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }

    const {
      scrollLeft: contentLeft,
      scrollWidth: contentWidth,
      clientWidth,
    } = contentRef.current;

    const { clientWidth: trackWidth } = scrollTrackRef.current;
    setShowArrowRight(contentLeft + clientWidth < contentWidth - 2);
    setShowArrowLeft(contentLeft === 0 ? false : true);
    setContentLeft(contentLeft);
    setContentWidth(contentWidth);

    let newLeft = (contentLeft / contentWidth) * trackWidth;
    newLeft = Math.min(newLeft, trackWidth - thumbWidth);

    const thumb = scrollThumbRef.current;
    requestAnimationFrame(() => {
      thumb.style.left = `${newLeft}px`;
    });
  }, [thumbWidth]);

  // set thumb position
  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize();
      });
      observer.current.observe(content);
      content.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(content);
        content.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, [handleThumbPosition]);

  function handleThumbMousedown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientX);
    if (contentRef.current)
      setInitialContentScrollLeft(contentRef.current.scrollLeft);
    if (tooltipRef.current)
      setInitialContentScrollLeft(tooltipRef.current.scrollLeft);
    setIsDragging(true);
  }
  // move thumb on drag
  const handleThumbMouseup = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging],
  );

  // move thumb
  const handleThumbMousemove = useCallback(
    (e: MouseEvent) => {
      if (contentRef.current) {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
          const {
            scrollWidth: contentScrollWidth,
            clientWidth: contentClientWidth,
          } = contentRef.current;

          const deltaX =
            (e.clientX - scrollStartPosition) *
            (contentClientWidth / thumbWidth);

          const newScrollLeft = Math.min(
            initialContentScrollLeft + deltaX,
            contentScrollWidth - contentClientWidth,
          );

          contentRef.current.scrollLeft = newScrollLeft;
        }
      }
    },
    [isDragging, scrollStartPosition, initialContentScrollLeft, thumbWidth],
  );

  // move thumb when click thumb
  useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  // move thumb when click track
  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const { current: track } = scrollTrackRef;
    const { current: content } = contentRef;
    if (track && content) {
      const { clientX } = e;
      const target = e.target as HTMLDivElement;
      const rect = target.getBoundingClientRect();
      const trackLeft = rect.left;
      const thumbOffset = -(thumbWidth / 2);
      const clickRatio =
        (clientX - trackLeft + thumbOffset) / track.clientWidth;
      const scrollAmount = Math.floor(clickRatio * content.scrollWidth);
      content.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }

  // move thumb when click arrow
  function handleScrollButton(direction: "left" | "right") {
    const { current: content } = contentRef;
    if (content) {
      const scrollAmount =
        direction === "right" ? clientWidth - 200 : -clientWidth - 200;
      content.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  // hide popup when click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setActiveProductId("");
      }
    };

    if (activeProductId) {
      document.addEventListener("mousedown", handler);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [activeProductId]);

  return (
    <div
      className="relative"
      onMouseLeave={() => {
        setShowArrowLeft(false);
        setShowArrowRight(false);
      }}
      onMouseEnter={() => {
        setShowArrowLeft(() => {
          return contentLeft !== 0;
        });
        setShowArrowRight(() => {
          return contentLeft + clientWidth < contentWidth - 2;
        });
        if (contentWidth === 0) setShowArrowRight(true);
      }}
    >
      <section
        className="content overflow-x-auto pb-5"
        id="custom-scrollbars-content"
        ref={contentRef}
      >
        <div className="relative flex gap-3">
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
      </section>

      {/* Scrollbar */}
      <CustomScroll
        handleScrollButton={handleScrollButton}
        activeProductId={activeProductId}
        scrollTrackRef={scrollTrackRef}
        handleTrackClick={handleTrackClick}
        scrollThumbRef={scrollThumbRef}
        handleThumbMousedown={handleThumbMousedown}
        thumbWidth={thumbWidth}
        showArrowLeft={showArrowLeft}
        showArrowRight={showArrowRight}
        fromParent={fromParent}
      />
    </div>
  );
}
