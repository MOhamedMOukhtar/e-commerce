import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getChildrensRooms() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "3PzG1uqngJl7IM7f3qMT"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
