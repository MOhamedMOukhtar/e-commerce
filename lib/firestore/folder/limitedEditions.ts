import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getLimitedEditions() {
  const list = await getDocs(
    query(collection(db, "products"), where(`stock`, `<=`, 4)),
  );
  return list.docs.map((doc) => doc.data());
}
