import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getBedhrooms() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "J2XoHhirJOMYOsSDESkb"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
