"use client";

import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useSectoins() {
  const { data, error } = useSWRSubscription(
    ["sections"],
    ([path], { next }) => {
      const ref = query(collection(db, path), orderBy("order", "asc"));
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data()),
          ),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );
  return { data, error: error?.message, isLoading: data === undefined };
}
