import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getGardenBalcony() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "FWua7EAx0Dw7ikVMe5df"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
