import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getBrand(id: string) {
  const data = await getDoc(doc(db, `brands/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}
