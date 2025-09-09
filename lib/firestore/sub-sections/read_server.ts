import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getSubSection(id: string) {
  const data = await getDoc(doc(db, `sub-sections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}

export async function getSubSectionInSection(id: string) {
  const list = await getDocs(
    query(collection(db, "sub-sections"), where(`section`, `==`, id)),
  );
  return list.docs.map((doc) => doc.data());
}
