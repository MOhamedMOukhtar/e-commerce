import { db, storage } from "@/lib/firebase";
import { TProduct } from "@/types/product/product";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type PropCreateNewProduct = {
  data: TProduct;
  featureImage: File | null;
  imageList: (File | null)[];
};

export async function createNewProduct({
  data,
  featureImage,
  imageList,
}: PropCreateNewProduct) {
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data.summary) {
    throw new Error("Summary is required");
  }
  if (!data.brand) {
    throw new Error("Brand is required");
  }
  if (!data.category) {
    throw new Error("Category is required");
  }
  if (!data.price) {
    throw new Error("Price is required");
  }
  if (!featureImage) {
    throw new Error("Feature Image image is required");
  }

  const featureImageRef = ref(storage, `products/${featureImage.name}`);
  await uploadBytes(featureImageRef, featureImage);
  const featureImageURL = await getDownloadURL(featureImageRef);

  const imageURLList = [];

  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    if (image) {
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      imageURLList.push(url);
    }
  }

  const newId = doc(collection(db, "ids")).id;

  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    id: newId,
    featureImage: featureImageURL,
    imageList: imageURLList,
    timestampCreate: Timestamp.now(),
  });
}

export async function deleteProducts(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `products/${id}`));
}
