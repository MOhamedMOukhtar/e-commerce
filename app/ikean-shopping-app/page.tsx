import { Button } from "@/components/ui/button";
import Image from "next/image";

function Page() {
  return (
    <div className="m-12">
      <h1 className="mb-12 text-4xl">IKEAN shopping app</h1>
      <div className="flex gap-8">
        <div className="w-1/3">
          <p className="text-xl font-bold text-black/70">
            Your pocket-sized shopping buddy
          </p>
          <p className="text-sm text-black/70">
            Whether you&apos;re at the IKEA store, at home or on the go, IKEA
            shopping app is your best shopping companion that ensures you a
            unique shopping experience. Enjoy great benefits that help you right
            from planning your shopping until receiving your orders at your
            doorstep.
          </p>
          <ul className="mt-3 ml-8 list-disc space-y-3 text-sm text-black/70">
            <li>
              Shop online wherever you are and get your orders delivered at your
              doorstep
            </li>
            <li>
              Get up-to-date product details _ including prices, availability
              and in-store location
            </li>
            <li>
              Know your local store _ opening hours, contact details,
              directions, floor plans and more
            </li>
            <li>Be first to hear about special offers and in-store events</li>
            <li>
              Keep your shopping lists to hand and share between the app and
              IKEA.eg
            </li>
          </ul>
          <p className="mt-12 text-xl font-bold text-black/70">
            How do I get the IKEA shopping app?
          </p>
          <p className="text-sm text-black/70">
            Download free IKEA Store app via{" "}
            <span className="cursor-pointer underline"> App Store (iOS)</span>{" "}
            or{" "}
            <span className="cursor-pointer underline">
              Google Play (Android)
            </span>
          </p>
          <div className="mt-8 flex flex-col items-start gap-6">
            <Button className="rounded-full">App Store (iOS)</Button>
            <Button className="rounded-full">Google Play (Android)</Button>
          </div>
        </div>
        <div>
          <Image
            src={
              "https://www.ikea.com/images/ikea-shopping-app-38287cc2c7edde2bc229cc70e8253e62.jpg?f=l"
            }
            width={500}
            height={500}
            alt="app"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
