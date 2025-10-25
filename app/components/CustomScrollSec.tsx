"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomScroll from "../(sections)/components/secProducts/CustomScroll";
import { cn } from "@/lib/utils";
import { TSubSubSection } from "@/types/sub-subsection/subSubSection";
import { usePathname } from "next/navigation";

function CustomScrollSec({
  children,
  popupRef,
  fixJump = "",
  className = "",
  activeProductId,
  setActiveProductId,
  display = true,
  showSections = true,
  arrowPosition = "-top-60",
  subSubSections,
  clickedItem,
  exploreSubSection,
}: {
  children: React.ReactNode;
  popupRef?: React.RefObject<HTMLDivElement | null>;
  fixJump?: string;
  className?: string;
  activeProductId?: string;
  setActiveProductId?: React.Dispatch<React.SetStateAction<string>>;
  display?: boolean | (() => void);
  showSections?: boolean | (() => void);
  arrowPosition?: string;
  subSubSections?: TSubSubSection[];
  clickedItem?: string;
  exploreSubSection?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const [thumbWidth, setThumbWidth] = useState(500);
  const [clientWidth, setClientWidth] = useState(0);
  const [contentLeft, setContentLeft] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [showArrowRight, setShowArrowRight] = useState(false);
  const [showArrowLeft, setShowArrowLeft] = useState(false);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialContentScrollLeft, setInitialContentScrollLeft] =
    useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const pathname = usePathname();

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
  }, [
    handleThumbPosition,
    contentRef,
    exploreSubSection,
    clickedItem,
    subSubSections,
    pathname,
    activeProductId,
    children,
  ]);

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

  useEffect(() => {
    if (!popupRef) return;
    if (!activeProductId) return;
    if (!setActiveProductId) return;

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
  }, [activeProductId, popupRef, setActiveProductId]);

  return (
    <div
      className={cn(
        `${fixJump || "mb-100"} ${showSections ? "opacity-100" : "opacity-0"} ${display ? "block" : "hidden"}`,
        className,
      )}
      style={{
        maxHeight: showSections ? "120px" : "0px",
      }}
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
      <div className="content flex gap-5 overflow-x-scroll" ref={contentRef}>
        {children}
      </div>

      <CustomScroll
        handleScrollButton={handleScrollButton}
        scrollTrackRef={scrollTrackRef}
        handleTrackClick={handleTrackClick}
        scrollThumbRef={scrollThumbRef}
        handleThumbMousedown={handleThumbMousedown}
        thumbWidth={thumbWidth}
        showArrowLeft={showArrowLeft}
        showArrowRight={showArrowRight}
        arrowPosition={arrowPosition}
        contentRef={contentRef}
        subSubSections={subSubSections}
      />
    </div>
  );
}

export default CustomScrollSec;
