import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getUnder2000() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where("salePrice", ">", 0),
      where("salePrice", "<", 2000),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
