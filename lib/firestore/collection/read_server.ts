import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getCollection(id: string) {
  const data = await getDoc(doc(db, `collections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}
