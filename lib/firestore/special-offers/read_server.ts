import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export async function getSpecialOffers() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`salePrice`, `>`, 0),
      orderBy("timestampCreate", "asc"),
      limit(14),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
