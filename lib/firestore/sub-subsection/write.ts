import { db, storage } from "@/lib/firebase";
import { TSubSubSectionData } from "@/types/sub-subsection/subSubSection";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function createNewSubSubSection({
  data,
  image,
}: TSubSubSectionData) {
  if (!image) {
    throw new Error("Image is required");
  }
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data.slug) {
    throw new Error("Slug is required");
  }
  if (!data.section) {
    throw new Error("Section is required");
  }
  if (!data.subSection) {
    throw new Error("Sub Section is required");
  }

  const newId = doc(collection(db, "ids")).id;
  const imageRef = ref(storage, `sub-subsections/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);
  await setDoc(doc(db, `sub-subsections/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
}

export async function updateSubSubSection({ data, image }: TSubSubSectionData) {
  if (!data.title) {
    throw new Error("Name is required");
  }
  if (!data.id) {
    throw new Error("ID is required");
  }
  const id = data.id;
  let imageURL = data.imageURL;

  if (image) {
    const imageRef = ref(storage, `sub-subsections/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `sub-subsections/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
}

export async function deleteSubSubSection(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `sub-subsections/${id}`));
}
