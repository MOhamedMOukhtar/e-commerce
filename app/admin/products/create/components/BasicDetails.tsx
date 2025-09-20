import { Input } from "@/components/ui/input";

import { useSectoins } from "@/lib/firestore/sections/read";
import { useSubSections } from "@/lib/firestore/sub-sections/read";

import { TProduct } from "@/types/product/product";

interface PropsBasicDetails {
  data: TProduct;
  handleData: (key: string, value: string | number | null) => void;
}

type TSection = {
  name: string;
  slug?: string;
  id?: string;
  imageURL?: string;
};

function BasicDetails({ data, handleData }: PropsBasicDetails) {
  const { data: sections } = useSectoins();
  const { data: subSection } = useSubSections();

  return (
    <section className="flex flex-1 flex-col gap-4 rounded-md border bg-white p-4">
      <h1 className="font-semibold text-black/70">Basic Details</h1>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-title">
          Product Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="product-title"
          type="text"
          placeholder="Product"
          name="product-title"
          value={data.title ?? ""}
          onChange={(e) => handleData("title", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-summary">
          Summary <span className="text-red-500">*</span>
        </label>
        <Input
          id="product-summary"
          type="text"
          placeholder="Summary"
          name="product-summary"
          value={data.summary ?? ""}
          onChange={(e) => handleData("summary", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-shortSummary">
          Short Summary
        </label>
        <Input
          id="product-shortSummary"
          type="text"
          placeholder="Short Summary"
          name="product-shortSummary"
          value={data.shortSummary ?? ""}
          onChange={(e) => handleData("shortSummary", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-slug">
          Slug <span className="text-red-500">*</span>
        </label>
        <Input
          id="product-slug"
          type="text"
          placeholder="Slug"
          name="product-slug"
          value={data.slug ?? ""}
          onChange={(e) => handleData("slug", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-brand">
          Section
        </label>
        <select
          id="product-brand"
          name="product-brand"
          value={data.section ?? ""}
          onChange={(e) => handleData("section", e.target.value)}
          className="w-full cursor-pointer rounded-sm border px-4 py-2 text-sm! outline-none"
        >
          <option value="">Select Section</option>
          {sections?.map((brand: TSection) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-brand">
          Sub Section
        </label>
        <select
          id="product-brand"
          name="product-brand"
          value={data.subSection ?? ""}
          onChange={(e) => handleData("subSection", e.target.value)}
          className="w-full cursor-pointer rounded-sm border px-4 py-2 text-sm! outline-none"
        >
          <option value="">Select Sub Section</option>
          {subSection?.map((subSection: { id: string; title: string }) => (
            <option key={subSection.id} value={subSection.id}>
              {subSection.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-summary">
          Color
        </label>
        <Input
          id="product-summary"
          type="text"
          placeholder="Color"
          name="product-color"
          value={data.color ?? ""}
          onChange={(e) => handleData("color", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-stock">
          Stock
        </label>
        <Input
          id="product-stock"
          type="number"
          placeholder="Enter Stock"
          name="product-stock"
          value={data.stock ?? ""}
          onChange={(e) => handleData("stock", e.target.valueAsNumber)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-price">
          Price <span className="text-red-500">*</span>
        </label>
        <Input
          id="product-price"
          type="number"
          placeholder="Enter Price"
          name="product-price"
          value={data.price ?? ""}
          onChange={(e) => handleData("price", e.target.valueAsNumber)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-sale-price">
          Sale Price
        </label>
        <Input
          id="product-sale-price"
          type="number"
          placeholder="Enter Sale Price"
          name="product-sale-price"
          value={data.salePrice ?? ""}
          onChange={(e) => handleData("salePrice", e.target.valueAsNumber)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          className="text-sm text-gray-500"
          htmlFor="product-is-featured-product"
        >
          Is Featured Product
        </label>
        <select
          id="product-is-featured-product"
          name="product-is-featured-product"
          value={String(data.isFeatured ?? false)}
          onChange={(e) => handleData("isFeatured", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        >
          <option value={"false"}>No</option>
          <option value={"true"}>Yes</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label
          className="text-sm text-gray-500"
          htmlFor="product-recomended-product"
        >
          Recomended Product
        </label>
        <select
          id="product-recomended-product"
          name="product-recomended-product"
          value={String(data.recommended ?? false)}
          onChange={(e) => handleData("recommended", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        >
          <option value={"false"}>No</option>
          <option value={"true"}>Yes</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="common-id">
          Common ID
        </label>
        <Input
          id="common-id"
          type="text"
          placeholder="Enter ID"
          name="common-id"
          value={data.commonID ?? ""}
          onChange={(e) => handleData("commonID", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
    </section>
  );
}

export default BasicDetails;
