"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useSubSubSections(
  section: string | null = null,
  subSection: string | null = null,
) {
  const { data, error } = useSWRSubscription(
    ["sub-subsections", section, subSection],
    ([path], { next }) => {
      const constraints = [];

      if (section) constraints.push(where("section", "==", section));
      if (subSection) constraints.push(where("subSection", "==", subSection));

      constraints.push(orderBy("order", "asc"));
      const ref = query(collection(db, path), ...constraints);
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data()),
          ),
        (err) => {
          console.error(err);
          next(err, null);
        },
      );
      return () => unsub();
    },
  );
  return { data, error: error?.message, isLoading: data === undefined };
}

// const ref = query(
//   collection(db, path),
//   orderBy("createdAt", "desc") // or "asc"
// );
