import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getOutdoorProducts(offers?: boolean) {
  const constraints: import("firebase/firestore").QueryConstraint[] = [];

  if (offers) {
    constraints.push(where("salePrice", ">", 0));
  }
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "kQ6LsYwTz27Wo8b0SuSc"),
      ...constraints,
    ),
  );
  return list.docs.map((doc) => doc.data());
}
