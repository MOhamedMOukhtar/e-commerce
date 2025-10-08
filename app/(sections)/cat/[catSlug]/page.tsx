"use client";

import { useParams } from "next/navigation";

import SpecialOffers from "../components/SpecialOffers";
import FurnitureOnOffer from "../components/FurnitureOnOffer";
import AccessoriesOnOffer from "../components/AccessoriesOnOffer";
import TablesChairs from "../components/TablesChairs";
import TablesChairsOnOffers from "../components/TablesChairsOnOffers";
import Textiles from "../components/Textiles";
import TextilesOnOffers from "../components/TextilesOnOffers";
import OutdoorProducts from "../components/OutdoorProducts";
import OutdoorProductsOnOffers from "../components/OutdoorProductsOnOffers";
import Decoration from "../components/Decoration";
import DecorationOnOffers from "../components/DecorationOnOffers";
import BookcasesShelvingUnits from "../components/BookcasesShelvingUnits";
import BookcasesShelvingUnitsOnOffers from "../components/BookcasesShelvingUnitsOnOffers";
import BabyChildren from "../components/BabyChildren";
import BabyChildrenOnOffers from "../components/BabyChildrenOnOffers";
import KitchenwareTableware from "../components/KitchenwareTableware";
import KitchenwareTablewareOnOffers from "../components/KitchenwareTablewareOnOffers";
import SofasArmchairs from "../components/SofasArmchairs";
import SofasArmchairsOnOffers from "../components/SofasArmchairsOnOffers";
import Under2000 from "../components/Under2000";
import StorageOrganisation from "../components/StorageOrganisation";

function Page() {
  const params = useParams();
  const slug = params.catSlug;

  if (slug === "lower-price") return <SpecialOffers />;
  if (slug === "furniture-on-offer") return <FurnitureOnOffer />;
  if (slug === "accessories-on-offer") return <AccessoriesOnOffer />;
  if (slug === "tables-chairs") return <TablesChairs />;
  if (slug === "tables-and-chairs-on-offer") return <TablesChairsOnOffers />;
  if (slug === "textiles") return <Textiles />;
  if (slug === "textiles-on-offer") return <TextilesOnOffers />;
  if (slug === "outdoor-products") return <OutdoorProducts />;
  if (slug === "outdoor-products-on-offer") return <OutdoorProductsOnOffers />;
  if (slug === "decoration") return <Decoration />;
  if (slug === "decoration-on-offer") return <DecorationOnOffers />;
  if (slug === "bookcases-shelving-units") return <BookcasesShelvingUnits />;
  if (slug === "bookcases-and-shelving-units-on-offer")
    return <BookcasesShelvingUnitsOnOffers />;
  if (slug === "baby-children") return <BabyChildren />;
  if (slug === "baby-and-children-on-offer") return <BabyChildrenOnOffers />;
  if (slug === "kitchenware-tableware") return <KitchenwareTableware />;
  if (slug === "kitchenware-and-tableware-on-offer")
    return <KitchenwareTablewareOnOffers />;
  if (slug === "sofas-armchairs") return <SofasArmchairs />;
  if (slug === "sofas-and-armchairs-on-offer")
    return <SofasArmchairsOnOffers />;
  if (slug === "under-2000-egp-on-offer") return <Under2000 />;
  if (slug === "storage-organisation") return <StorageOrganisation />;
}

export default Page;

//Tables & chairs
