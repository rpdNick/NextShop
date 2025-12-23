'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { getBanners } from '@/lib/api/getHomeBanners';
import { Banner } from '@/lib/types/home_banner';

export default function HomeBannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    getBanners()
      .then((res) => {
        setBanners(res);
      })
      .catch((error) => {
        console.error('Error loading banners:', error);
      });
  }, []);

  return (
    <section className="home_banner_slider mt-8">
      <div className="container">
        <Swiper className='w-full'
        modules={
          [Autoplay, Pagination]} 
          slidesPerView={1} 
          loop autoplay={{ delay: 5000 }} 
          pagination={{ clickable: true }}
          >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="banner-slide">
                <img src={banner.imageUrl} alt={banner.title} className="w-full h-auto" />
                <h2>{banner.title}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
