import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getHallwayFurnitureSets() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "UwaVryvlqi6txfLPbxQD"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
