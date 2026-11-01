"use client";

import Link from "next/link";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    image: "https://i.ibb.co/pj2qfv26/set-up-studio-shoot.jpg",
    title: "Create something worth remembering.",
    description:
      "Find inspiring studios and production spaces built for your next creative project.",
  },
  {
    image: "https://i.ibb.co/qPpNDCQ/music-s.jpg",
    title: "A space for every kind of creator.",
    description:
      "From photography and music to podcasts and art, discover a space that fits your vision.",
  },
  {
    image: "https://i.ibb.co/0pfVkw7Y/podcast.jpg",
    title: "Turn your ideas into real work.",
    description:
      "Book a professional creative space and focus on making your best work.",
  },
];

export default function HeroSlider() {

  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop
        className="hero-swiper h-[70vh] min-h-130"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full min-h-130">
              <Image
                src={slide.image}
                alt=""
                fill
                priority={slide.title === slides[0].title}
                quality={100}
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/55" />

              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
                  <div className="max-w-3xl text-white">
                    <p className="mb-4 text-sm font-semibold text-gel">
                      STUDIO SPACE
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
                      {slide.title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/studios"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Explore Studios
                      </Link>

                      <Link
                        href="/studios"
                        className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Host Your Space
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
