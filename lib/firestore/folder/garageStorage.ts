import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getGarageStorage() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "nA3flaSu1X64cRCwciI6"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
