import { getUser } from "@/lib/firestore/user/read_server";
import { TFavorites } from "../page";

import ProductsList from "./ProductsList";

type TTimestampCreate = {
  type: string;
  seconds: number;
  nanoseconds: number;
};

export interface TUser {
  displayName: string;
  favorites: TFavorites[];
  id: string;
  photoURL: string;
  timestampCreate: TTimestampCreate;
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const userId = id.split("-").at(-1) as string;
  const listId = id.split("-").slice(0, -1).join("-");
  const user = (await getUser({ id: userId })) as TUser;

  const favouriteList = user.favorites.find((list) => list.id === listId);

  if (!favouriteList) return <h1>No list found</h1>;

  return (
    <div className="mx-12 my-25">
      <ProductsList userId={userId} listId={listId} />
    </div>
  );
}

export default Page;
