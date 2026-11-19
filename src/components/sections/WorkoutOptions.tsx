"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Dumbbell,
  HeartPulse,
  Zap,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { workouts } from "@/data/workouts";

const icons = {
  dumbbell: Dumbbell,
  heart: HeartPulse,
  activity: Activity,
  zap: Zap,
  weights: CircleDot,
} as const;

export function WorkoutOptions() {
  const trackRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const current = track.scrollLeft;

    if (maxScroll <= 0) {
      setProgress(1);
      setCanGoBack(false);
      setCanGoForward(false);
      return;
    }

    setProgress(current / maxScroll);
    setCanGoBack(current > 8);
    setCanGoForward(current < maxScroll - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    updateScrollState();

    const observer = new ResizeObserver(() => {
      updateScrollState();
    });

    observer.observe(track);

    return () => observer.disconnect();
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;

    if (!track) return;

    const distance = Math.min(
      track.clientWidth * 0.78,
      430
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    track.scrollBy({
      left: direction === "right" ? distance : -distance,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="workouts"
      className="overflow-hidden bg-[#1b1b1b] text-white"
    >
      <Container className="pb-20 pt-20 md:pb-28 md:pt-28 lg:pb-32 lg:pt-32">
        {/* Intro */}
        <div className="mx-auto max-w-[920px] text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/50 md:text-[10px]">
            Train at XFIT
          </p>

          <h2
            className="
              mt-5
              text-[clamp(3rem,13vw,5rem)]
              font-black
              uppercase
              leading-[0.8]
              tracking-[-0.07em]

              md:text-[clamp(4.5rem,7vw,7.2rem)]
            "
          >
            Train your way
          </h2>

          <p className="mx-auto mt-7 max-w-[590px] text-[14px] leading-[1.55] text-white/55 md:text-[16px]">
            Whatever your goal, build your session around the kind of
            training that works for you.
          </p>
        </div>
      </Container>

      {/* Carousel */}
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        data-lenis-prevent
        className="
          hide-scrollbar
          flex
          snap-x
          snap-mandatory
          gap-3
          overflow-x-auto
          px-5
          pb-2

          md:gap-4
          md:px-8

          xl:px-[max(3rem,calc((100vw-1440px)/2+3rem))]
        "
      >
        {workouts.map(item => {
          const Icon =
            icons[item.icon as keyof typeof icons];

          return (
            <article
              key={item.title}
              className="
                group
                relative
                h-[440px]
                min-w-[82vw]
                snap-start
                overflow-hidden
                bg-[#262626]

                sm:min-w-[62vw]

                md:h-[500px]
                md:min-w-[360px]

                lg:h-[520px]
                lg:min-w-[390px]
              "
            >
              <Image
                src={item.image}
                alt={`${item.title} training at XFIT`}
                fill
                sizes="(max-width: 639px) 82vw, (max-width: 767px) 62vw, (max-width: 1023px) 360px, 390px"
                className="
                  object-cover
                  transition-transform
                  duration-[900ms]
                  ease-out
                  group-hover:scale-[1.04]
                "
              />

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />

              {/* Icon */}
              <div
                className="
                  absolute
                  left-5
                  top-5
                  grid
                  size-[68px]
                  place-items-center
                  rounded-full
                  bg-white
                  text-black

                  md:size-[74px]
                  md:left-6
                  md:top-6
                "
              >
                <Icon
                  className="size-6"
                  strokeWidth={1.8}
                />
              </div>

              {/* Card content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <h3
                  className="
                    text-[clamp(2.3rem,10vw,3.8rem)]
                    font-black
                    leading-[0.85]
                    tracking-[-0.055em]

                    md:text-[3.3rem]
                  "
                >
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[260px] text-[11px] leading-[1.5] text-white/55">
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Controls */}
      <Container className="pt-10 md:pt-12">
        <div className="flex items-center gap-6">
          {/* Progress */}
          <div className="relative h-px flex-1 overflow-hidden bg-white/15">
            <div
              className="absolute inset-y-0 left-0 bg-white transition-[width] duration-200"
              style={{
                width: `${Math.max(
                  12,
                  progress * 100
                )}%`,
              }}
            />
          </div>

          {/* Arrows */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Previous workout"
              disabled={!canGoBack}
              onClick={() => scroll("left")}
              className="
                grid
                size-12
                place-items-center
                bg-white
                text-black
                transition
                duration-300

                hover:-translate-y-0.5
                disabled:cursor-default
                disabled:bg-white/10
                disabled:text-white/25
              "
            >
              <ChevronLeft
                className="size-5"
                strokeWidth={1.6}
              />
            </button>

            <button
              type="button"
              aria-label="Next workout"
              disabled={!canGoForward}
              onClick={() => scroll("right")}
              className="
                grid
                size-12
                place-items-center
                bg-white
                text-black
                transition
                duration-300

                hover:-translate-y-0.5
                disabled:cursor-default
                disabled:bg-white/10
                disabled:text-white/25
              "
            >
              <ChevronRight
                className="size-5"
                strokeWidth={1.6}
              />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
