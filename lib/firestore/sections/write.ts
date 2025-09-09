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

interface TSection {
  data: {
    name: string;
    slug: string;
    id?: string;
    imageURL?: string;
  };
  image: File | null;
}

export async function createNewSection({ data, image }: TSection) {
  if (!image) {
    throw new Error("Image is required");
  }
  if (!data.name || !data.slug) {
    throw new Error("Name and slug are required");
  }

  const newId = doc(collection(db, "ids")).id;
  const imageRef = ref(storage, `sections/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);
  await setDoc(doc(db, `sections/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
}

export async function updateSection({ data, image }: TSection) {
  if (!data.id) {
    throw new Error("ID is required");
  }

  if (!data.name || !data.slug) {
    throw new Error("Name and slug are required");
  }

  const id = data.id;
  let imageURL = data.imageURL;

  if (image) {
    const imageRef = ref(storage, `sections/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `sections/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
}

export async function deleteSection(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `sections/${id}`));
}
