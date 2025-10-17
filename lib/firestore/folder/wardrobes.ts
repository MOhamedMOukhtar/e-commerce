import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getWardrobes() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "O2z3igZAejXYdZKs2gxV"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
