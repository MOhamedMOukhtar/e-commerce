import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getSideboardsBuffetsConsoleTables() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "K8lQnS69Knm1NvXbalsh"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
