"use client";

import { useParams } from "next/navigation";
import Bathroom from "../components/Bathroom";
import Bedroom from "../components/Bedroom";
import ChildrensRoom from "../components/ChildrensRoom";
import Dining from "../components/Dining";
import Hallway from "../components/Hallway";

function Page() {
  const params = useParams();
  const slug = params.roomsSlug;

  if (slug === "bathroom") return <Bathroom />;
  if (slug === "bedroom") return <Bedroom />;
  if (slug === "childrens-room") return <ChildrensRoom />;
  if (slug === "dining") return <Dining />;
  if (slug === "hallway") return <Hallway />;
}

export default Page;
