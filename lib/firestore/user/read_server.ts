import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUser({ id }: { id: string | null }) {
  const data = await getDoc(doc(db, `users/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}
