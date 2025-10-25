import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getConferenceTableChairSets() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "PYBxae9GmTGiRGQVgOGt"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
