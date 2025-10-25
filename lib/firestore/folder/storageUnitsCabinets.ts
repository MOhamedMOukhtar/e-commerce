import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getStorageUnitsCabinets() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "jE0wlqQgodFqGGN7OTNI"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
