"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioGallery({ images, title }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Keyboard]}
      navigation
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      className="overflow-hidden rounded-2xl bg-secondary [--swiper-navigation-color:#fff] [--swiper-navigation-size:22px] [--swiper-pagination-color:#fff] [--swiper-pagination-bullet-inactive-color:#fff]"
    >
      {images.map((src, index) => (
        <SwiperSlide key={`${src}-${index}`}>
          <div className="relative aspect-[16/10]">
            <Image
              src={src}
              alt={`${title} photo ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}