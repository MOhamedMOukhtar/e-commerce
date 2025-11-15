"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  getCommonProducts,
  getProduct,
} from "@/lib/firestore/products/read_server";
import { formatEGP } from "@/lib/helper/formatMoney";
import { TProduct } from "@/types/product/product";
import {
  ArrowRight,
  ChevronDownIcon,
  ChevronUpIcon,
  Heart,
  Minus,
  Plus,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type TProductEdit = Omit<TProduct, "featureImage"> & {
  featureImage: string;
};

function Product() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [product, setProduct] = useState<TProductEdit | null>(null);
  const [mainProduct, setMainProduct] = useState<TProductEdit | null>(null);
  const [commonProduct, setCommonProduct] = useState<TProductEdit[] | null>(
    null,
  );
  const [hoverProduct, setHoverProduct] = useState<TProductEdit | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [detMeas, setDetMeas] = useState<"details" | "measurements">("details");
  const [showGoodToKnow, setShowGoodToKnow] = useState(false);
  const [showMaterialsAndCare, setShowMaterialsAndCare] = useState(false);
  const [packagingShow, setPackagingShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const id = pathname.split("-").at(-1) ?? null;

  let productDetails = mainProduct?.details || "";
  const goodToKnow = mainProduct?.goodToKnow || "";
  let materialsAndCare = mainProduct?.materialsAndCare || "";
  let measurements = mainProduct?.measurements || "";
  let packaging = mainProduct?.packaging || "";

  useEffect(() => {
    if (product && !measurements) {
      setPackagingShow(true);
    }
    if (measurements === "<p></p>") {
      setPackagingShow(true);
    }
  }, [measurements, showInfo, product]);

  productDetails = productDetails.replace(
    /<p><strong>Designer<\/strong><\/p>/,
    '<p class="mb-0"><strong>Designer</strong></p>',
  );

  productDetails = productDetails.replace(
    /<p>Article number<\/p><p><strong>305.008.93<\/strong><\/p>/,
    '<p class="mb-1">Article number<\/p><p class="px-3 bg-black w-fit text-white"><strong>305.008.93<\/strong><\/p>',
  );
  productDetails = productDetails.replace(
    /<p>Article number<\/p><p>/,
    "<p class='mb-1'>Article number</p><p class='px-3 bg-black w-fit text-white'>",
  );

  materialsAndCare = materialsAndCare.replace(/h3/g, "h4");

  materialsAndCare = materialsAndCare.replace(
    /<p><strong>/g,
    "<p class='mt-7'><strong>",
  );

  materialsAndCare = materialsAndCare.replace(
    /<h4 style="text-align: left;">/g,
    '<h4 style="text-align: left;" class="mt-7">',
  );

  measurements = measurements.replace(/class="list-disc ml-3"/, "");
  measurements = measurements.replace(/<ul >/, '<ul class="space-y-[2px]">');

  packaging = packaging.replace(/h3/g, "h4");
  packaging = packaging.replace(
    /<\/li><\/ul><p>/g,
    "</li></ul><p class='mt-3'>",
  );
  packaging = packaging.replace(
    /<ul class="list-disc ml-3"><li>/g,
    "<ul class='mt-6'><li>",
  );
  packaging = packaging.replace(
    /<p>Article number<\/p><p>/g,
    "<p class='mt-6'>Article number</p><p class='bg-black w-fit text-white px-3 mb-2 '>",
  );

  // fetch product
  useEffect(() => {
    async function fetchProduct() {
      const product = (await getProduct({ id })) as TProductEdit;
      setProduct(product);
      setMainProduct(product);
      setActiveImage(product?.featureImage);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  // fetch common product
  useEffect(() => {
    async function fetchCommonProduct() {
      const products = (await getCommonProducts(
        product?.commonID || "",
      )) as TProductEdit[];
      setCommonProduct(products);
    }

    if (product?.commonID) {
      fetchCommonProduct();
    }

    if (commonProduct) {
      commonProduct.map((p) => {
        if (p.description) {
          setMainProduct(p);
        }
      });
    }
  }, [product, commonProduct]);

  // scroll to top when component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // disable scroll when showInfo is true
  useEffect(() => {
    const body = document.body;

    if (showInfo) {
      body.style.overflowY = "hidden";
      body.style.paddingRight = "15px";
    } else {
      body.style.overflowY = "auto";
      body.style.paddingRight = "0";
    }
  }, [showInfo]);

  // handle show buttons for image scroll
  useEffect(() => {
    if (!contentRef.current) return;
    const { current: content } = contentRef;

    const handleScroll = () => {
      setShowUp(content.scrollTop > 0);
      setShowDown(
        content.scrollTop < content.scrollHeight - content.clientHeight,
      );
    };
    handleScroll();
    content.addEventListener("scroll", handleScroll);
    return () => {
      content.removeEventListener("scroll", handleScroll);
    };
  }, [product]);

  // scroll images list
  function scrollImage(direction: "up" | "down") {
    if (!contentRef.current) return;
    const { current: content } = contentRef;
    const { clientHeight } = content;
    if (content && direction === "down") {
      content.scrollBy({
        top: clientHeight - 100,
        behavior: "smooth",
      });
    }
    if (content && direction === "up") {
      content.scrollBy({
        top: (clientHeight - 100) * -1,
        behavior: "smooth",
      });
    }
  }

  console.log(commonProduct);

  if (loading)
    return (
      <div className="relative mx-12 mt-6">
        <div className="mb-15 flex gap-12">
          <div className="flex max-w-6/10 flex-col gap-6">
            <div className="flex gap-12">
              <div className="flex w-fit flex-col gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-20 bg-stone-300" />
                ))}
              </div>
              <div>
                <Skeleton className="aspect-square w-160 bg-stone-300" />
              </div>
            </div>

            <div className="my-10 max-w-[85%]">
              <div className="space-y-2 border-b pb-12">
                <Skeleton className="h-6 w-9/10 bg-stone-300" />
                <Skeleton className="h-6 w-9/10 bg-stone-300" />
                <Skeleton className="h-6 w-6/10 bg-stone-300" />
              </div>
              <div className="border-b py-9">
                <Skeleton className="h-6 w-9/10 bg-stone-300" />
              </div>
              <div className="border-b py-9">
                <Skeleton className="h-6 w-9/10 bg-stone-300" />
              </div>
            </div>
          </div>
          {/* work here */}
          <div className="sticky top-24 h-fit flex-1 space-y-2 pt-6">
            <Skeleton className="h-4 w-2/10 bg-stone-300" />
            <Skeleton className="h-5 w-3/10 bg-stone-300" />
            <Skeleton className="h-4 w-1/2 bg-stone-300" />
            <Skeleton className="h-6 w-2/10 bg-stone-300" />
            <Skeleton className="h-3 w-2/10 bg-stone-300" />
            <div>
              <Skeleton className="mt-8 mb-2 h-4 w-2/10 bg-stone-300" />
              <div className="border p-4">
                <div className="flex gap-5 border-b pb-4">
                  <Skeleton className="h-fit text-stone-300">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      width="24"
                      height="24"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 4h15v3h3.0246l3.9793 5.6848V18h-2.6567c-.4218 1.3056-1.6473 2.25-3.0933 2.25-1.446 0-2.6715-.9444-3.0932-2.25h-3.9044c-.4217 1.3056-1.6472 2.25-3.0932 2.25S4.4916 19.3056 4.0698 18H1V4zm3.0698 12c.4218-1.3056 1.6473-2.25 3.0933-2.25 1.446 0 2.6715.9444 3.0932 2.25H14V6H3v10h1.0698zM16 14.0007a3.24 3.24 0 0 1 1.2539-.2507c1.446 0 2.6715.9444 3.0933 2.25h.6567v-2.6848L17.9833 9H16v5.0007zM7.163 15.75c-.6903 0-1.25.5596-1.25 1.25s.5597 1.25 1.25 1.25c.6904 0 1.25-.5596 1.25-1.25s-.5596-1.25-1.25-1.25zm10.0909 0c-.6904 0-1.25.5596-1.25 1.25s.5596 1.25 1.25 1.25 1.25-.5596 1.25-1.25-.5596-1.25-1.25-1.25z"
                      ></path>
                    </svg>
                  </Skeleton>
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-30 bg-stone-300" />
                    <div className="flex items-start gap-2">
                      <Skeleton className="mt-1.5 bg-stone-300 p-1.5" />
                      <div className="flex flex-col">
                        <Skeleton className="mt-1.5 h-3 w-30 bg-stone-300" />
                        <Skeleton className="mt-1.5 h-3 w-50 bg-stone-300" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 pt-4">
                  <Skeleton className="h-fit text-stone-300">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      width="24"
                      height="24"
                      aria-hidden="true"
                      className="pip-svg-icon pip-section__icon"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 4v16h20V4H2zm2 4V6h16v2H4zm0 2v8h3v-6h10v6h3v-8H4zm11 4h-2v4h2v-4zm-4 0H9v4h2v-4z"
                      ></path>
                    </svg>
                  </Skeleton>
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-30 bg-stone-300" />
                    <div className="flex items-start gap-2 font-semibold text-black/60">
                      <Skeleton className="mt-1.5 bg-stone-300 p-1.5" />
                      <Skeleton className="mt-1.5 h-3 w-30 bg-stone-300" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm font-bold">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-30 rounded-full bg-stone-300" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-14 w-full rounded-full bg-stone-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (product)
    return (
      <div className="relative mx-12 mt-6">
        <div className="mb-15 flex gap-12">
          <div className="flex max-w-6/10 flex-col gap-6">
            <div className="flex gap-12">
              <div
                className="relative"
                onMouseEnter={() => setShowArrow(true)}
                onMouseLeave={() => setShowArrow(false)}
              >
                {showUp && (
                  <button
                    className={`absolute -top-4 right-1/2 translate-x-1/2 cursor-pointer rounded-full bg-black p-1.5 transition duration-200 hover:bg-stone-800 ${showArrow ? "opacity-100" : "opacity-0"}`}
                    onClick={() => scrollImage("up")}
                  >
                    <ChevronUpIcon className="h-5 w-5" color="white" />
                  </button>
                )}

                <div className="h-160 overflow-y-hidden" ref={contentRef}>
                  <ul className="flex w-fit flex-col gap-4">
                    <li
                      className="cursor-pointer border hover:border-black/50"
                      onMouseEnter={() => setActiveImage(product?.featureImage)}
                    >
                      <Image
                        src={
                          typeof product?.featureImage === "string"
                            ? product.featureImage
                            : "/ikean.png"
                        }
                        width={80}
                        height={80}
                        alt={product?.title || "Product"}
                      />
                    </li>
                    {product?.imageList?.map((image, index) => (
                      <li
                        className="cursor-pointer border hover:border-black/50"
                        onMouseEnter={() => setActiveImage(image)}
                        key={index}
                      >
                        <Image
                          src={typeof image === "string" ? image : "/ikean.png"}
                          width={80}
                          height={80}
                          alt={product?.title || "Product"}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {showDown && (
                  <button
                    onClick={() => scrollImage("down")}
                    className={`absolute right-1/2 -bottom-4 translate-x-1/2 cursor-pointer rounded-full bg-black p-1.5 transition duration-200 hover:bg-stone-800 ${showArrow ? "opacity-100" : "opacity-0"}`}
                  >
                    <ChevronDownIcon className="h-5 w-5" color="white" />
                  </button>
                )}
              </div>
              <div>
                <Image
                  src={hoverProduct?.featureImage || activeImage}
                  width={1000}
                  height={1000}
                  alt="featureImage"
                  className="aspect-square w-160"
                />
              </div>
            </div>
            <div className="my-10 max-w-[85%] text-xl blur-[0.3px]">
              <div className="border-b pb-12 text-black/70">
                {mainProduct?.description}
              </div>
              <div
                className="relative cursor-pointer border-b py-9 text-2xl font-bold hover:underline"
                onClick={() => {
                  setShowInfo(true);
                  setDetMeas("details");
                }}
              >
                Product details
                <span className="absolute top-1/2 right-0 translate-y-[-50%]">
                  <ArrowRight size={30} />
                </span>
              </div>
              <div
                className="relative cursor-pointer border-b py-9 text-2xl font-bold hover:underline"
                onClick={() => {
                  setShowInfo(true);
                  setDetMeas("measurements");
                }}
              >
                Measurements
                <span className="absolute top-1/2 right-0 translate-y-[-50%]">
                  <ArrowRight size={30} />
                </span>
              </div>
            </div>
          </div>
          <div className="sticky top-24 h-fit flex-1 pt-6">
            {product?.salePrice && (
              <span className="absolute top-0 font-bold text-red-700">
                Special offers
              </span>
            )}
            <div className="relative">
              <div className="font-bold">{product?.title}</div>
              <Heart className="absolute right-0 bottom-0 box-content cursor-pointer rounded-full p-2 hover:bg-gray-200" />
            </div>
            <div>{product?.summary}</div>
            <div
              className={`py-2 text-3xl font-bold ${product.highlight ? "mt-2 w-fit bg-amber-300 px-3 py-1 shadow-[2px_2px_0_#cc0008] before:left-1" : ""}`}
            >
              <span className="inline-block -translate-y-3 transform text-xs font-bold">
                EGP
              </span>
              {product && product.salePrice
                ? formatEGP(product.salePrice)
                : formatEGP(product?.price ?? 0)}
            </div>
            {product?.salePrice && (
              <div className="border-b pb-7 text-xs font-semibold text-black/50">
                Previous price: EGP {formatEGP(product?.price ?? 0)}
              </div>
            )}
            {commonProduct && (
              <>
                <div className="mt-6 mb-3 font-semibold">Choose colour</div>
                <div className="mb-1">
                  {hoverProduct ? hoverProduct.color : product.color}
                </div>
              </>
            )}
            <div className="flex gap-1">
              {commonProduct &&
                commonProduct.map((p) => {
                  console.log(p);
                  return (
                    <div
                      key={p.id}
                      className={`cursor-pointer rounded border-2 p-1 ${p.id === product.id ? "border-black/50" : "border-transparent hover:border-black/20"}`}
                      onMouseEnter={() => {
                        if (p.id === product.id) return;
                        setHoverProduct(p);
                      }}
                      onMouseLeave={() => setHoverProduct(null)}
                      onClick={() => {
                        setProduct(p);
                        setActiveImage(p.featureImage);
                      }}
                    >
                      <Image
                        src={
                          typeof p.featureImage === "string"
                            ? p.featureImage
                            : "ikean-logo.png"
                        }
                        width={40}
                        height={40}
                        alt="icon"
                      />
                    </div>
                  );
                })}
            </div>

            <div>
              <span className="mt-6 mb-2 inline-block text-sm font-bold">
                How to get it
              </span>
              <div className="rounded-lg border p-4 text-sm">
                <div className="flex gap-5 border-b pb-4">
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 4h15v3h3.0246l3.9793 5.6848V18h-2.6567c-.4218 1.3056-1.6473 2.25-3.0933 2.25-1.446 0-2.6715-.9444-3.0932-2.25h-3.9044c-.4217 1.3056-1.6472 2.25-3.0932 2.25S4.4916 19.3056 4.0698 18H1V4zm3.0698 12c.4218-1.3056 1.6473-2.25 3.0933-2.25 1.446 0 2.6715.9444 3.0932 2.25H14V6H3v10h1.0698zM16 14.0007a3.24 3.24 0 0 1 1.2539-.2507c1.446 0 2.6715.9444 3.0933 2.25h.6567v-2.6848L17.9833 9H16v5.0007zM7.163 15.75c-.6903 0-1.25.5596-1.25 1.25s.5597 1.25 1.25 1.25c.6904 0 1.25-.5596 1.25-1.25s-.5596-1.25-1.25-1.25zm10.0909 0c-.6904 0-1.25.5596-1.25 1.25s.5596 1.25 1.25 1.25 1.25-.5596 1.25-1.25-.5596-1.25-1.25-1.25z"
                    ></path>
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-bold">Delivery</span>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block rounded-full bg-green-700 p-1.5"></span>
                      <div className="flex flex-col font-semibold text-black/60">
                        <span>Available</span>
                        <span>Find all options at checkout</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 pt-4">
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    width="24"
                    height="24"
                    aria-hidden="true"
                    className="pip-svg-icon pip-section__icon"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 4v16h20V4H2zm2 4V6h16v2H4zm0 2v8h3v-6h10v6h3v-8H4zm11 4h-2v4h2v-4zm-4 0H9v4h2v-4z"
                    ></path>
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-bold"> IKEA Cairo Festival City</span>
                    <div className="flex items-start gap-2 font-semibold text-black/60">
                      <span className="mt-1.5 inline-block rounded-full bg-green-700 p-1.5"></span>
                      <span>Store — In stock</span>
                    </div>
                  </div>
                </div>
              </div>

              {/*Action */}
              <div className="mt-8 flex items-center gap-3 text-sm font-bold">
                <div className="flex items-center gap-4 rounded-full border p-2">
                  <button className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
                    <Minus size={20} />
                  </button>
                  <span className="inline-block">1</span>
                  <button className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex-1">
                  <button className="w-full cursor-pointer rounded-full bg-[#0059a7] p-4 text-white hover:bg-[#004f93]">
                    Add to bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Info side panel */}
        <div
          className={`fixed top-0 left-0 z-100 h-screen w-screen bg-black/30 transition duration-200 ${showInfo ? "" : "pointer-events-none"}`}
          style={{
            opacity: showInfo ? "1" : "0",
          }}
          onClick={() => {
            setShowInfo(false);
            setShowGoodToKnow(false);
            setShowMaterialsAndCare(false);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed top-0 right-0 h-screen w-1/3 overflow-y-auto rounded-l-lg border border-black/30 bg-white p-8 pt-24 pb-12 transition duration-200 [scrollbar-gutter:stable] ${showInfo ? "translate-x-0" : "translate-x-full"}`}
          >
            <button
              onClick={() => {
                setShowInfo(false);
                setShowGoodToKnow(false);
                setShowMaterialsAndCare(false);
              }}
              className={`absolute top-5 right-5 cursor-pointer`}
            >
              <X />
            </button>
            {detMeas === "details" ? (
              <div className="text-stone-700">
                <div>
                  <h2 className="pb-6 text-[21px]">Product details</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: productDetails || "" }}
                    className="space-y-5 border-b pb-10 text-sm"
                  />
                </div>
                {goodToKnow !== "<p></p>" && goodToKnow !== "" && (
                  <div className="border-b">
                    <div
                      className="relative cursor-pointer overflow-hidden py-8 hover:underline"
                      onClick={() => setShowGoodToKnow(!showGoodToKnow)}
                    >
                      <h2 className="text-[15px] font-bold">Good to know</h2>
                      <button className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer">
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          size={20}
                          className={`${showGoodToKnow ? "rotate-180" : ""} transition duration-200`}
                        />
                      </button>
                    </div>
                    <div
                      className={`overflow-hidden text-sm transition-all duration-200 ${
                        showGoodToKnow ? "max-h-96 pt-2 pb-10" : "max-h-0 pt-2"
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: goodToKnow || "" }}
                        className="space-y-5"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div
                    className="relative cursor-pointer overflow-hidden py-8 hover:underline"
                    onClick={() =>
                      setShowMaterialsAndCare(!showMaterialsAndCare)
                    }
                  >
                    <h2 className="text-[15px] font-bold">
                      Materials and care
                    </h2>
                    <button className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer">
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        size={20}
                        className={`${showMaterialsAndCare ? "rotate-180" : ""} transition duration-200`}
                      />
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden text-sm transition-all duration-200 ${
                      showMaterialsAndCare ? "pt-2 pb-10" : "max-h-0 pt-2"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: materialsAndCare || "",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-stone-700">
                <div>
                  <h2 className="pb-6 text-[21px]">Measurements</h2>
                  {measurements && measurements !== "<p></p>" && (
                    <>
                      <div
                        dangerouslySetInnerHTML={{ __html: measurements || "" }}
                        className="space-y-5 text-sm"
                      />
                      <Image
                        src={
                          typeof mainProduct?.measurementImage === "string"
                            ? mainProduct?.measurementImage
                            : "/ikean.png"
                        }
                        width={400}
                        height={400}
                        alt={product?.title || "Product"}
                        className="border-b pb-10"
                      />
                    </>
                  )}
                </div>
                <div>
                  <div
                    className="relative cursor-pointer overflow-hidden py-8 hover:underline"
                    onClick={() => setPackagingShow(!packagingShow)}
                  >
                    <h2 className="text-[15px] font-bold">Packaging</h2>
                    <button className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer">
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        size={20}
                        className={`${packagingShow ? "rotate-180" : ""} transition duration-200`}
                      />
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden text-sm transition-all duration-200 ${
                      packagingShow ? "max-h-fit pt-2 pb-10" : "max-h-0 pt-2"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: packaging || "" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Product;
