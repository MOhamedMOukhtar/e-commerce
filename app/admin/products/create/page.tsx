"use client";

import { useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";

type TData = {
  title: string;
  description: string;
};

function Page() {
  const [data, setData] = useState<TData>({
    title: "",
    description: "",
  });
  const [featureImage, setFeatureImage] = useState<File|null>(null);
  const [imageList, setImageList] = useState<(File|null)[]>([]);

  function handleData(key: string, value: string | number | null) {
    setData((prev) => {
      return {
        ...(prev ?? {}), //expain this expression
        [key]: value,
      };
    });
  }

  return (
    <main className="flex flex-col gap-5 p-5">
      <h1 className="text-lg font-semibold">Create new product</h1>
      <div className="flex flex-col gap-5 md:flex-row">
        <BasicDetails data={data} handleData={handleData} />
        <div className="flex flex-1 flex-col gap-5">
          <Images
            data={data}
            featureImage={featureImage}
            setFeatureImage={setFeatureImage}
            imageList={imageList}
            setImageList={setImageList}
          />
          <Description data={data} handleData={handleData} />
        </div>
      </div>
    </main>
  );
}

export default Page;
