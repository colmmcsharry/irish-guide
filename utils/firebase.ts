import { collection, getDocs, query, orderBy } from "firebase/firestore";

import { db } from "../config/firebase";
import { CardData } from "../data/cards";

export async function getFirestoreEvents(): Promise<CardData[]> {
  const eventsRef = collection(db, "events");
  const q = query(eventsRef, orderBy("date", "asc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    displayDate: new Date(doc.data().date).toLocaleDateString("en-IE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  })) as CardData[];
}
