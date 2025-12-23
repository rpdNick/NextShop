import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Banner } from "@/lib/types/home_banner";
import { query, where, orderBy } from "firebase/firestore";

export async function getBanners(): Promise<Banner[]> {
  const q = query(
    collection(db, "slider_banners"),
    where("isActive", "==", true),
    orderBy("order", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Banner, "id">),
  }));
}