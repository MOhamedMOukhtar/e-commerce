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
