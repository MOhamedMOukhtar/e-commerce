import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export async function getSpecialOffers() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`salePrice`, `>`, 0),
      orderBy("timestampCreate", "asc"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
