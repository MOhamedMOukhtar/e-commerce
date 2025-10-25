import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getTrendingSeason() {
  const list = await getDocs(
    query(collection(db, "products"), where(`trending`, `==`, "true")),
  );
  return list.docs.map((doc) => doc.data());
}
