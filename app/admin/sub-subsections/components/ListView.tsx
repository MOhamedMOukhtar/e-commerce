"use client";

import LoadingPage from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useSectoins } from "@/lib/firestore/sections/read";
import { getSection } from "@/lib/firestore/sections/read_server";
import { useSubSections } from "@/lib/firestore/sub-sections/read";
import { getSubSection } from "@/lib/firestore/sub-sections/read_server";

import { useSubSubSections } from "@/lib/firestore/sub-subsection/read";
import { deleteSubSubSection } from "@/lib/firestore/sub-subsection/write";
import { showConfirmToast } from "@/lib/helper/confirmToast";
import { TSections } from "@/types/sections/sections";
import { TSubSection } from "@/types/subSection/subSection";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TItem {
  id: string;
  title: string;
  slug: string;
  section: string;
  subSection: string;
  imageURL: string;
  timestampCreate: string;
}

////////////// FUNCTIONAL COMPONENT //////////////
function ListView() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectSection, setSelectSection] = useState<string>("");
  const [selectSubSection, setSelectSubSection] = useState<string>("");

  const [field, setField] = useState<"title" | "section">("title");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const {
    data: subSubSection,
    isLoading,
    error,
  } = useSubSubSections(selectSection, selectSubSection);
  const { data: sections } = useSectoins();
  const { data: subSections } = useSubSections(
    undefined,
    undefined,
    selectSection,
  );
  const router = useRouter();

  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );

  if (error) {
    return <div>{error}</div>;
  }

  async function handelDelete(id: string) {
    setIsDeleting(true);
    try {
      await deleteSubSubSection(id);
      toast.success("Sub Sub-Section deleted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error deleting Sub Sub-Section");
      }
    }
    setIsDeleting(false);
  }

  function handleUpdate(id: string) {
    router.push(`/admin/sub-subsections?id=${id}`);
  }

  function handleName() {
    setField("title");
    setDirection((prev) => {
      if (prev === "asc") {
        return "desc";
      } else {
        return "asc";
      }
    });
  }

  function handleSection() {
    setField("section");
    setDirection((prev) => {
      if (prev === "asc") {
        return "desc";
      } else {
        return "asc";
      }
    });
  }

  return (
    <div className="flex flex-1 flex-col rounded-md px-5">
      <h1 className="text-xl">Sub Section</h1>
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="w-[5%] rounded-l-lg border-1 border-y bg-white px-3 py-2">
              SN
            </th>
            <th className="w-[8%] border-y bg-white px-3 py-2">Images</th>
            <th className="w-[35%] border-y bg-white px-3 py-2 text-start">
              Names
            </th>
            <th className="w-[17%] border-y bg-white px-3 py-2 text-start">
              <div className="flex flex-col gap-1">
                <select
                  name="sections"
                  className="cursor-pointer text-sm! outline-none"
                  value={selectSection}
                  onChange={(e) => {
                    setSelectSection(() => {
                      return e.target.value === "Select Section"
                        ? ""
                        : e.target.value;
                    });
                    setSelectSubSection("");
                  }}
                >
                  <option>Select Section</option>
                  {sections?.map((section: TSections) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </th>
            <th className="w-[20%] border-y bg-white px-3 py-2 text-start">
              <div className="flex flex-col gap-1">
                <select
                  name="subSections"
                  className="cursor-pointer text-sm! outline-none"
                  value={selectSubSection}
                  onChange={(e) =>
                    setSelectSubSection(() => {
                      return e.target.value === "Select Sub Section"
                        ? ""
                        : e.target.value;
                    })
                  }
                >
                  <option value="">Select Sub Section</option>
                  {subSections?.map((subSection: TSubSection) => (
                    <option key={subSection.id} value={subSection.id}>
                      {subSection.title}
                    </option>
                  ))}
                </select>
              </div>
            </th>
            <th className="w-[15%] rounded-r-lg border-y border-r bg-white px-3 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {subSubSection?.map((item: TItem, index: number) => {
            return (
              <SubSection
                item={item}
                index={index}
                key={item?.id}
                isDeleting={isDeleting}
                handleUpdate={handleUpdate}
                handelDelete={handelDelete}
              />
            );
          })}
        </tbody>
      </table>
      {!subSubSection && (
        <div className="my-5 rounded-md bg-white px-5 py-10 text-center text-gray-700">
          No items found here yet. Try selecting a different section or add a
          new one.
        </div>
      )}
    </div>
  );
}

export default ListView;

interface SubSectionProps {
  item: TItem;
  index: number;
  isDeleting: boolean;
  handleUpdate: (id: string) => void;
  handelDelete: (id: string) => void;
}

function SubSection({
  item,
  index,
  isDeleting,
  handleUpdate,
  handelDelete,
}: SubSectionProps) {
  const [section, setSection] = useState<string>("");
  const [subSection, setSubSection] = useState<string>("");
  useEffect(() => {
    async function fetchSection() {
      const section = await getSection(item?.section);
      setSection(section?.name);
      const subSection = await getSubSection(item?.subSection);
      setSubSection(subSection?.title);
    }
    fetchSection();
  }, []);

  return (
    <tr className="">
      <td className="rounded-l-lg border-1 border-y bg-white px-3 py-2 text-center">
        {index + 1}
      </td>
      <td className="border-y bg-white px-3 py-2">
        <div className="flex justify-center">
          <Image
            src={item?.imageURL}
            alt="image brand"
            width={50}
            height={50}
            className="rounded-sm"
          />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2">{item?.title}</td>
      <td className="border-y bg-white px-3 py-2">{section}</td>

      <td className="border-y bg-white px-3 py-2">{subSection}</td>
      <td className="rounded-r-lg border-y border-r bg-white px-3 py-2">
        <div className="flex items-center justify-center gap-2">
          <Button
            size={"sm"}
            disabled={isDeleting}
            variant={"outline"}
            onClick={() => handleUpdate(item?.id)}
          >
            <Edit2 size={13} />
          </Button>
          <Button
            size={"sm"}
            disabled={isDeleting}
            onClick={() =>
              showConfirmToast(() => handelDelete(item?.id), "Sub Sub-Section")
            }
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
