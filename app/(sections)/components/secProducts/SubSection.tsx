import { getSubSubSectionInSubSection } from "@/lib/firestore/sub-subsection/read_server";
import { TSubSubSection } from "@/types/sub-subsection/subSubSection";
import { flip, offset, shift, useFloating } from "@floating-ui/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import Popup from "./Popup";

export default function SubSection({
  item,
  popupRef,
  activeProductId,
  setActiveProductId,
  setSectionTitle,
  handleExplore,
}: {
  popupRef: React.RefObject<HTMLDivElement | null>;
  item: TSubSubSection;
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  setSectionTitle: Dispatch<SetStateAction<string | null>>;
  handleExplore: (subsection: string, item: string) => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subSubSection, setSubSubSection] = useState<TSubSubSection[]>([]);

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    middleware: [offset(0), flip(), shift()],
  });

  const isActive = activeProductId === item.id;
  const isOpen = activeProductId !== "";

  async function getSubSubSection(id: string) {
    setIsLoading(true);
    try {
      const subSubSection = (await getSubSubSectionInSubSection(
        id,
      )) as TSubSubSection[];
      setSubSubSection(subSubSection);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const handleClick = () => {
    if (isActive) {
      setActiveProductId("");
      return;
    }

    setActiveProductId(item.id || "");
    if (item.id) {
      getSubSubSection(item.id);
    }
  };

  return (
    <div
      ref={refs.setReference}
      className="relative flex min-w-30 cursor-pointer flex-col items-center gap-2 text-center text-sm"
      style={{
        opacity: isOpen && !isActive ? 0.4 : 1,
      }}
      onClick={handleClick}
    >
      <Image
        src={item.img ? item.img : "/ikean.png"}
        width={160}
        height={160}
        alt={item.title}
        className="h-20 w-20 object-cover"
      />
      <span className="text-[#666666] hover:text-[#131313]">{item.title}</span>

      {/* Popup */}
      {isActive && !isLoading && (
        <Popup
          item={item}
          refs={refs}
          popupRef={popupRef}
          handleClick={handleClick}
          subSubSection={subSubSection}
          floatingStyles={floatingStyles}
          setSectionTitle={setSectionTitle}
          handleExplore={handleExplore}
        />
      )}
    </div>
  );
}
