import { PopupInfo } from "@/app/components/IndicatorPopup";
import ProductCardLarge from "@/app/components/ProductCardLarge";
import { Button } from "@/components/ui/button";
import { getTablesChairs } from "@/lib/firestore/folder/tablesChairs";
import { TProduct } from "@/types/product/product";
import { useEffect, useState } from "react";

function TablesChairs() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    async function fetch() {
      const products = (await getTablesChairs()) as TProduct[];
      setProducts(products);
    }
    fetch();
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="mx-12">
      <h1 className="font-mix-blend-color-dodge mt-14 mb-10 text-4xl">
        Tables & chairs
      </h1>
      <p className="max-w-60/100 text-sm leading-5 text-[#484848]">
        Come in and take a seat! To make it easy to find the chairs your home
        needs, we&apos;ve collected them here. Buy our chairs online, whether
        it&apos;s a striking armchair, a highchair with tray, a folding chair,
        an ergonomic office chair or even a table with 4 chairs. Discover IKEA
        chair collection!
      </p>
      <h2 className="mt-12 mb-4 text-2xl font-bold">
        A perfect match for any dining space, from cosy to grand
      </h2>
      <p className="mb-30 max-w-60/100 text-sm leading-5 text-[#484848]">
        Some meals are quick, some last for hours. Some days it`s just you,
        other days there`s an extra chair (or three). The NÄSINGE series is
        designed for all of it _ morning coffee, weeknight dinners, and long
        Sunday lunches that turn into evening chats. With extendable, foldable,
        and round tables, plus chairs that invite you to sit just a little
        longer, it`s a setup that adapts as easily as life does.
      </p>
      <div className="mt-15 flex gap-5 [&>div]:aspect-square [&>div]:w-full">
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/37ed6af7f6660156/original/PH204998.jpg?f=xl"
          props={[
            {
              side: "left",
              align: "center",
              className: "top-[14%] right-[9.9%]",
              name: "AKTERSPRING",
              summery: "Table lamp",
              price: "3,229",
              previousPrice: "3,799",
              id: "f23aGQ1dRaxcFyByrF0L",
            },
            {
              side: "bottom",
              align: "center",
              className: "top-[18%] left-[43%]",
              name: "FJÄRILSBUSKE",
              summery: "Plant pot",
              price: "1,444",
              previousPrice: "1,699",
              id: "FQYzdvxkrfQ4SruRnRQc",
            },
            {
              side: "top",
              align: "center",
              className: "top-[56.5%] left-[57%]",
              name: "NÄSINGE",
              summery: "Chair",
              price: "4,670",
              previousPrice: "5,495",
              id: "m8zbEmUKf96jBLIUxDFp",
              active: true,
            },
          ]}
        />
        <PopupInfo
          img="https://www.ikea.com/ext/ingkadam/m/4d072d3368c1fc95/original/PH205000.jpg?f=xl"
          props={[
            {
              side: "right",
              align: "center",
              className: "top-[38%] left-[25%]",
              name: "NÄSINGE",
              summery: "Chair",
              price: "4,670",
              previousPrice: "5,495",
              id: "m8zbEmUKf96jBLIUxDFp",
            },
            {
              side: "top",
              align: "center",
              className: "top-[70%] left-[55%]",
              name: "NÄSINGE",
              summery: "Extendable table",
              price: "16,995",
              previousPrice: "19,995",
              id: "bOT5yJA9byYyMgS1s1ee",
              active: true,
            },
            {
              side: "top",
              align: "end",
              className: "top-[71%] right-[12%]",
              name: "KALAS",
              summery: "Plate, mixed colours",
              price: "169",
              previousPrice: "199",
              id: "452GWpEeRcwghsFF0GUe",
            },
          ]}
        />
      </div>
      <h2 className="mt-20 border-b pb-6 text-2xl" id="products">
        Tables & chairs Products
      </h2>
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-10 overflow-hidden border-b border-[oklch(0.922_0_0)]">
        {visibleProducts.map((product) => (
          <ProductCardLarge product={product} key={product?.id} />
        ))}
      </div>
      <div className="mt-10 text-center text-xs font-semibold text-stone-500">
        <p>
          Showing {visibleProducts.length} of {products.length} results
        </p>
        <progress
          value={visibleProducts.length}
          max={products.length}
          className="progress mt-3 h-[2px] w-50 bg-stone-700"
        />
      </div>
      {visibleProducts.length === products.length || (
        <div className="mt-10 text-center">
          <Button
            variant={"border"}
            className="rounded-full px-15"
            onClick={() => setVisibleCount((prev) => prev + 16)}
          >
            Show more
          </Button>
        </div>
      )}
    </div>
  );
}

export default TablesChairs;
