"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdmin } from "@/lib/firestore/admins/read_server";
import { createNewAdmin, updateAdmin } from "@/lib/firestore/admins/write";
import { TBrand } from "@/types/brand";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TData = {
  name: string;
  email: string;
  slug?: string;
};

////////////// FUNCTIONAL COMPONENT //////////////
function Form() {
  const [data, setData] = useState<TData>({
    name: "",
    email: "",
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
        const res = await getAdmin(id as string);
        if (!res) {
          toast.error("Admin not found");
        } else {
          setData(res as TBrand);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error fetching brand");
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
      await createNewAdmin({ data, image });
      toast.success("Admin created successfully!");
      setData({ name: "", email: "" });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating Brand");
      }
    }
    setIsLoading(false);
  }

  async function handleUpdate() {
    setIsLoading(true);
    try {
      await updateAdmin({ data, image });
      toast.success("Admin updated successfully!");
      setData({ name: "", email: "" });
      setImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      router.push("/admin/admins");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating brand");
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex w-[300px] flex-col gap-3 rounded-md bg-white p-5 lg:w-[400px]">
      <h1 className="text-xl">{id ? "Update" : "Create"} Admin</h1>
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
            htmlFor="admin-image"
          >
            Image
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="admin"
              className="my-2 rounded-sm object-cover"
              width={80}
              height={80}
            />
          )}
          <Input
            ref={imageRef}
            id="admin-image"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            className="h-8 cursor-pointer rounded-sm border-gray-300 text-sm!"
          />
        </div>
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="admin-name"
          >
            Name
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="admin-name"
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
            htmlFor="admin-email"
          >
            Email
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="admin-email"
            type="email"
            value={data?.email ?? ""}
            onChange={(e) => handleData("email", e.target.value)}
            placeholder="Enter Name"
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
