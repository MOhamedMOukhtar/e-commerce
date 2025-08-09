"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCollection } from "@/lib/firestore/collection/read_server";
import {
  createNewCollection,
  updateCollection,
} from "@/lib/firestore/collection/write";
import { useProduct, useProducts } from "@/lib/firestore/products/read";
import { TProduct } from "@/types/product/product";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TData = {
  title: string;
  subTitle: string;
  products?: string[];
};

////////////// FUNCTIONAL COMPONENT //////////////
function Form() {
  const [data, setData] = useState<TData>({
    title: "",
    subTitle: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: products } = useProducts({
    pageLimit: 2000,
    lastSnapDoc: null,
  });
  const imageRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCollection(id as string);
        if (!res) {
          toast.error("Category not found");
        } else {
          setData({
            title: res.title ?? "",
            subTitle: res.subTitle ?? "",
          });
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
      await createNewCollection({ data, image });
      toast.success("Category created successfully!");
      setData({ title: "", subTitle: "" });
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
      await updateCollection({ data, image });
      toast.success("Category updated successfully!");
      setData({ title: "", subTitle: "" });
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
            Title
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="category-name"
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
            htmlFor="collection-sub-title"
          >
            Sub Title
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <Input
            id="collection-sub-title"
            type="text"
            value={data?.subTitle ?? ""}
            onChange={(e) => handleData("subTitle", e.target.value)}
            placeholder="Enter Sub Title"
            className="h-8 rounded-sm border-gray-300 text-sm! placeholder:text-gray-400 focus-visible:border-blue-400 focus-visible:ring-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {data?.products?.map((product) => {
            return (
              <ProductCard
                productId={product}
                key={product}
                setData={setData}
              />
            );
          })}
        </div>
        <div>
          <label
            className="mb-0.5 flex gap-1 text-sm text-gray-500/90"
            htmlFor="collection-products"
          >
            Select Product
            <span className="relative block translate-y-[3px] text-red-500/60">
              *
            </span>
          </label>
          <select
            id="collection-products"
            onChange={(e) =>
              setData((prev) => {
                const list = [...(prev?.products ?? [])];
                list.push(e.target.value);
                return {
                  ...prev,
                  products: list,
                };
              })
            }
            className="h-8 w-full cursor-pointer rounded-sm border border-gray-300 pl-2 text-sm! text-gray-600 focus-visible:border-blue-400 focus-visible:ring-transparent"
          >
            <option value="">Select Product</option>
            {products?.map((product: TProduct) => (
              <option
                key={product.id}
                value={product.id}
                disabled={data?.products?.includes(product?.id)}
              >
                {product.title}
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

function ProductCard({
  productId,
  setData,
}: {
  productId: string;
  setData: TData;
}) {
  const { data: product } = useProduct({ productId });
  return (
    <div className="flex gap-3 rounded-full bg-blue-500 px-2 py-1 text-sm text-white">
      <p>{product?.title}</p>
      <button
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setData((prev) => {
            const list = [...(prev?.products ?? [])];
            list.splice(list.indexOf(productId), 1);
            return {
              ...prev,
              products: list,
            };
          });
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
}
