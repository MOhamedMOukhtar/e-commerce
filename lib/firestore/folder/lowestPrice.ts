import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getLowestPrice() {
  const list = await getDocs(
    query(collection(db, "products"), where(`price`, `<`, 3000)),
  );
  return list.docs.map((doc) => doc.data());
}
