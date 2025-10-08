import { cn } from "@/lib/utils";
import { TSubSubSection } from "@/types/sub-subsection/subSubSection";
import { TSubSection } from "@/types/subSection/subSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CustomScrollProps {
  activeProductId?: string;
  handleScrollButton: (direction: "left" | "right") => void;
  scrollTrackRef: React.RefObject<HTMLDivElement | null>;
  handleTrackClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  scrollThumbRef: React.RefObject<HTMLDivElement | null>;
  handleThumbMousedown: (event: React.MouseEvent<HTMLDivElement>) => void;
  thumbWidth: number;
  showArrowLeft: boolean;
  showArrowRight: boolean;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  subSubSections?: TSubSubSection[];
  subSection?: TSubSection[];
  arrowPosition?: string;
}

function CustomScroll({
  activeProductId = "",
  handleScrollButton,
  scrollTrackRef,
  handleTrackClick,
  scrollThumbRef,
  handleThumbMousedown,
  thumbWidth,
  showArrowLeft,
  showArrowRight,
  contentRef,
  subSection,
  subSubSections,
  arrowPosition = "-top-28",
}: CustomScrollProps) {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (contentRef?.current) {
      setShowScrollbar(
        contentRef.current.scrollWidth > contentRef.current.clientWidth,
      );
    } else {
      setShowScrollbar(false);
    }
  }, [subSubSections, contentRef, subSection]);

  if (pathname !== "/" && !showScrollbar) return null;

  return (
    <div className="scrollbar relative">
      <button
        className={cn(
          `button button--left absolute -top-28 -left-5 rounded-full bg-black p-2 transition-all duration-200 ease-out hover:bg-[#333333] ${showArrowLeft ? "cursor-pointer" : "opacity-0"}`,
          arrowPosition,
        )}
        onClick={() => handleScrollButton("left")}
      >
        <ChevronLeft color="white" />
      </button>

      <div
        className="track-and-thumb"
        role="scrollbar"
        aria-controls="custom-scrollbars-content"
        aria-valuenow={0}
        style={{ opacity: activeProductId ? 0 : 1 }}
      >
        <div
          className="track"
          ref={scrollTrackRef}
          onClick={handleTrackClick}
        ></div>
        <div
          className="thumb"
          ref={scrollThumbRef}
          onMouseDown={handleThumbMousedown}
          style={{ width: `${thumbWidth}px` }}
        ></div>
      </div>

      <button
        className={cn(
          `button button--right absolute -top-28 -right-5 rounded-full bg-black p-2 transition-all duration-200 ease-out hover:bg-[#333333] ${showArrowRight ? "cursor-pointer" : "opacity-0"}`,
          arrowPosition,
        )}
        onClick={() => handleScrollButton("right")}
      >
        <ChevronRight color="white" />
      </button>
    </div>
  );
}

export default CustomScroll;

//-top-28
