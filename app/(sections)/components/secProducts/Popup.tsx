import { TSubSubSection } from "@/types/sub-subsection/subSubSection";
import { FloatingPortal } from "@floating-ui/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface PopupProps {
  popupRef: React.RefObject<HTMLDivElement | null>;
  subSubSection: TSubSubSection[];
  floatingStyles: React.CSSProperties;
  item: TSubSubSection;
  refs: { setFloating: (node: HTMLElement | null) => void };
  handleClick: () => void;
  setSectionTitle: Dispatch<SetStateAction<string | null>>;
  handleExplore: (subsection: string, item: string) => void;
}

function Popup({
  popupRef,
  subSubSection,
  floatingStyles,
  item,
  refs,
  handleClick,
  setSectionTitle,
  handleExplore,
}: PopupProps) {
  const router = useRouter();
  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <FloatingPortal>
      <div ref={popupRef}>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          onClick={handlePopupClick}
          className="min-w-80 rounded-2xl border border-black/30 bg-white p-[24px_48px_24px_24px] shadow-lg"
        >
          <p
            className="cursor-pointer font-semibold hover:underline"
            style={{
              paddingBlock: subSubSection.length === 0 ? "0" : "16px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
              router.push(`/cat/${item.slug}`);
              setSectionTitle(`explore`);
              if (item.id) handleExplore(item.id, item.id);
            }}
          >
            Explore {item.title}
          </p>
          <ul
            className={`underline-pointer space-y-4`}
            style={{
              columnCount: subSubSection.length > 8 ? 2 : 1,
            }}
          >
            {subSubSection.map((sub) => (
              <li
                key={sub.id}
                className="max-w-[230px] leading-5.5 text-[#444444] hover:text-[#000000]"
                onClick={(e) => {
                  e.stopPropagation();
                  setSectionTitle(`explore`);
                  if (item.id && sub.id) handleExplore(item.id, sub.id);
                }}
              >
                {sub.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FloatingPortal>
  );
}

export default Popup;
