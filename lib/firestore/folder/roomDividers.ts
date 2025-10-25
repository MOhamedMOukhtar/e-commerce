import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getRoomDividers() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "oom7KKipQje3s3HLARkp"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
