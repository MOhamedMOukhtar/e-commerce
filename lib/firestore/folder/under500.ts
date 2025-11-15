import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getUnder500() {
  const list = await getDocs(
    query(collection(db, "products"), where(`price`, `<=`, 500)),
  );
  return list.docs.map((doc) => doc.data());
}
