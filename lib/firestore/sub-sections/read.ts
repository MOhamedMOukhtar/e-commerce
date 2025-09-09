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

export function useSubSections(
  sortField: string = "order",
  sortDirection: "asc" | "desc" = "asc",
  sectionId: string | null = null,
) {
  const { data, error } = useSWRSubscription(
    ["sub-sections", sortField, sortDirection, sectionId],
    ([path], { next }) => {
      const constraints = [];

      if (sectionId) constraints.push(where("section", "==", sectionId));

      constraints.push(orderBy(sortField, sortDirection));

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
