'use client';

import { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { getBanners } from '@/lib/api/getHomeBanners';
import { Banner } from '@/lib/types/home_banner';
import Image from 'next/image';

type LoadingState = 'loading' | 'success' | 'error';

const SWIPER_CONFIG = {
  autoplayDelay: 5000,
  slidesPerView: 1,
} as const;

export default function HomeBannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [error, setError] = useState<string | null>(null);

  const swiperModules = useMemo(() => [Autoplay, Pagination], []);

  useEffect(() => {
    setLoadingState('loading');
    getBanners()
      .then((res) => {
        setBanners(res);
        setLoadingState('success');
        setError(null);
      })
      .catch((err) => {
        console.error('Error loading banners:', err);
        setError('Не вдалося завантажити банери');
        setLoadingState('error');
      });
  }, []);

  // Loading state
  if (loadingState === 'loading') {
    return (
      <section className="home_banner_slider mt-8">
        <div className="container">
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Завантаження...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (loadingState === 'error') {
    return (
      <section className="home_banner_slider mt-8">
        <div className="container">
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <p className="text-danger">{error || 'Помилка завантаження'}</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (banners.length === 0) {
    return null;
  }

  // Only loop if there are multiple banners
  const shouldLoop = banners.length > 1;

  return (
    <section className="home_banner_slider mt-8">
      <div className="container">
        <Swiper
          className="w-full rounded-lg overflow-hidden"
          modules={swiperModules}
          slidesPerView={SWIPER_CONFIG.slidesPerView}
          loop={shouldLoop}
          autoplay={
            shouldLoop
              ? {
                  delay: SWIPER_CONFIG.autoplayDelay,
                  disableOnInteraction: false,
                }
              : false
          }
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <div className="banner-slide relative w-full h-64 md:h-96 lg:h-[500px]">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                {(banner.title || banner.description) && (
                  <div className="absolute inset-0 flex items-center justify-start">
                    <div className="flex flex-col gap-2 md:gap-3 px-4 md:px-6 lg:px-8 xl:px-12 w-full max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
                      {banner.title && (
                        <h2
                          className="text-dark text-2xl md:text-4xl font-bold"
                          dangerouslySetInnerHTML={{ __html: banner.title }}
                        />
                      )}
                      {banner.description && (
                        <p className="text-gray-600 text-base md:text-xl font-normal"
                          dangerouslySetInnerHTML={{ __html: banner.description }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
