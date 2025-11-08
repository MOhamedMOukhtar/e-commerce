import { TFavorites } from "@/app/favorites/page";
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
  listName = "Favorites",
  list = [],
}: {
  uid: string;
  listName: string;
  list?: { id: string; quantity: number }[];
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

  return listName;
}

export async function addProductToList({
  uid,
  listId,
  products,
}: {
  uid: string;
  listId: string;
  products: { id: string; quantity: number }[];
}) {
  const userRef = doc(db, `users/${uid}`);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("User not found");

  const userData = userSnap.data();
  const favorites = userData.favorites || [];

  const targetIndex = favorites.findIndex((f: TFavorites) => f.id === listId);
  if (targetIndex === -1) throw new Error("List not found");

  const targetList = favorites[targetIndex].list || [];

  // 🧮 Merge quantities (if product exists, increase quantity)
  const updatedList = [...targetList];
  for (const product of products) {
    const existing = updatedList.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      updatedList.push(product);
    }
  }

  const updatedFavorites = [...favorites];
  updatedFavorites[targetIndex] = {
    ...favorites[targetIndex],
    list: updatedList,
  };

  await updateDoc(userRef, { favorites: updatedFavorites });
  console.log("✅ Product(s) added successfully");

  return favorites[targetIndex].listName;
}

export async function updateFavorites({
  uid,
  list,
}: {
  uid: string;
  list: { id: string; quantity: number }[];
}) {
  const userRef = doc(db, `users/${uid}`);
  const userSnap = await getDoc(userRef);
  const user = userSnap.data();

  if (!user) return;

  const updatedFavorites = [...(user.favorites || [])];

  const firstList = updatedFavorites[0];

  // Merge lists, avoiding duplicate product IDs
  const mergedProducts = [
    ...firstList.list,
    ...list.filter(
      (newItem) =>
        !firstList.list.some(
          (oldItem: { id: string; quantity: number }) =>
            oldItem.id === newItem.id,
        ),
    ),
  ];

  const mergedList = {
    ...firstList,
    list: mergedProducts,
  };

  updatedFavorites[0] = mergedList;

  // 🧾 Update Firestore
  await updateDoc(userRef, {
    favorites: updatedFavorites,
  });

  return mergedList.listName;
}

// update list name
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

// Delete a list
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

// Delete a product from a list
export async function deleteItemFromList({
  uid,
  productId,
  listIds,
}: {
  uid: string;
  productId: string;
  listIds?: string[];
}) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    console.error("User not found");
    return null;
  }

  const userData = userSnap.data();
  const deletedFrom: string[] = [];

  const updatedFavorites = userData.favorites.map((fav: TFavorites) => {
    // Determine if this list should be modified
    if (!listIds || listIds.includes(fav.id)) {
      const beforeCount = fav.list.length;
      const afterList = fav.list.filter((item) => item.id !== productId);

      // If product was found and removed, record the list name
      if (afterList.length < beforeCount) {
        deletedFrom.push(fav.listName);
      }

      return { ...fav, list: afterList };
    }
    return fav;
  });

  await updateDoc(userRef, { favorites: updatedFavorites });

  console.log(
    `✅ Product deleted successfully from: ${deletedFrom.join(", ")}`,
  );

  // Return the names of lists from which the product was removed
  return deletedFrom;
}

// Move all items from one list to another
export async function moveAllItems({
  uid,
  fromListId,
  toListId,
}: {
  uid: string;
  fromListId: string;
  toListId: string;
}) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return console.error("User not found");

  const userData = userSnap.data();
  const favorites = userData.favorites || [];

  const fromIndex = favorites.findIndex((f: TFavorites) => f.id === fromListId);
  const toIndex = favorites.findIndex((f: TFavorites) => f.id === toListId);
  if (fromIndex === -1 || toIndex === -1)
    return console.error("List not found");

  const fromList = favorites[fromIndex].list || [];
  const toList = favorites[toIndex].list || [];

  // Merge quantities
  const mergedList = [...toList];
  for (const item of fromList) {
    const existing = mergedList.find((i) => i.id === item.id);
    if (existing) existing.quantity += item.quantity;
    else mergedList.push(item);
  }

  const updatedFavorites = [...favorites];
  updatedFavorites[toIndex].list = mergedList;
  updatedFavorites[fromIndex].list = [];

  await updateDoc(userRef, { favorites: updatedFavorites });
  console.log("✅ All items moved successfully");
}

// update quantity
export async function updateQuantity({
  uid,
  listId,
  productId,
  quantity,
}: {
  uid: string;
  listId: string;
  productId: string;
  quantity: number;
}) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return console.error("User not found");

  const userData = userSnap.data();
  const favorites = userData.favorites || [];

  const index = favorites.findIndex((f: TFavorites) => f.id === listId);
  if (index === -1) return console.error("List not found");

  const list = favorites[index].list || [];
  const item = list.find(
    (i: { id: string; quantity: number }) => i.id === productId,
  );
  if (!item) return console.error("Item not found");

  item.quantity = quantity;

  await updateDoc(userRef, { favorites });
  // console.log("✅ Quantity updated successfully");
}

// remove one product from list
export async function removeItemFromFavoriteList({
  uid,
  listId,
  productId,
}: {
  uid: string;
  listId: string;
  productId: string;
}) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return console.error("User not found");

  const userData = userSnap.data();
  const favorites = userData.favorites || [];

  const index = favorites.findIndex((f: TFavorites) => f.id === listId);
  if (index === -1) return console.error("List not found");

  const list = favorites[index].list || [];
  const item = list.find(
    (i: { id: string; quantity: number }) => i.id === productId,
  );
  if (!item) return console.error("Item not found");

  list.splice(list.indexOf(item), 1);

  await updateDoc(userRef, { favorites });
  // console.log("✅ Item removed successfully");
}

//move one product from one list to another
export async function moveOneProduct({
  uid,
  fromListId,
  toListId,
  productId,
}: {
  uid: string;
  fromListId: string;
  toListId: string;
  productId: string;
}) {
  if (!uid || !fromListId || !toListId || !productId)
    throw new Error("❌ Missing parameters");

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("❌ User not found");

  const userData = userSnap.data();
  const favorites: TFavorites[] = userData.favorites || [];

  const fromIndex = favorites.findIndex((f) => f.id === fromListId);
  const toIndex = favorites.findIndex((f) => f.id === toListId);
  if (fromIndex === -1 || toIndex === -1)
    throw new Error("❌ One or both lists not found");

  const fromList = favorites[fromIndex].list || [];
  const toList = favorites[toIndex].list || [];

  const itemIndex = fromList.findIndex((i) => i.id === productId);
  if (itemIndex === -1) throw new Error("❌ Product not found in source list");

  const [item] = fromList.splice(itemIndex, 1);

  // Check if product already exists in target list
  const existing = toList.find((i) => i.id === productId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    toList.push(item);
  }

  // Update lists in memory
  favorites[fromIndex].list = fromList;
  favorites[toIndex].list = toList;

  await updateDoc(userRef, { favorites });
  console.log("✅ Item moved successfully");
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
