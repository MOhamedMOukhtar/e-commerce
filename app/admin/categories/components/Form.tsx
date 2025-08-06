"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategory } from "@/lib/firestore/categories/read_server";
import {
  createNewCategory,
  updateCategory,
} from "@/lib/firestore/categories/write";
import { TCategory } from "@/types/catrgory";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TData = {
  name: string;
  slug: string;
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
        const res = await getCategory(id as string);
        if (!res) {
          toast.error("Category not found");
        } else {
          setData(res as TCategory);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error fetching category");
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
      await createNewCategory({ data, image });
      toast.success("Category created successfully!");
      setData({ name: "", slug: "" });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating category");
      }
    }
    setIsLoading(false);
  }

  async function handleUpdate() {
    setIsLoading(true);
    try {
      await updateCategory({ data, image });
      toast.success("Category updated successfully!");
      setData({ name: "", slug: "" });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      router.push("/admin/categories");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating category");
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex w-[300px] flex-col gap-3 rounded-md bg-white p-5 lg:w-[400px]">
      <h1 className="text-xl">{id ? "Update" : "Create"} Category</h1>
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
            htmlFor="category-image"
          >
            Image
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="Category"
              className="my-2 rounded-sm object-cover"
              width={80}
              height={80}
            />
          )}
          <input
            ref={imageRef}
            id="category-image"
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
            htmlFor="category-name"
          >
            Name
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="category-name"
            type="text"
            value={data?.name ?? ""}
            onChange={(e) => handleData("name", e.target.value)}
            placeholder="Enter Name"
            className="h-8 rounded-sm border-gray-300 text-sm! placeholder:text-gray-400 focus-visible:border-blue-400 focus-visible:ring-transparent"
          />
        </div>
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="category-slug"
          >
            Slug
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="category-slug"
            type="text"
            value={data?.slug ?? ""}
            onChange={(e) => handleData("slug", e.target.value)}
            placeholder="Enter Slug"
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
