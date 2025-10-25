import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getDeskChairs() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "dhbMlzq7SuDnKqzd6coT"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
