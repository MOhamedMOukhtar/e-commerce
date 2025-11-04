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

export async function getSubSubSectionBySlug(slug: string) {
  const list = await getDocs(
    query(collection(db, "sub-subsections"), where("slug", "==", slug)),
  );

  // Get the first matching document (if any)
  const doc = list.docs[0];
  return doc ? doc.data() : null;
}

export async function chechSubSubSectionBySlug(slug: string) {
  const list = await getDocs(
    query(collection(db, "sub-subsections"), where("slug", "==", slug)),
  );
  const doc = list.docs[0];
  return doc ? doc.data() : null;
}
