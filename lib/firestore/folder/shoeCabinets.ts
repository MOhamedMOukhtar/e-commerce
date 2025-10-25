import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getShoeCabinets() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "1z2kJ0izbZyYkTmi5Cx5"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
