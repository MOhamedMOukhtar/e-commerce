import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getToyStorage() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "4mCsnH2LYZHX3RkwrhCA"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
