import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getBathrooms() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "317H68U36iOAOEDoVDeE"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
