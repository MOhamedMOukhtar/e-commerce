"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSection } from "@/lib/firestore/sections/read_server";
import {
  createNewSection,
  updateSection,
} from "@/lib/firestore/sections/write";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TData = {
  name: string;
  slug: string;
  products?: string[];
  id?: string;
  imageURL?: string;
};

////////////// FUNCTIONAL COMPONENT //////////////
function Form() {
  const [data, setData] = useState<TData>({
    name: "",
    slug: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSection(id as string);
        if (!res) {
          toast.error("Section not found");
        } else {
          setData(res);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error fetching section");
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
      await createNewSection({ data, image });
      toast.success("Section created successfully!");
      setData({ name: "", slug: "" });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating Section");
      }
    }
    setIsLoading(false);
  }

  async function handleUpdate() {
    setIsLoading(true);
    try {
      await updateSection({ data, image });
      toast.success("Section updated successfully!");
      setData({ name: "", slug: "" });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      router.push("/admin/sections");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating section");
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex w-[300px] flex-col gap-3 rounded-md bg-white p-5 lg:w-[400px]">
      <h1 className="text-xl">{id ? "Update" : "Create"} Sections</h1>
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
            htmlFor="section-image"
          >
            Image
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="Section"
              className="my-2 rounded-sm object-cover"
              width={80}
              height={80}
            />
          )}
          <input
            ref={imageRef}
            id="section-image"
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
            htmlFor="section-title"
          >
            Title
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="section-title"
            name="section-title"
            type="text"
            value={data?.name ?? ""}
            onChange={(e) => handleData("name", e.target.value)}
            placeholder="Enter Title"
            className="h-8 rounded-sm border-gray-300 text-sm! placeholder:text-gray-400 focus-visible:border-blue-400 focus-visible:ring-transparent"
          />
        </div>
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="section-sub-title"
          >
            Sub Title
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="section-sub-title"
            name="section-sub-title"
            type="text"
            value={data?.slug ?? ""}
            onChange={(e) => handleData("slug", e.target.value)}
            placeholder="Enter Sub Title"
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

/*
{
            name: res.name ?? "",
            slug: res.slug ?? "",
            products: res.products ?? [],
          }
*/
