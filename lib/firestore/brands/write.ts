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

interface TBrand {
  data: {
    name: string;
    slug?: string;
    id?: string;
    imageURL?: string;
  };
  image: File | null;
}

export async function createNewBrand({ data, image }: TBrand) {
  if (!image) {
    throw new Error("Image is required");
  }
  if (!data.name) {
    throw new Error("Name is required");
  }

  const newId = doc(collection(db, "ids")).id;
  const imageRef = ref(storage, `brands/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);
  await setDoc(doc(db, `brands/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
}

export async function updateBrand({ data, image }: TBrand) {
  if (!data.name) {
    throw new Error("Name is required");
  }
  if (!data.id) {
    throw new Error("ID is required");
  }
  const id = data.id;
  let imageURL = data.imageURL;

  if (image) {
    const imageRef = ref(storage, `brands/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `brands/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
}

export async function deleteBrand(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `brands/${id}`));
}
