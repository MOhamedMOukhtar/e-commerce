import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getConferenceChairs() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "s73OiEK3YKccd7K8unrU"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
