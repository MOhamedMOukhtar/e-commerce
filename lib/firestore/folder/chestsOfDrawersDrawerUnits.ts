import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getChestsOfDrawersDrawerUnits() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "aMVSiFWLnwLUH5pcHNSX"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
