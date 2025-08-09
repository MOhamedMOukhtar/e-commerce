import Image from "next/image";

interface PropsImages {
  data: {
    title: string;
    summary: string;
    featureImage?: string;
    imageList?: string[];
  };
  featureImage: File | null;
  setFeatureImage: React.Dispatch<React.SetStateAction<File | null>>;
  imageList: (File | null)[];
  setImageList: React.Dispatch<React.SetStateAction<(File | null)[]>>;
  imageRef: React.RefObject<HTMLInputElement>;
  imagesRef: React.RefObject<HTMLInputElement>;
}

function Images({
  featureImage,
  setFeatureImage,
  imageList,
  setImageList,
  imageRef,
  imagesRef,
  data,
}: PropsImages) {
  return (
    <section className="flex flex-1 flex-col gap-3 rounded-md border bg-white p-4">
      <h1 className="font-semibold">Images</h1>
      <div className="flex flex-col gap-1">
        {data?.featureImage && !featureImage && (
          <Image
            src={data?.featureImage}
            alt="Category"
            className="my-2 rounded-sm object-cover"
            width={80}
            height={80}
          />
        )}
        {featureImage && (
          <Image
            src={URL.createObjectURL(featureImage)}
            alt="Category"
            className="my-2 rounded-sm object-cover"
            width={80}
            height={80}
          />
        )}
        <label
          className="text-sm text-gray-500"
          htmlFor="product-feature-image"
        >
          Feature Image <span className="text-red-500">*</span>
        </label>
        <input
          ref={imageRef}
          type="file"
          id="product-feature-image"
          name="product-feature-image"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFeatureImage(e.target.files[0]);
            }
          }}
          className="w-full cursor-pointer rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        {imageList?.length === 0 && data?.imageList?.length != 0 && (
          <div className="flex flex-wrap gap-3">
            {data?.imageList?.map((item) => {
              console.log(item);
              if (item) {
                return (
                  <Image
                    key={item}
                    src={item}
                    alt="Category"
                    className="my-2 rounded-sm object-cover"
                    width={80}
                    height={80}
                  />
                );
              }
            })}
          </div>
        )}
        {imageList.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {imageList.map((item) => {
              if (item) {
                return (
                  <Image
                    key={item.name}
                    src={URL.createObjectURL(item)}
                    alt="Category"
                    className="my-2 rounded-sm object-cover"
                    width={80}
                    height={80}
                  />
                );
              }
            })}
          </div>
        )}
        <label className="text-sm text-gray-500" htmlFor="product-images">
          Images
        </label>
        <input
          ref={imagesRef}
          type="file"
          id="product-images"
          name="product-images"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImageList(Array.from(e.target.files));
            }
          }}
          className="w-full cursor-pointer rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
    </section>
  );
}

export default Images;
