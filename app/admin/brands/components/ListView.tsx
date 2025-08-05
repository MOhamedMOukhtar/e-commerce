"use client";

import LoadingPage from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useBrands } from "@/lib/firestore/brands/read";
import { deleteBrand } from "@/lib/firestore/brands/write";
import { showConfirmToast } from "@/lib/helper/confirmToast";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface TItem {
  id: string;
  name: string;
  slug: string;
  imageURL: string;
  timestampCreate: string;
}

////////////// FUNCTIONAL COMPONENT //////////////
function ListView() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { data: brands, isLoading, error } = useBrands();
  const router = useRouter();

  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );

  if (error) {
    return <div>{error}</div>;
  }

  async function handelDelete(id: string) {
    setIsDeleting(true);
    try {
      await deleteBrand(id);
      toast.success("Brand deleted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error deleting brand");
      }
    }
    setIsDeleting(false);
  }

  function handleUpdate(id: string) {
    router.push(`/admin/brands?id=${id}`);
  }

  return (
    <div className="flex flex-1 flex-col rounded-md px-5">
      <h1 className="text-xl">Brands</h1>
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="rounded-l-lg border-1 border-y bg-white px-3 py-2">
              SN
            </th>
            <th className="border-y bg-white px-3 py-2">Image</th>
            <th className="border-y bg-white px-3 py-2 text-start">Name</th>
            <th className="rounded-r-lg border-y border-r bg-white px-3 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {brands?.map((item: TItem, index: number) => {
            return (
              <tr key={item?.id} className="">
                <td className="rounded-l-lg border-1 border-y bg-white px-3 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border-y bg-white px-3 py-2">
                  <div className="flex justify-center">
                    <Image
                      src={item?.imageURL}
                      alt="image brand"
                      width={50}
                      height={50}
                      className="rounded-sm"
                    />
                  </div>
                </td>
                <td className="border-y bg-white px-3 py-2">{item?.name}</td>
                <td className="rounded-r-lg border-y border-r bg-white px-3 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size={"sm"}
                      disabled={isDeleting}
                      variant={"outline"}
                      onClick={() => handleUpdate(item?.id)}
                    >
                      <Edit2 size={13} />
                    </Button>
                    <Button
                      size={"sm"}
                      disabled={isDeleting}
                      onClick={() =>
                        showConfirmToast(() => handelDelete(item?.id), "brand")
                      }
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListView;
