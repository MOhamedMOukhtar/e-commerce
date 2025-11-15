import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getLivingRooms() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "usDAKRYwrq6JduJXPmbz"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
