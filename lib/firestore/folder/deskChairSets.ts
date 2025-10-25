import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getDeskChairSets() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "dq625ffok5PYwZCPantg"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
