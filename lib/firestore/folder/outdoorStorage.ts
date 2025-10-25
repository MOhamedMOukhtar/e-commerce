import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getOutdoorStorage() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "A19HRuPcHtCk1XeWzH7h"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
