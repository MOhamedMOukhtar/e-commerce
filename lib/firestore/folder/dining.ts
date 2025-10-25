import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getDining() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "IqOcO54cFPY2Uk6KfoDI"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
