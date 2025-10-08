import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getBookcasesShelvingUnits(offers?: boolean) {
  const constraints: import("firebase/firestore").QueryConstraint[] = [];

  if (offers) {
    constraints.push(where("salePrice", ">", 0));
  }
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "mrxPEZJcbg4MaehlypVC"),
      ...constraints,
    ),
  );
  return list.docs.map((doc) => doc.data());
}
