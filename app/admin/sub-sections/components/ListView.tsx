"use client";

import LoadingPage from "@/components/loading";
import { Button } from "@/components/ui/button";
import { getSection } from "@/lib/firestore/sections/read_server";
import { useSubSections } from "@/lib/firestore/sub-sections/read";
import { deleteSubSection } from "@/lib/firestore/sub-sections/write";
import { showConfirmToast } from "@/lib/helper/confirmToast";
import { ChevronDown, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TItem {
  id: string;
  title: string;
  slug: string;
  section: string;
  imageURL: string;
  timestampCreate: string;
}

////////////// FUNCTIONAL COMPONENT //////////////
function ListView() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [field, setFiled] = useState<"title" | "section">("title");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const {
    data: subSection,
    isLoading,
    error,
  } = useSubSections(field, direction);
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
      await deleteSubSection(id);
      toast.success("Sub Section deleted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error deleting Sub Section");
      }
    }
    setIsDeleting(false);
  }

  function handleUpdate(id: string) {
    router.push(`/admin/sub-sections?id=${id}`);
  }

  function handleName() {
    setFiled("title");
    setDirection((prev) => {
      if (prev === "asc") {
        return "desc";
      } else {
        return "asc";
      }
    });
  }

  function handleSection() {
    setFiled("section");
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
            <th className="rounded-l-lg border-1 border-y bg-white px-3 py-2">
              SN
            </th>
            <th className="border-y bg-white px-3 py-2">Images</th>
            <th className="border-y bg-white px-3 py-2 text-start">
              Names
              <button className="cursor-pointer" onClick={handleName}>
                <ChevronDown
                  size={20}
                  className={`translate-y-1.5 ${field === "title" && direction === "desc" && "-rotate-180"}`}
                />
              </button>
            </th>
            <th className="border-y bg-white px-3 py-2 text-start">
              Sections
              <button className="cursor-pointer" onClick={handleSection}>
                <ChevronDown
                  size={20}
                  className={`translate-y-1.5 ${field === "section" && direction === "desc" && "-rotate-180"}`}
                />
              </button>
            </th>
            <th className="rounded-r-lg border-y border-r bg-white px-3 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {subSection?.map((item: TItem, index: number) => {
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
  useEffect(() => {
    async function fetchSection() {
      const section = await getSection(item?.section);
      setSection(section?.name);
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
              showConfirmToast(() => handelDelete(item?.id), "Sub Section")
            }
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
