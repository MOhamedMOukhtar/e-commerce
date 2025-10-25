import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getSmallFurnitureValueForMoney() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSection`, `==`, `eRbOdm13dExeeHUmUY78`),
      where(`price`, `<`, 10000),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
