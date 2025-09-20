import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getRecommended() {
  const list = await getDocs(
    query(collection(db, "products"), where(`recommended`, `==`, "true")),
  );
  return list.docs.map((doc) => doc.data());
}

// Furniture in offer
