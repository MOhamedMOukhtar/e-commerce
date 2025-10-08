import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getSofasArmchairs(offers?: boolean) {
  const constraints: import("firebase/firestore").QueryConstraint[] = [];

  if (offers) {
    constraints.push(where("salePrice", ">", 0));
  }
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, "my3dJRXVFHWv8TFSk2B7"),
      ...constraints,
    ),
  );
  return list.docs.map((doc) => doc.data());
}
