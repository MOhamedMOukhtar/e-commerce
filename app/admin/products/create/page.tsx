"use client";

import { useEffect, useRef, useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";

import { Button } from "@/components/ui/button";

import {
  createNewProduct,
  updateProduct,
} from "@/lib/firestore/products/write";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { getProduct } from "@/lib/firestore/products/read_server";
import { useRouter } from "next/navigation";
import ProductInformation from "./components/ProductInformation";
import RichTextEditor from "./components/tiptab/Tiptab";
import Image from "next/image";

type TData = {
  title: string;
  description: string;
  details: string;
  summary: string;
  goodToKnow: string;
  materialsAndCare: string;
  measurements: string;
  packaging: string;
  slug: string;
  price: number;
};

function Page() {
  const [data, setData] = useState<TData>({
    title: "",
    summary: "",
    description: "",
    details: "",
    goodToKnow: "",
    materialsAndCare: "",
    measurements: "",
    packaging: "",
    slug: "",
    price: 0,
  });

  const [featureImage, setFeatureImage] = useState<File | null>(null);
  const [measurementImage, setMeasurementImage] = useState<File | null>(null);
  const [imageList, setImageList] = useState<(File | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null!);
  const imagesRef = useRef<HTMLInputElement>(null!);
  const measurementImageRef = useRef<HTMLInputElement>(null!);
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
        measurementImage: measurementImage,
      });
      toast.success("Product created successfully!");
      setData({
        title: "",
        summary: "",
        description: "",
        details: "",
        goodToKnow: "",
        materialsAndCare: "",
        measurements: "",
        packaging: "",
        slug: "",
        price: 0,
      });
      setFeatureImage(null);
      setImageList([]);
      setMeasurementImage(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      if (imagesRef.current) {
        imagesRef.current.value = "";
      }
      if (measurementImageRef.current) {
        measurementImageRef.current.value = "";
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
        measurementImage: measurementImage,
      });
      toast.success("Product created successfully!");
      setData({
        title: "",
        summary: "",
        description: "",
        details: "",
        goodToKnow: "",
        materialsAndCare: "",
        measurements: "",
        packaging: "",
        slug: "",
        price: 0,
      });
      setFeatureImage(null);
      setImageList([]);
      setMeasurementImage(null);

      if (imageRef.current) {
        imageRef.current.value = "";
      }
      if (imagesRef.current) {
        imagesRef.current.value = "";
      }
      if (measurementImageRef.current) {
        measurementImageRef.current.value = "";
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

          <div className="rounded-md border bg-white p-4">
            <h1 className="mb-3 font-semibold text-black/70">Description</h1>
            <textarea
              rows={7}
              className="w-full rounded-sm border px-4 py-2"
              id=" product-description"
              onChange={(e) => handleData("description", e.target.value)}
              value={data.description ?? ""}
            ></textarea>
          </div>
          <div className="space-y-3 rounded-md border bg-white p-4">
            <h1 className="font-semibold text-black/70">Measurement</h1>
            {measurementImage && (
              <Image
                src={URL.createObjectURL(measurementImage)}
                alt="Measurement Image"
                className="my-2 rounded-sm object-cover"
                width={80}
                height={80}
              />
            )}
            <label
              className="text-sm text-gray-500"
              htmlFor="product-measurements-image"
            >
              Measurement Image
            </label>
            <input
              ref={measurementImageRef}
              type="file"
              id="product-measurements-image"
              name="product-measurements-image"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setMeasurementImage(e.target.files[0]);
                }
              }}
              className="mt-1 mb-4 w-full cursor-pointer rounded-sm border px-4 py-2 text-sm! outline-none"
            />

            <section className="flex flex-1 flex-col gap-1 rounded-md">
              <label
                className="text-sm text-gray-500"
                htmlFor="product-feature-image"
              >
                Product Measurement
              </label>
              <RichTextEditor
                content={data.measurements}
                onChange={(value) => handleData("measurements", value)}
              />
            </section>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <ProductInformation
          data={data.goodToKnow}
          handleData={handleData}
          name={"goodToKnow"}
          title={"Good to know"}
        />
        <ProductInformation
          data={data.materialsAndCare}
          handleData={handleData}
          name={"materialsAndCare"}
          title={"Materials and care"}
        />
      </div>
      <div className="flex gap-5">
        <ProductInformation
          data={data.details}
          handleData={handleData}
          name={"details"}
          title={"Details"}
        />
        <ProductInformation
          data={data.packaging}
          handleData={handleData}
          name={"packaging"}
          title={"Packaging"}
        />
      </div>
    </form>
  );
}

export default Page;
