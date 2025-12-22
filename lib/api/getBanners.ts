import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export async function getBanners() {
  try {
    const snapshot = await getDocs(collection(db, "slider_banners"));

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}