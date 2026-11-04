"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "https://i.ibb.co/pj2qfv26/set-up-studio-shoot.jpg",
    title: "Create something worth remembering.",
    description:
      "Find inspiring studios and production spaces built for your next creative project.",
    label: "CREATE WITHOUT LIMITS",
    number: "01",
  },
  {
    image: "https://i.ibb.co/qPpNDCQ/music-s.jpg",
    title: "A space for every kind of creator.",
    description:
      "From photography and music to podcasts and art, discover a space that fits your vision.",
    label: "FIND YOUR CREATIVE SPACE",
    number: "02",
  },
  {
    image: "https://i.ibb.co/0pfVkw7Y/podcast.jpg",
    title: "Turn your ideas into real work.",
    description:
      "Book a professional creative space and focus on making your best work.",
    label: "MAKE SOMETHING AMAZING",
    number: "03",
  },
];

export default function HeroSlider() {
  return (
    <section className="bg-background px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="group relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-black shadow-2xl shadow-black/10">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y]}
          autoplay={{
            delay: 6500,
            disableOnInteraction: false,
          }}
          loop
          navigation
          pagination={{ clickable: true }}
          className="hero-swiper h-120 sm:h-130 lg:h-140 overflow-hidden rounded-2xl"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.number}>
              <div className="relative h-full">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={slide.number === "01"}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 1280px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />

                <div className="relative z-10 flex h-full items-center">
                  <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
                    <div className="max-w-2xl text-white">
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider text-white backdrop-blur-md">
                        <Sparkles className="size-3.5 text-gel" />
                        {slide.label}
                      </div>

                      <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>

                      <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                        {slide.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                          href="/studios"
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] hover:bg-primary/90"
                        >
                          Explore Studios
                          <ArrowRight className="size-4" />
                        </Link>

                        <Link
                          href="/add-studio"
                          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                        >
                          Host Your Space
                          <ArrowUpRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-7 right-7 z-20 hidden items-center gap-2 text-white sm:flex">
                  <span className="font-heading text-2xl font-bold">
                    {slide.number}
                  </span>
                  <span className="h-px w-8 bg-white/50" />
                  <span className="text-xs text-white/60">03</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>



        {/* Floating Info */}
        <div className="pointer-events-none absolute bottom-7 left-7 z-20 hidden items-center gap-3 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white backdrop-blur-lg lg:flex">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary">
            <Sparkles className="size-4" />
          </div>

          <div>
            <p className="text-xs font-semibold">Your creative journey</p>
            <p className="text-[10px] text-white/60">
              Starts with the right space
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
