import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export async function getSubSubSection(id: string) {
  const data = await getDoc(doc(db, `sub-subsections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}

export async function getSubSubSectionInSubSection(id: string) {
  const list = await getDocs(
    query(
      collection(db, "sub-subsections"),
      where(`subSection`, `==`, id),
      orderBy("order", "asc"),
    ),
  );
  return list.docs.map((doc) => doc.data()) || null;
}
