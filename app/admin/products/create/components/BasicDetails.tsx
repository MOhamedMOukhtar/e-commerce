import { Input } from "@/components/ui/input";
import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";

interface PropsBasicDetails {
  data: {
    title: string;
    description: string;
    brandId?: string;
    categoryId?: string;
    stock?: number;
    price?: number;
    salePrice?: number;
  };
  handleData: (key: string, value: string | number | null) => void;
}

type TBrand = {
  name: string;
  slug?: string;
  id?: string;
  imageURL?: string;
};

type TCategory = {
  name: string;
  slug?: string;
  id?: string;
  imageURL?: string;
};

function BasicDetails({ data, handleData }: PropsBasicDetails) {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

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
          placeholder="Enter Product"
          name="product-title"
          value={data.title ?? ""}
          onChange={(e) => handleData("title", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-description">
          Description <span className="text-red-500">*</span>
        </label>
        <Input
          id="product-description"
          type="text"
          placeholder="Description"
          name="product-description"
          value={data.description ?? ""}
          onChange={(e) => handleData("description", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-brand">
          Brand <span className="text-red-500">*</span>
        </label>
        <select
          id="product-brand"
          name="product-brand"
          value={data.brandId ?? ""}
          onChange={(e) => handleData("brandId", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        >
          <option value="">Select Brand</option>
          {brands?.map((brand: TBrand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-category">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="product-category"
          name="product-category"
          value={data.categoryId ?? ""}
          onChange={(e) => handleData("categoryId", e.target.value)}
          className="w-full rounded-sm border px-4 py-2 text-sm! outline-none"
        >
          <option value="">Select Category</option>
          {categories?.map((category: TCategory) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500" htmlFor="product-stock">
          Stock <span className="text-red-500">*</span>
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
          Sale Price <span className="text-red-500">*</span>
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
    </section>
  );
}

export default BasicDetails;
