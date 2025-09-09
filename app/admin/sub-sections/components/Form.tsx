"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSubSection } from "@/lib/firestore/sub-sections/read_server";
import {
  createNewSubSection,
  updateSubSection,
} from "@/lib/firestore/sub-sections/write";
import { useSectoins } from "@/lib/firestore/sections/read";
import { TBrand } from "@/types/brand";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { TSections } from "@/types/sections";

type TData = {
  title: string;
  slug?: string;
  section?: string;
};

////////////// FUNCTIONAL COMPONENT //////////////
function Form() {
  const [data, setData] = useState<TData>({
    title: "",
    slug: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");
  const router = useRouter();
  const { data: sections } = useSectoins();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSubSection(id as string);
        if (!res) {
          toast.error("Sub Title not found");
        } else {
          setData(res as TBrand);
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

  function handleData(key: string, value: string | null) {
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
      await createNewSubSection({ data, image });
      toast.success("Sub Section created successfully!");
      setData({ title: "", slug: "" });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating Sub Section");
      }
    }
    setIsLoading(false);
  }

  async function handleUpdate() {
    setIsLoading(true);
    try {
      await updateSubSection({ data, image });
      toast.success("Sub Section updated successfully!");
      setData({ title: "", slug: "" });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      router.push("/admin/sub-sections");
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
    <div className="flex w-[300px] flex-col gap-3 rounded-md bg-white p-5 lg:w-[400px]">
      <h1 className="text-xl">{id ? "Update" : "Create"} Sub Section</h1>
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
            htmlFor="sub-sections-image"
          >
            Image
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="sub-sections"
              className="my-2 rounded-sm object-cover"
              width={80}
              height={80}
            />
          )}
          <input
            ref={imageRef}
            id="sub-sections-image"
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
            htmlFor="sub-sections-name"
          >
            Title
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="sub-sections-name"
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
            htmlFor="sub-title"
          >
            Sub Title
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="sub-title"
            type="text"
            value={data?.slug ?? ""}
            onChange={(e) => handleData("slug", e.target.value)}
            placeholder="Enter Sub Title"
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
