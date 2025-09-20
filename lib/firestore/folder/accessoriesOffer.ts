import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export async function getAccessoriesOffers() {
  // Get collection that contains the product IDs
  const list = await getDocs(
    query(
      collection(db, "collections"),
      where("title", "==", "Accessories in offer"),
    ),
  );

  // Grab all product IDs from the first (or multiple) collections
  const productIds: string[] = list.docs.flatMap(
    (docSnap) => docSnap.data().products || [],
  );

  // Fetch each product document by ID
  const productPromises = productIds.map(async (id) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    return productSnap.exists()
      ? { id: productSnap.id, ...productSnap.data() }
      : null;
  });

  // Resolve all
  const products = await Promise.all(productPromises);

  // Filter out nulls if any product was missing
  return products.filter(Boolean);
}
