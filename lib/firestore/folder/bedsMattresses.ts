import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getBedsMattresses() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "xKunpDLR73dNYEMln0ca"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
