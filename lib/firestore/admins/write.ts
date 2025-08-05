import { db, storage } from "@/lib/firebase";
import {
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface TAdmin {
  data: {
    name: string;
    email: string;
    id?: string;
    imageURL?: string;
  };
  image: File | null;
}

export async function createNewAdmin({ data, image }: TAdmin) {
  if (!image) {
    throw new Error("Image is required");
  }
  if (!data.name) {
    throw new Error("Name is required");
  }
  if (!data.email) {
    throw new Error("ُemail is required");
  }

  const newId = data.email;
  const imageRef = ref(storage, `admins/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);
  await setDoc(doc(db, `admins/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
}

export async function updateAdmin({ data, image }: TAdmin) {
  if (!data.name) {
    throw new Error("Name is required");
  }
  if (!data.id) {
    throw new Error("ID is required");
  }
  if (!data.email) {
    throw new Error("ُemail is required");
  }

  const id = data.id;
  let imageURL = data.imageURL;

  if (image) {
    const imageRef = ref(storage, `admins/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  if (id === data.email) {
    await updateDoc(doc(db, `admins/${id}`), {
      ...data,
      imageURL: imageURL,
      timestampUpdate: Timestamp.now(),
    });
  } else {
    const newId = data.email;
    await deleteDoc(doc(db, `admins/${id}`));
    await setDoc(doc(db, `admins/${newId}`), {
      ...data,
      id: newId,
      imageURL: imageURL,
      timestampUpdate: Timestamp.now(),
    });
  }
}

export async function deleteAdmin(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `admins/${id}`));
}
