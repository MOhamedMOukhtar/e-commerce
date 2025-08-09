"use client";

import LoadingPage from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/lib/firestore/products/read";
import { deleteProducts } from "@/lib/firestore/products/write";
import { showConfirmToast } from "@/lib/helper/confirmToast";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TItem {
  id: string;
  title: string;
  price: number;
  stock: number;
  orders: number;
  featureImage: string;
  timestampCreate: string;
}

////////////// FUNCTIONAL COMPONENT //////////////
function ListView() {
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [lastSnapDocList, setLastSnapDocList] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);

  useEffect(() => {
    setLastSnapDocList([]);
  }, [pageLimit]);

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const {
    data: products,
    isLoading,
    error,
    lastSnapDoc,
  } = useProducts({
    pageLimit,
    lastSnapDoc:
      lastSnapDocList?.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList.length - 1],
  });

  console.log(products?.length);
  // console.log(lastSnapDocList);

  const handleNextPage = () => {
    const newStack = [...lastSnapDocList];
    newStack.push(lastSnapDoc);
    setLastSnapDocList(newStack);
  };
  const handlePrePage = () => {
    const newStack = [...lastSnapDocList];
    newStack.pop();
    setLastSnapDocList(newStack);
  };

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
      await deleteProducts(id);
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
    router.push(`/admin/products/create?id=${id}`);
  }

  return (
    <div className="flex flex-1 flex-col gap-5 rounded-md px-4">
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="rounded-l-lg border-1 border-y bg-white px-3 py-2">
              SN
            </th>
            <th className="border-y bg-white px-3 py-2">Image</th>
            <th className="border-y bg-white px-3 py-2 text-start">Title</th>
            <th className="border-y bg-white px-3 py-2 text-start">Price</th>
            <th className="border-y bg-white px-3 py-2 text-start">Stock</th>
            <th className="border-y bg-white px-3 py-2 text-start">Orders</th>
            <th className="border-y bg-white px-3 py-2 text-start">Status</th>
            <th className="rounded-r-lg border-y border-r bg-white px-3 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item: TItem, index: number) => {
            // console.log(item);
            return (
              <tr key={item?.id} className="[&>td]:border-y [&>td]:bg-white">
                <td className="rounded-l-lg px-3 py-2 text-center">
                  {index + lastSnapDocList.length * pageLimit + 1}
                </td>
                <td>
                  <div className="flex justify-center">
                    <Image
                      src={item?.featureImage}
                      alt="image category"
                      width={30}
                      height={30}
                      className="rounded-xs"
                    />
                  </div>
                </td>
                <td className="px-3 py-2">{item.title}</td>
                <td className="px-3 py-2">{item?.price}</td>
                <td className="px-3 py-2">{item?.stock}</td>
                <td className="px-3 py-2">{item?.orders ?? 0}</td>
                <td className="px-3 py-2">
                  {item?.stock - (item?.orders ?? 0) > 0 && (
                    <div className="w-fit rounded-sm bg-green-100 px-3 text-green-600">
                      In stock
                    </div>
                  )}
                  {item?.stock - (item?.orders ?? 0) <= 0 && (
                    <div className="w-fit rounded-sm bg-red-100 px-3 text-red-600">
                      Out of stock
                    </div>
                  )}
                </td>
                <td className="rounded-r-lg border-y border-r px-3 py-2">
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
      <div className="flex justify-between">
        <Button
          disabled={isLoading || lastSnapDocList.length === 0}
          onClick={handlePrePage}
          variant={"border"}
        >
          Previous
        </Button>
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(Number(e.target.value))}
          className="rounded-sm border-1 border-black px-4"
          name="perpage"
          id="perpage"
        >
          <option value="3">3 Items</option>
          <option value="5">5 Items</option>
          <option value="10">10 Items</option>
          <option value="20">20 Items</option>
          <option value="100">100 Items</option>
        </select>
        <Button
          disabled={isLoading || lastSnapDoc === null}
          onClick={handleNextPage}
          variant={"border"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ListView;
