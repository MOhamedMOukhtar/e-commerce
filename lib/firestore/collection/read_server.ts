import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getCollection(id: string) {
  const data = await getDoc(doc(db, `collections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}

export async function getCollections() {
  const list = await getDocs(collection(db, "collections"));
  return list.docs.map((doc) => doc.data());
}
