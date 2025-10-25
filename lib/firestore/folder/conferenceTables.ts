import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getConferenceTables() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "yMco7wwvmhLBxBfaxxfR"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
