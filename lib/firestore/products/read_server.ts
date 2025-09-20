import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getProduct({ id }: { id: string | null }) {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}

export async function getFeaturedProducts() {
  const list = await getDocs(
    query(collection(db, "products"), where(`isFeatured`, `==`, "true")),
  );
  return list.docs.map((doc) => doc.data());
}

export async function getProducts() {
  const list = await getDocs(collection(db, "products"));
  return list.docs.map((doc) => doc.data());
}
