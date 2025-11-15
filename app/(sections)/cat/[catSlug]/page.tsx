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
import StorageOrganisation from "../storage-organisation/page";
import StorageSolutionSystems from "../components/StorageSolutionSystems";
import CabinetsCupboards from "../components/CabinetsCupboards";
import TvMediaFurniture from "../components/TvMediaFurniture";
import ChestsOfDrawersDrawerUnits from "../components/ChestsOfDrawersDrawerUnits";
import Wardrobes from "../components/Wardrobes";
import GarageStorage from "../components/GarageStorage";
import SideboardsBuffetsConsoleTables from "../components/SideboardsBuffetsConsoleTables";
import OutdoorStorage from "../components/OutdoorStorage";
import Trolleys from "../components/Trolleys";
import RoomDividres from "../components/RoomDividres";
import HallwayFurnitureSets from "../components/HallwayFurnitureSets";
import ToyStorage from "../components/ToyStorage";
import StorageUnitsCabinets from "../components/StorageUnitsCabinets";
import ShoeCabinets from "../components/ShoeCabinets";
import DesksComputerDesks from "../components/DesksComputerDesks";
import DeskChairs from "../components/DeskChairs";
import GamingFurniture from "../components/GamingFurniture";
import BekantConferenceMeetingTables from "../components/BekantConferenceMeetingTables";
import ConferenceTableChairSets from "../components/ConferenceTableChairSets";
import DeskChairSets from "../components/DeskChairSets";
import ConferenceChairs from "../components/ConferenceChairs";
import BedsMattresses from "../components/BedsMattresses";
import Lighting from "../components/Lighting";
import LaundryCleaning from "../components/LaundryCleaning";
import BathroomProducts from "../components/BathroomProducts";
import SmallStorageOrganisers from "../components/SmallStorageOrganisers";
import AffordableEssentials from "../components/AffordableEssentials";
import LowestPrice from "../components/LowestPrice";
import LimitedEditions from "../components/LimitedEditions";
import ValueForMoney from "../components/ValueForMoney";
import TrendingSeason from "../components/TrendingSeason";
import Under500 from "../components/Under500";
import FlexibleRockingChair from "../components/FlexibleRockingChair";
import WingChair from "../components/WingChair";

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
  if (slug === "storage-solution-systems") return <StorageSolutionSystems />;
  if (slug === "cabinets-cupboards") return <CabinetsCupboards />;
  if (slug === "tv-media-furniture") return <TvMediaFurniture />;
  if (slug === "chests-of-drawers-drawer-units")
    return <ChestsOfDrawersDrawerUnits />;
  if (slug === "wardrobes") return <Wardrobes />;
  if (slug === "garage-storage") return <GarageStorage />;
  if (slug === "sideboards-buffets-console-tables")
    return <SideboardsBuffetsConsoleTables />;
  if (slug === "outdoor-storage") return <OutdoorStorage />;
  if (slug === "trolleys") return <Trolleys />;
  if (slug === "room-dividers") return <RoomDividres />;
  if (slug === "hallway-furniture-sets") return <HallwayFurnitureSets />;
  if (slug === "toy-storage") return <ToyStorage />;
  if (slug === "storage-units-cabinets") return <StorageUnitsCabinets />;
  if (slug === "shoe-cabinets") return <ShoeCabinets />;
  if (slug === "desks-computer-desks") return <DesksComputerDesks />;
  if (slug === "desk-chairs") return <DeskChairs />;
  if (slug === "gaming-furniture") return <GamingFurniture />;
  if (slug === "bekant-conference-meeting-tables")
    return <BekantConferenceMeetingTables />;
  if (slug === "conference-table-chair-sets")
    return <ConferenceTableChairSets />;
  if (slug === "desk-chair-sets") return <DeskChairSets />;
  if (slug === "conference-chairs") return <ConferenceChairs />;
  if (slug === "beds-mattresses") return <BedsMattresses />;
  if (slug === "lighting") return <Lighting />;
  if (slug === "laundry-cleaning") return <LaundryCleaning />;
  if (slug === "bathroom-products") return <BathroomProducts />;
  if (slug === "small-storage-organisers") return <SmallStorageOrganisers />;
  if (slug === "affordable-essentials") return <AffordableEssentials />;
  if (slug === "lowest-price") return <LowestPrice />;
  if (slug === "limited-editions") return <LimitedEditions />;
  if (slug === "value-for-money") return <ValueForMoney />;
  if (slug === "trending-season") return <TrendingSeason />;
  if (slug === "under-500") return <Under500 />;
  if (slug === "rocking-chairs") return <FlexibleRockingChair />;
  if (slug === "wing-chair") return <WingChair />;
}

export default Page;

//Tables & chairs
