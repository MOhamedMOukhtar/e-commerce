import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getSection(id: string) {
  const data = await getDoc(doc(db, `sections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
}

export async function getSections() {
  const list = await getDocs(collection(db, "sections"));
  return list.docs.map((doc) => doc.data());
}

export async function getSectionId(name: string) {
  const list = await getDocs(
    query(collection(db, "sections"), where(`slug`, `==`, name)),
  );
  return list.docs.map((doc) => doc.data())[0] || null;
}
