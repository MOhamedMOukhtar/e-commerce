"use client";

import LoadingPage from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/lib/firestore/collection/read";
import { deleteCollection } from "@/lib/firestore/collection/write";
import { showConfirmToast } from "@/lib/helper/confirmToast";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface TItem {
  id: string;
  title: string;
  slug: string;
  imageURL: string;
  timestampCreate: string;
  products?: string[];
}

////////////// FUNCTIONAL COMPONENT //////////////
function ListView() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { data: collections, isLoading, error } = useCollections();
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
      await deleteCollection(id);
      toast.success("Category deleted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error deleting category");
      }
    }
    setIsDeleting(false);
  }

  function handleUpdate(id: string) {
    router.push(`/admin/collections?id=${id}`);
  }

  return (
    <div className="flex flex-1 flex-col rounded-md px-5">
      <h1 className="text-xl">Collections</h1>
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="rounded-l-lg border-y bg-white px-3 py-2">SN</th>
            <th className="border-y bg-white px-3 py-2">Image</th>
            <th className="border-y bg-white px-3 py-2 text-start">Title</th>
            <th className="border-y bg-white px-3 py-2 text-start">Products</th>
            <th className="rounded-r-lg border-y border-r bg-white px-3 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {collections?.map((item: TItem, index: number) => {
            return (
              <tr key={item?.id} className="">
                <td className="rounded-l-lg border-1 border-y bg-white px-3 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border-y bg-white px-3 py-2">
                  <div className="flex justify-center">
                    <Image
                      src={item?.imageURL}
                      alt="image category"
                      width={50}
                      height={50}
                      className="rounded-sm"
                    />
                  </div>
                </td>
                <td className="border-y bg-white px-3 py-2">{item?.title}</td>
                <td className="border-y bg-white px-3 py-2">
                  {item?.products?.length}
                </td>
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
                        showConfirmToast(
                          () => handelDelete(item?.id),
                          "category",
                        )
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
