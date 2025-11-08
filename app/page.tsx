import ProductSpecialOffers from "./components/ProductSpecialOffers";
import SeclectOffers from "./components/SeclectOffers";
import SectionSpecialOffers from "./components/SectionSpecialOffers";
import WorkOffers from "./components/WorkOffers";
import FurnitureAccessorise from "./components/FurnitureAccessorise";
import RecommendedAccessoriesFurniture from "./components/RecommendedAccessoriesFurniture";
import DifferentStudyTypes from "./components/DifferentStudyTypes";
import LowestPrices from "./components/LowestPrices";
import ShopByPrice from "./components/ShopByPrice";
import NowInIkean from "./components/NowInIkean";
import DiscoverNewProducts from "./components/DiscoverNewProducts";
import ShopByRooms from "./components/ShopByRooms";
import PAXsystem from "./components/PAXsystem";
import ExperienceIKEAN from "./components/ExperienceIKEAN";
import IKEANFood from "./components/IKEANFood";
import Test from "./components/Test";

export default function Home() {
  // return <Test />;
  return (
    <main>
      <div className="mt-15 px-10">
        <h1 className="text-4xl font-bold">Welcome to IKEA Egypt</h1>
      </div>
      <div className="mt-25 px-12">
        <SectionSpecialOffers />
        <SeclectOffers />
        <ProductSpecialOffers />
        <WorkOffers />
        <FurnitureAccessorise />
        <RecommendedAccessoriesFurniture />
        <DifferentStudyTypes />
        <LowestPrices />
        <ShopByPrice />
        <NowInIkean />
        <DiscoverNewProducts />
        <ShopByRooms />
        <PAXsystem />
        <ExperienceIKEAN />
        <IKEANFood />
        <div className="mb-15 max-w-6/10 space-y-5 text-sm text-black/70 [&>p>span]:cursor-pointer [&>p>span]:underline">
          <p>
            Welcome to IKEA Egypt! Find the <span>best deals</span> on{" "}
            <span> furniture products</span>, <span>lighting</span> and{" "}
            <span>home decoration!</span> Choose from our range of cosy{" "}
            <span>living room furniture</span> and comfortable{" "}
            <span>dining room furniture.</span> Start browsing now and
            you&apos;re sure to find something you&apos;ll love!
          </p>
          <p>
            Kick off this school year organized and in style with IKEA`s
            must-have Back to School furniture and accessories. Check out the{" "}
            <span>IKEAN Family Back to School Offers</span> online and enjoy
            great savings.
          </p>
        </div>
      </div>
    </main>
  );
}

// 0058A3
// 004F93 (hover)
