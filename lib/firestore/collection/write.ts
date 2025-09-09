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

interface TCategory {
  data: {
    title: string;
    subTitle: string;
    slug: string;
    id?: string;
    imageURL?: string;
  };
  image: File | null;
}

export async function createNewCollection({ data, image }: TCategory) {
  if (!image) {
    throw new Error("Image is required");
  }
  if (!data.title) {
    throw new Error("title is required");
  }
  if (!data.subTitle) {
    throw new Error("Sub Title is required");
  }

  const newId = doc(collection(db, "ids")).id;
  const imageRef = ref(storage, `collections/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);
  await setDoc(doc(db, `collections/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
}

export async function updateCollection({ data, image }: TCategory) {
  if (!data.title) {
    throw new Error("title is required");
  }
  if (!data.slug) {
    throw new Error("Sub Title is required");
  }
  if (!data.id) {
    throw new Error("ID is required");
  }
  const id = data.id;
  let imageURL = data.imageURL;

  if (image) {
    const imageRef = ref(storage, `collections/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `collections/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
}

export async function deleteCollection(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `collections/${id}`));
}
