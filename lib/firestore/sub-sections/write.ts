import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface TSubSection {
  data: {
    title: string;
    slug?: string;
    id?: string;
    imageURL?: string;
    section?: string;
  };
  image: File | null;
}

export async function createNewSubSection({ data, image }: TSubSection) {
  if (!image) {
    throw new Error("Image is required");
  }
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data.section) {
    throw new Error("Section is required");
  }

  const newId = doc(collection(db, "ids")).id;
  const imageRef = ref(storage, `sub-sections/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);
  await setDoc(doc(db, `sub-sections/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
}

export async function updateSubSection({ data, image }: TSubSection) {
  if (!data.title) {
    throw new Error("Name is required");
  }
  if (!data.id) {
    throw new Error("ID is required");
  }
  const id = data.id;
  let imageURL = data.imageURL;

  if (image) {
    const imageRef = ref(storage, `sub-sections/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `sub-sections/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
}

export async function deleteSubSection(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `sub-sections/${id}`));
}
