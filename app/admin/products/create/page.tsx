"use client";

import { useEffect, useRef, useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import { Button } from "@/components/ui/button";

import {
  createNewProduct,
  updateProduct,
} from "@/lib/firestore/products/write";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { getProduct } from "@/lib/firestore/products/read_server";
import { useRouter } from "next/navigation";

type TData = {
  title: string;
  description: string;
  summary: string;
};

function Page() {
  const [data, setData] = useState<TData>({
    title: "",
    summary: "",
    description: "",
  });

  const [featureImage, setFeatureImage] = useState<File | null>(null);
  const [imageList, setImageList] = useState<(File | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null!);
  const imagesRef = useRef<HTMLInputElement>(null!);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");

  async function fetchData() {
    try {
      const res = await getProduct({ id });
      if (!res) {
        throw new Error("Product not found");
      } else {
        setData(res as TData);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error fetching product");
      }
    }
  }

  useEffect(() => {
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
      await createNewProduct({
        data: data,
        featureImage: featureImage,
        imageList: imageList,
      });
      toast.success("Product created successfully!");
      setData({ title: "", summary: "", description: "" });
      setFeatureImage(null);
      setImageList([]);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      if (imagesRef.current) {
        imagesRef.current.value = "";
      }
      setImageList([]);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating product");
      }
    }
    setIsLoading(false);
  }
  async function handleUpdate() {
    setIsLoading(true);
    try {
      await updateProduct({
        data: data,
        featureImage: featureImage,
        imageList: imageList,
      });
      toast.success("Product created successfully!");
      setData({ title: "", summary: "", description: "" });
      setFeatureImage(null);
      setImageList([]);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      if (imagesRef.current) {
        imagesRef.current.value = "";
      }
      setImageList([]);
      router.push("/admin/products");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error creating product");
      }
    }
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (id) {
          handleUpdate();
        } else {
          handleCreate();
        }
      }}
      className="flex flex-col gap-5 p-5"
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold">{`${id ? "Update " : "Create new "}product`}</h1>
        <Button disabled={isLoading} className="" type="submit">
          {id ? "Update " : "Create"}
        </Button>
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <BasicDetails data={data} handleData={handleData} />
        <div className="flex flex-1 flex-col gap-5">
          <Images
            imageRef={imageRef}
            imagesRef={imagesRef}
            data={data}
            featureImage={featureImage}
            setFeatureImage={setFeatureImage}
            imageList={imageList}
            setImageList={setImageList}
          />
          <Description data={data.description} handleData={handleData} />
        </div>
      </div>
    </form>
  );
}

export default Page;
