import { TFavorites } from "@/app/favourites/page";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const createUser = async ({
  uid,
  displayName,
  photoURL,
}: {
  uid: string;
  displayName: string;
  photoURL: string;
}) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      id: uid,
      displayName: displayName,
      photoURL: photoURL ?? "",
      timestampCreate: Timestamp.now(),
    },
    { merge: true },
  );
};

export async function createFavoriteList({
  uid,
  listName = "Favourites",
  list = [],
}: {
  uid: string;
  listName: string;
  list?: string[];
}) {
  const userRef = doc(db, `users/${uid}`);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();

  if (!user) return;

  const newList = {
    id: uuidv4(),
    listName,
    list,
  };

  const updatedFavorites = [...(user.favorites || []), newList];

  await updateDoc(userRef, {
    favorites: updatedFavorites,
  });
}

export async function addProductToList({
  uid,
  listId,
  productIds,
}: {
  uid: string;
  listId: string;
  productIds: string[]; // can be one or multiple IDs
}) {
  const userRef = doc(db, `users/${uid}`);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error("User not found");

  const userData = userSnap.data();
  const favorites = userData.favorites || [];

  // Find the target list by its ID
  const targetIndex = favorites.findIndex((f: TFavorites) => f.id === listId);
  if (targetIndex === -1) throw new Error("List not found");

  // Merge existing and new product IDs (avoid duplicates)
  const updatedList = {
    ...favorites[targetIndex],
    list: Array.from(new Set([...favorites[targetIndex].list, ...productIds])),
  };

  // Replace the old list with the updated one
  const updatedFavorites = [
    ...favorites.slice(0, targetIndex),
    updatedList,
    ...favorites.slice(targetIndex + 1),
  ];

  // Save back to Firestore
  await updateDoc(userRef, { favorites: updatedFavorites });

  console.log("✅ Product(s) added successfully");
}

export async function updateFavorites({
  uid,
  list,
}: {
  uid: string;
  list: string[];
}) {
  const userRef = doc(db, `users/${uid}`);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();

  if (!user) return;

  const updatedFavorites = [...(user.favorites || [])];

  const firstList = updatedFavorites[0];
  const mergedList = {
    ...firstList,
    list: Array.from(new Set([...firstList.list, ...list])), // merge unique IDs
  };
  updatedFavorites[0] = mergedList;

  // 🧾 Update Firestore
  await updateDoc(userRef, {
    favorites: updatedFavorites,
  });
}

export async function updateListName(
  userId: string,
  listId: string,
  newName: string,
) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const updatedFavorites = userData.favorites.map((fav: TFavorites) =>
      fav.id === listId ? { ...fav, listName: newName } : fav,
    );

    await updateDoc(userRef, { favorites: updatedFavorites });
    console.log("List name updated successfully");
  } else {
    console.log("No user found");
  }
}

export async function deleteFavoriteList({
  uid,
  listId,
}: {
  uid: string;
  listId: string;
}) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("User not found");
      return;
    }

    const userData = userSnap.data();
    const updatedFavorites = (userData.favorites || []).filter(
      (fav: TFavorites) => fav.id !== listId,
    );

    await updateDoc(userRef, { favorites: updatedFavorites });
    console.log("List deleted successfully!");
  } catch (error) {
    console.error("Error deleting list:", error);
  }
}

export async function deleteItemFromList({
  uid,
  productId,
  listIds,
}: {
  uid: string;
  productId: string;
  listIds?: string[]; // optional — if not provided, delete from all lists
}) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("User not found");
      return;
    }

    const userData = userSnap.data();

    const updatedFavorites = userData.favorites.map((fav: TFavorites) => {
      // 🧠 if listIds provided → only modify those lists
      if (!listIds || listIds.includes(fav.id)) {
        return {
          ...fav,
          list: fav.list.filter((id: string) => id !== productId),
        };
      }
      return fav;
    });

    await updateDoc(userRef, { favorites: updatedFavorites });
    console.log("Product deleted successfully from specified lists");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export async function moveAllItems({
  uid,
  fromListId,
  toListId,
}: {
  uid: string;
  fromListId: string;
  toListId: string;
}) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("User not found");
      return;
    }

    const userData = userSnap.data();
    const favorites = userData.favorites || [];

    const fromListIndex = favorites.findIndex(
      (fav: TFavorites) => fav.id === fromListId,
    );
    const toListIndex = favorites.findIndex(
      (fav: TFavorites) => fav.id === toListId,
    );

    if (fromListIndex === -1 || toListIndex === -1) {
      console.error("List not found");
      return;
    }

    // copy before clearing
    const itemsToMove = favorites[fromListIndex].list || [];

    const updatedFavorites = [...favorites];
    updatedFavorites[toListIndex].list = [
      ...new Set([...updatedFavorites[toListIndex].list, ...itemsToMove]), // prevents duplicates
    ];
    updatedFavorites[fromListIndex].list = [];

    await updateDoc(userRef, { favorites: updatedFavorites });
    console.log("All items moved successfully");
  } catch (error) {
    console.error("Error moving items:", error);
  }
}

// export async function updateCarts({ uid, list }) {
//   await setDoc(
//     doc(db, `users/${uid}`),
//     {
//       carts: list,
//     },
//     {
//       merge: true,
//     },
//   );
// }
