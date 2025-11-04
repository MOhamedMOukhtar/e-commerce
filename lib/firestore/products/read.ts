"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

type PropsUseProducts = {
  pageLimit: number;
  lastSnapDoc: QueryDocumentSnapshot<DocumentData> | null;
  subSection?: string;
};

export function useProducts({
  pageLimit,
  lastSnapDoc,
  subSection,
}: PropsUseProducts) {
  const { data, error } = useSWRSubscription(
    ["products", pageLimit, lastSnapDoc, subSection],
    ([path, pageLimit, lastSnapDoc, subSection], { next }) => {
      const ref = collection(db, path);

      const constraints: import("firebase/firestore").QueryConstraint[] = [];

      if (subSection && subSection !== "all") {
        constraints.push(where("subSection", "==", subSection));
      }

      if (lastSnapDoc) {
        constraints.push(startAfter(lastSnapDoc));
      }

      constraints.push(limit(pageLimit ?? 10));

      const q = query(ref, ...constraints);

      const unsub = onSnapshot(
        q,
        (snapshot) =>
          next(null, {
            list:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs.map((snap) => snap.data()),
            lastSnapDoc:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs[snapshot.docs.length - 1],
          }),
        (err) => next(err, null),
      );

      return () => unsub();
    },
  );

  return {
    data: data?.list,
    lastSnapDoc: data?.lastSnapDoc,
    error: error?.message,
    isLoading: data === undefined,
  };
}

export function useProduct({ productId }: { productId: string }) {
  const { data, error } = useSWRSubscription(
    ["products", productId],
    ([path, productId], { next }) => {
      const ref = doc(db, `${path}/${productId}`);

      const unsub = onSnapshot(
        ref,
        (snapshot) => next(null, snapshot.data()),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );
  return {
    data: data,
    error: error?.message,
    isLoading: data === undefined,
  };
}
