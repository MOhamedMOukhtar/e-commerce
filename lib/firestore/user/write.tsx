import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const createUser = async ({ uid, displayName, photoURL }) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      displayName: displayName,
      photoURL: photoURL ?? "",
      timestampCreate: Timestamp.now(),
    },
    { merge: true },
  );
};

// export const createUser = async ({ uid, displayName, photoURL }) => {
//   await setDoc(
//     doc(db, `users/${uid}`),
//     {
//       displayName: displayName,
//       photoURL: photoURL ?? "",
//       timestampCreate: Timestamp.now(),
//     },
//     { merge: true }
//   );
// };

export async function updateFavorites({ uid, list }) {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      favorites: list,
    },
    {
      merge: true,
    },
  );
}

export async function updateCarts({ uid, list }) {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      carts: list,
    },
    {
      merge: true,
    },
  );
}
