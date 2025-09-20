import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getFurnitureOffers() {
  const list = await getDocs(
    query(
      collection(db, "collections"),
      where(`title`, `==`, "Furniture in offer"),
    ),
  );

  const productIds: string[] = list.docs.flatMap(
    (docSnap) => docSnap.data().products || [],
  );

  const productPromises = productIds.map(async (id) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    return productSnap.exists()
      ? { id: productSnap.id, ...productSnap.data() }
      : null;
  });

  const products = await Promise.all(productPromises);

  // Filter out nulls if any product was missing
  return products.filter(Boolean);
}
