import Image from "next/image";

function Page() {
  return (
    <div className="mx-12 my-20 space-y-5">
      <h1 className="mb-4 text-4xl">Return policy</h1>
      <div className="mt-14">
        <Image
          src={
            "https://www.ikea.com/images/return-policy-07ffc9336a0adfed384182a67004e280.jpg?f=m"
          }
          width={1000}
          height={1000}
          alt="asd"
          className="w-1/2"
        />
      </div>
      <div className="mt-8 w-1/2 space-y-3 text-sm text-[#484848]">
        <p>
          For an exchange or refund, you can return your products within 90
          days, Simply return the unopened items and please return them with
          proof of purchase.
        </p>
        <p>
          If the returns criteria are not met fully, we may refuse the return.
        </p>
        <p>
          This policy is in addition to your statutory rights and IKEAN
          commercial guarantees.
        </p>
      </div>
      <div className="mt-15 w-6/10">
        <p className="mb-3 text-lg font-bold">What you will need</p>
        <p className="text-sm text-[#484848]">
          Your receipt and the item`s original packaging are required for all
          returns and exchanges. We issue refunds through the same method of
          payment as the original payment (e.g. credit card purchases will be
          credited to the original credit card account).
        </p>
      </div>
      <div className="mt-15 w-6/10">
        <p className="mb-3 text-lg font-bold">
          Purchases that are not refundable
        </p>
        <ul className="ms-8 mt-6 list-disc space-y-3 text-sm text-[#484848]">
          <li>
            Used bedding (i.e. bed linens, duvets, pillows and pillow-tops)
          </li>
          <li>
            Any mattress or stuffed and upholstered products without a law label
          </li>
          <li>Cut metre fabrics</li>
          <li>Natural plants</li>
          <li>Assembled / disassembled items</li>
          <li>Open sofas</li>
          <li>Food items</li>
          <li>Made-to-measure items (i.e. custom countertops)</li>
          <li>Products that have been modified, altered or washed</li>
          <li>AS-IS products</li>
          <li>IKEAN gift cards</li>
          <li>
            At any time, IKEAN reserves the right to refuse a return or
            exchange, and we may ask for picture identification. Please visit
            your local <span className="underline">IKEAN store</span> or{" "}
            <span className="underline">contact us</span> for more details.
          </li>
        </ul>
      </div>
      <div className="mt-15 w-6/10 space-y-3">
        <p className="mb-3 text-lg font-bold">
          Online shopping Returns & refund
        </p>
        <p className="text-sm text-[#484848]">
          If you are not entirely satisfied with your purchase, simply return
          the unopened item within 90 days with your receipt in-store. We will
          refund the price you paid for the goods and credit the refund amount
          to your credit/account that you made payment with.
        </p>
        <p className="text-sm text-[#484848]">
          We will not refund any delivery and assembly costs you have paid in
          case you requested to return goods already delivered to your home. And
          based on our evaluation of item condition we will refund the product
          value.
        </p>
        <p className="text-sm text-[#484848]">
          At any time, IKEAN reserves the right to refuse a return or exchange,
          and we may ask for picture identification. Please visit your local{" "}
          <span className="underline">IKEAN store</span> or{" "}
          <span className="underline">contact us</span> for more details.
        </p>
      </div>
    </div>
  );
}

export default Page;
