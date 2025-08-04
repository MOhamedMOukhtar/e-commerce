import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface TCategory {
  data: {
    name: string;
    slug: string;
  };
  image: File | null;
}

export async function createNewCategory({ data, image }: TCategory) {
  if (!image) {
    throw new Error("Image is required");
  }
  if (!data.name || !data.slug) {
    throw new Error("Name and slug are required");
  }

  const newId = doc(collection(db, "ids")).id;
  const imageRef = ref(storage, `categories/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);
  await setDoc(doc(db, `categories/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
}

export async function deleteCategory(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `categories/${id}`));
}
