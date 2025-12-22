'use client';

import { useEffect, useState } from "react";
import { getBanners } from "@/lib/api/getBanners";

export default function HomeBannerSlider() {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    getBanners().then(res => {
      setBanners(res);
    }).catch(error => {
      console.error("Error loading banners:", error);
    });
  }, []);

  return (
  <section className="home_banner_slider mt-8">
    <div className="container">
      <h2>Banner slider content</h2>
      <pre>{JSON.stringify(banners, null, 2)}</pre>
    </div>
  </section>
  )
}
