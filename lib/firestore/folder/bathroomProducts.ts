import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getBathroomProducts(offers?: boolean) {
  const constraints: import("firebase/firestore").QueryConstraint[] = [];

  if (offers) {
    constraints.push(where("salePrice", ">", 0));
  }
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "YAZoWeO5j8C0oY06PmmY"),
      ...constraints,
    ),
  );
  return list.docs.map((doc) => doc.data());
}
