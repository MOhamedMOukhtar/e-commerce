"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSectoins } from "@/lib/firestore/sections/read";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubSections } from "@/lib/firestore/sub-sections/read";
import { TSubSection } from "@/types/subSection/subSection";
import {
  createNewSubSubSection,
  updateSubSubSection,
} from "@/lib/firestore/sub-subsection/write";
import { TSubSubSection } from "@/types/sub-subsection/subSubSection";
import { getSubSubSection } from "@/lib/firestore/sub-subsection/read_server";
import { TSections } from "@/types/section.ts/sections";

////////////// FUNCTIONAL COMPONENT //////////////
function Form() {
  const [data, setData] = useState<TSubSubSection>({
    title: "",
    slug: "",
    section: "",
    subSection: "",
    imageURL: null,
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");
  const router = useRouter();
  const { data: sections } = useSectoins();
  const { data: subSection } = useSubSections("title", "asc", data.section);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSubSubSection(id as string);
        if (!res) {
          toast.error("Sub Title not found");
        } else {
          setData(res as TSubSubSection);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error Fetching Sub Title");
        }
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  function handleData(key: string, value: string | number | null) {
    setData((prev) => {
      return {
        ...(prev ?? {}),
        [key]: value,
      };
    });
  }

  async function handleCreate() {
    setIsLoading(true);
    try {
      await createNewSubSubSection({
        data: {
          ...data,
          imageURL:
            typeof data.imageURL === "string" ? data.imageURL : undefined,
        },
        image,
      });
      toast.success("Sub Sub-Section created successfully!");
      setData({
        title: "",
        slug: "",
        section: "",
        subSection: "",
        imageURL: null,
      });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating Sub Sub-Section");
      }
    }
    setIsLoading(false);
  }

  async function handleUpdate() {
    setIsLoading(true);
    try {
      await updateSubSubSection({
        data: {
          ...data,
          imageURL:
            typeof data.imageURL === "string" ? data.imageURL : undefined,
        },
        image,
      });
      toast.success("Sub Sub-Section updated successfully!");
      setData({
        title: "",
        slug: "",
        section: "",
        subSection: "",
        imageURL: null,
      });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      router.push("/admin/sub-subsections");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating Sub Section");
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="m-6 flex w-[300px] flex-col gap-3 rounded-md bg-white p-5 lg:w-[600px]">
      <h1 className="text-xl">{id ? "Update" : "Create"} Sub SubSection</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
      >
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="sub-subsections-image"
          >
            Image
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          {typeof data?.imageURL === "string" && !image && (
            <Image
              src={data?.imageURL}
              alt="sub-subsections"
              className="my-2 rounded-sm object-cover"
              width={80}
              height={80}
            />
          )}
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="sub-subsections"
              className="my-2 rounded-sm object-cover"
              width={80}
              height={80}
            />
          )}
          <input
            ref={imageRef}
            id="sub-subsections-image"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            className="h-8 w-full cursor-pointer rounded-sm border px-4 py-1 text-sm! !font-normal outline-none"
          />
        </div>

        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="sub-subsections-name"
          >
            Title
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="sub-subsections-name"
            type="text"
            value={data?.title ?? ""}
            onChange={(e) => handleData("title", e.target.value)}
            placeholder="Enter Title"
            className="h-8 rounded-sm border-gray-300 text-sm! placeholder:text-gray-400 focus-visible:border-blue-400 focus-visible:ring-transparent"
          />
        </div>
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="slug"
          >
            Slug
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="slug"
            type="text"
            value={data?.slug ?? ""}
            onChange={(e) => handleData("slug", e.target.value)}
            placeholder="Enter Slug"
            className="h-8 rounded-sm border-gray-300 text-sm! placeholder:text-gray-400 focus-visible:border-blue-400 focus-visible:ring-transparent"
          />
        </div>
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="select-section"
          >
            Select Section
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <select
            id="select-section"
            value={data.section ?? ""}
            onChange={(e) => handleData("section", e.target.value)}
            className="h-8 w-full cursor-pointer rounded-sm border border-gray-300 pl-2 text-sm! text-gray-600 focus-visible:border-blue-400 focus-visible:ring-transparent"
          >
            <option value="">Select Section</option>

            {sections?.map((section: TSections) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="select-subsection"
          >
            Select Sub Section
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <select
            id="select-subsection"
            value={data.subSection ?? ""}
            onChange={(e) => handleData("subSection", e.target.value)}
            className="h-8 w-full cursor-pointer rounded-sm border border-gray-300 pl-2 text-sm! text-gray-600 focus-visible:border-blue-400 focus-visible:ring-transparent"
          >
            <option value="">Select Sub Section</option>

            {subSection?.map((section: TSubSection) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="slug"
          >
            Order
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="slug"
            type="number"
            value={data?.order ?? ""}
            onChange={(e) => handleData("order", e.target.valueAsNumber)}
            placeholder="Enter Order"
            className="h-8 rounded-sm border-gray-300 text-sm! placeholder:text-gray-400 focus-visible:border-blue-400 focus-visible:ring-transparent"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="disabled:cursor-not-allowed"
        >
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}

export default Form;
