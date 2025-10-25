import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getGamingFurniture() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "Q1TXfxkxUpYeYdmhDhxm"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
