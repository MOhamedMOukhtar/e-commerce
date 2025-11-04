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

interface PropCreateNewProduct {
  data: TProduct;
  featureImage: File | null;
  imageList: (File | null)[];
  measurementImage: File | null;
}

export async function createNewProduct({
  data,
  featureImage,
  imageList,
  measurementImage,
}: PropCreateNewProduct) {
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data.summary) {
    throw new Error("Summary is required");
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

  const measurementImageRef = ref(
    storage,
    `products/${measurementImage?.name}`,
  );
  await uploadBytes(measurementImageRef, measurementImage);
  const measurementImageURL = await getDownloadURL(measurementImageRef);

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
    stock: data.stock || 0,
    featureImage: featureImageURL,
    imageList: imageURLList,
    measurementImage: measurementImageURL,
    timestampCreate: Timestamp.now(),
  });
}

export async function updateProduct({
  data,
  featureImage,
  imageList,
}: PropCreateNewProduct) {
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  let featureImageURL = data?.featureImage ?? "";

  if (featureImage) {
    const featureImageRef = ref(storage, `products/${featureImage?.name}`);
    await uploadBytes(featureImageRef, featureImage);
    featureImageURL = await getDownloadURL(featureImageRef);
  }

  const imageURLList = imageList?.length === 0 ? data?.imageList : [];

  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    if (image) {
      const imageRef = ref(storage, `products/${image?.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      imageURLList?.push(url);
    }
  }

  await setDoc(doc(db, `products/${data?.id}`), {
    ...data,
    featureImage: featureImageURL,
    imageList: imageURLList,
    timestampUpdate: Timestamp.now(),
  });
}

export async function deleteProducts(id: string) {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `products/${id}`));
}
