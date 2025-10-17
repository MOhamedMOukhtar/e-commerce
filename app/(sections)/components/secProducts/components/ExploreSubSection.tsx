import {
  getSubSubSection,
  getSubSubSectionInSubSection,
} from "@/lib/firestore/sub-subsection/read_server";
import { TSubSubSection } from "@/types/sub-subsection/subSubSection";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TSubSection } from "@/types/subSection/subSection";
import { getSubSection } from "@/lib/firestore/sub-sections/read_server";
import { cn } from "@/lib/utils";
import CustomScrollSec from "@/app/components/CustomScrollSec";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ExploreStorageFurniture({
  setSectionTitle,
  exploreSubSection,
  setClickedItem,
  clickedItem,
  className,
}: {
  setSectionTitle: Dispatch<SetStateAction<string | null>>;
  exploreSubSection: string;
  setClickedItem: Dispatch<SetStateAction<string>>;
  clickedItem: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [subSection, setSubSection] = useState<TSubSection>();
  const [subSubSections, setSubSubSections] = useState<TSubSubSection[]>([]);
  const [subSubSection, setSubSubSection] = useState<TSubSubSection>();
  const router = useRouter();

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

  function handleURL() {
    if (clickedItem !== exploreSubSection) {
      router.push(`/cat/${subSection?.slug}`);
    } else {
      router.push(`/`);
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
    <div className={cn(`grid grid-cols-[15%_83%] gap-5`, className)}>
      <div className="flex h-fit items-start justify-evenly border-r">
        <div
          onClick={() => {
            setSectionTitle(() => {
              if (clickedItem !== exploreSubSection) {
                setClickedItem(exploreSubSection);
              }
              return clickedItem === exploreSubSection ? "products" : "explore";
            });
            handleURL();
          }}
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
      <CustomScrollSec
        className="relative ml-7"
        arrowPosition="-top-28"
        subSubSections={subSubSections}
        exploreSubSection={exploreSubSection}
        clickedItem={clickedItem}
      >
        <div className="relative mb-5 flex gap-3">
          {subSubSections
            .filter((item) => item.id !== clickedItem)
            .map((item) => (
              <Link
                href={`/cat/${item.slug}`}
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
              </Link>
            ))}
        </div>
      </CustomScrollSec>
    </div>
  );
}

export default ExploreStorageFurniture;
