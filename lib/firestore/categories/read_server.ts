import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getCategory(id: string) {
  const data = await getDoc(doc(db, `categories/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}
