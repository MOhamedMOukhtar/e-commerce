"use client";

import { useRef, useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import { Button } from "@/components/ui/button";

import { createNewProduct } from "@/lib/firestore/products/write";
import { toast } from "sonner";

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

  function handleData(key: string, value: string | number | null) {
    setData((prev) => {
      return {
        ...(prev ?? {}),
        [key]: value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold">Create new product</h1>
        <Button disabled={isLoading} className="" type="submit">
          Create
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
