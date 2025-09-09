import {
  getSubSubSection,
  getSubSubSectionInSubSection,
} from "@/lib/firestore/sub-subsection/read_server";
import { TSubSubSection } from "@/types/sub-subsection/subSubSection";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CustomScroll from "../CustomScroll";
import { Skeleton } from "@/components/ui/skeleton";
import { TSubSection } from "@/types/subSection/subSection";
import { getSubSection } from "@/lib/firestore/sub-sections/read_server";

function ExploreStorageFurniture({
  setSectionTitle,
  exploreSubSection,
  setClickedItem,
  clickedItem,
}: {
  setSectionTitle: Dispatch<SetStateAction<string | null>>;
  exploreSubSection: string;
  setClickedItem: Dispatch<SetStateAction<string>>;
  clickedItem: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showArrowRight, setShowArrowRight] = useState(false);
  const [showArrowLeft, setShowArrowLeft] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thumbWidth, setThumbWidth] = useState(500);
  const [clientWidth, setClientWidth] = useState(0);
  const [contentLeft, setContentLeft] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [subSection, setSubSection] = useState<TSubSection>();
  const [subSubSections, setSubSubSections] = useState<TSubSubSection[]>([]);
  const [subSubSection, setSubSubSection] = useState<TSubSubSection>();
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialContentScrollLeft, setInitialContentScrollLeft] =
    useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const fetchSubSection = (await getSubSection(
        exploreSubSection,
      )) as TSubSection;
      setSubSection(fetchSubSection);
      const fetchSubSubSections = (await getSubSubSectionInSubSection(
        exploreSubSection,
      )) as TSubSubSection[];
      setSubSubSections(fetchSubSubSections);
      const fetchSubSubSection = (await getSubSubSection(
        clickedItem,
      )) as TSubSubSection;
      setSubSubSection(fetchSubSubSection);
      setLoading(false);
    }
    fetchData();
  }, [exploreSubSection, clickedItem]);

  // resize thumb
  // eslint-disable-next-line
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
      observer.current = new ResizeObserver(handleResize);
      observer.current.observe(content);
      content.addEventListener("scroll", handleThumbPosition);

      return () => {
        observer.current?.unobserve(content);
        content.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, [handleThumbPosition, subSubSections, handleResize]); // ← Keep handleResize

  function handleThumbMousedown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientX);
    if (contentRef.current)
      setInitialContentScrollLeft(contentRef.current.scrollLeft);

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

  if (loading) {
    const array = new Array(8).fill(0);
    return (
      <div className="grid grid-cols-[15%_83%] gap-5">
        <div className="flex justify-start gap-3 border-r">
          <div className="p-5"></div>
          <div className="flex w-30 flex-col items-center gap-3 text-center">
            <Skeleton className="h-20 w-[80%]" />
            <Skeleton className="h-5 w-[80%]" />
          </div>
        </div>
        <div className="content flex gap-2 overflow-x-auto pb-5">
          {array.map((_, i) => (
            <div
              key={i}
              className="relative flex min-w-30 flex-col items-center gap-3"
            >
              <Skeleton className="h-20 w-[80%]" />
              <Skeleton className="h-5 w-[80%]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[15%_83%] gap-5">
      <div className="flex items-start justify-evenly border-r">
        <div
          onClick={() =>
            setSectionTitle(() => {
              if (clickedItem !== exploreSubSection) {
                setClickedItem(exploreSubSection);
              }
              return clickedItem === exploreSubSection ? "products" : "explore";
            })
          }
          className="cursor-pointer self-center rounded-full border border-black p-2 hover:outline-1 hover:outline-black"
        >
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path d="m13 7.83 5.59 5.59L20 12l-8-8-8 8 1.41 1.41L11 7.83V20h9v-2h-7V7.83z"></path>
          </svg>
        </div>
        <div className="flex w-40 flex-col items-center gap-3 pr-3 text-center">
          {exploreSubSection === clickedItem && (
            <>
              <Image
                src={
                  typeof subSection?.imageURL === "string"
                    ? subSection?.imageURL
                    : "/ikean.png"
                }
                width={200}
                height={200}
                alt={subSection?.title ? subSection.title : "subSection"}
                className="h-20 w-20 object-cover"
              />
              <span className="font-semibold text-black">
                {subSection?.title}
              </span>
            </>
          )}
          {exploreSubSection !== clickedItem && (
            <>
              <Image
                src={
                  typeof subSubSection?.imageURL === "string"
                    ? subSubSection?.imageURL
                    : "/ikean.png"
                }
                width={200}
                height={200}
                alt={subSubSection?.title ? subSubSection.title : "subSection"}
                className="h-20 w-20 object-cover"
              />
              <span className="font-semibold text-black">
                {subSubSection?.title}
              </span>
            </>
          )}
        </div>
      </div>
      <div
        className="relative ml-7"
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
          className="content flex gap-2 overflow-x-auto pb-5"
          id="custom-scrollbars-content"
          ref={contentRef}
        >
          <div className="relative flex gap-3">
            {subSubSections
              .filter((item) => item.id !== clickedItem)
              .map((item) => (
                <div
                  key={item.id}
                  className="relative flex min-w-30 cursor-pointer flex-col items-center gap-3 text-center text-sm text-[#666666] hover:text-[#131313] hover:underline"
                  onClick={() => {
                    if (item.id) {
                      setClickedItem(item.id);
                    }
                  }}
                >
                  <Image
                    src={
                      typeof item.imageURL === "string"
                        ? item.imageURL
                        : "/ikean.png"
                    }
                    width={160}
                    height={160}
                    alt={item.title}
                    className="h-20 w-20 object-cover"
                  />
                  <span className="">{item.title}</span>
                </div>
              ))}
          </div>
        </section>
        <CustomScroll
          handleScrollButton={handleScrollButton}
          scrollTrackRef={scrollTrackRef}
          handleTrackClick={handleTrackClick}
          scrollThumbRef={scrollThumbRef}
          handleThumbMousedown={handleThumbMousedown}
          thumbWidth={thumbWidth}
          showArrowLeft={showArrowLeft}
          showArrowRight={showArrowRight}
          contentRef={contentRef}
          subSubSections={subSubSections}
        />
      </div>
    </div>
  );
}

export default ExploreStorageFurniture;
