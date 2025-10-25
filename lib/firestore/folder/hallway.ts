import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getHallway() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "c6GpaXLE7bbmj53G3pmC"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
