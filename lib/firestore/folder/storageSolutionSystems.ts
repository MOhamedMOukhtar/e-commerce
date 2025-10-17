import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getStorageSolutionSystems() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "onLXfLCpdS7bWTRvWfMC"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
