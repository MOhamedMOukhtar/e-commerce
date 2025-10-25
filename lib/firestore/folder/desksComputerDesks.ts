import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getDesksComputerDesks() {
  const list = await getDocs(
    query(
      collection(db, "products"),
      where(`subSubSection`, `==`, "mhKjLICRuvp6heIReIqX"),
    ),
  );
  return list.docs.map((doc) => doc.data());
}
