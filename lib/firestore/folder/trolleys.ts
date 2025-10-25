import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getTrolleys() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "Qs0mTsBp0NpBGA3Igo8X"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
