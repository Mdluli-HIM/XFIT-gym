"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { Container } from "@/components/ui/Container";

type MenuKey = "gym" | "training" | "membership";

type MegaCard = {
  eyebrow: string;
  title: string;
  href: string;
  image: string;
};

type MegaMenu = {
  label: string;
  cards: MegaCard[];
};

const megaMenus: Record<MenuKey, MegaMenu> = {
  gym: {
    label: "Gym",
    cards: [
      {
        eyebrow: "Inside XFIT",
        title: "The Gym",
        href: "#gym",
        image: "/images/gym/gym-01.jpg",
      },
      {
        eyebrow: "Train together",
        title: "The People",
        href: "#gym",
        image: "/images/gym/gym-03.jpg",
      },
      {
        eyebrow: "Feel it",
        title: "The Energy",
        href: "#gym",
        image: "/images/gym/gym-02.jpg",
      },
    ],
  },

  training: {
    label: "Training",
    cards: [
      {
        eyebrow: "Build",
        title: "Strength",
        href: "#workouts",
        image: "/images/gym/gym-01.jpg",
      },
      {
        eyebrow: "Move",
        title: "Cardio",
        href: "#workouts",
        image: "/images/gym/gym-02.jpg",
      },
      {
        eyebrow: "Perform",
        title: "Functional",
        href: "#workouts",
        image: "/images/gym/gym-03.jpg",
      },
    ],
  },

  membership: {
    label: "Membership",
    cards: [
      {
        eyebrow: "Get started",
        title: "Memberships",
        href: "#membership",
        image: "/images/gym/gym-02.jpg",
      },
      {
        eyebrow: "Come through",
        title: "Visit XFIT",
        href: "#contact",
        image: "/images/gym/gym-01.jpg",
      },
      {
        eyebrow: "Need help?",
        title: "Talk to us",
        href: "#contact",
        image: "/images/gym/gym-03.jpg",
      },
    ],
  },
};

const desktopLinks = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Gym",
    href: "#gym",
    menu: "gym" as MenuKey,
  },
  {
    label: "Training",
    href: "#training",
    menu: "training" as MenuKey,
  },
  {
    label: "Membership",
    href: "#membership",
    menu: "membership" as MenuKey,
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);

  const megaMenuOpen = activeMenu !== null;

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        onMouseLeave={() => setActiveMenu(null)}
        className="absolute inset-x-0 top-0 z-50"
      >
        {/* Main header bar */}
        <div
          className={`
            relative
            z-20
            transition-colors
            duration-300
            ${
              megaMenuOpen
                ? "bg-[#f5f4f1] text-[#151515]"
                : "bg-transparent text-white"
            }
          `}
        >
          <Container>
            <div
              className={`
                relative
                flex
                h-[68px]
                items-center
                justify-between
                border-b
                transition-colors
                duration-300
                md:h-[74px]

                ${
                  megaMenuOpen
                    ? "border-black/10"
                    : "border-white/15"
                }
              `}
            >
              {/* Logo */}
              <Link
                href="/"
                aria-label="XFIT home"
                onMouseEnter={() => setActiveMenu(null)}
                className="relative z-20 flex shrink-0 items-center gap-2.5"
              >
                <span className="text-[20px] font-black leading-none tracking-[-0.065em]">
                  XFIT
                </span>

                <span
                  className={`
                    hidden
                    text-[7px]
                    font-semibold
                    uppercase
                    leading-[1.2]
                    tracking-[0.13em]
                    transition-colors
                    sm:block

                    ${
                      megaMenuOpen
                        ? "text-black/45"
                        : "text-white/45"
                    }
                  `}
                >
                  Extreme
                  <br />
                  Fitness
                </span>
              </Link>

              {/* Desktop navigation */}
              <nav
                aria-label="Main navigation"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  hidden
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  gap-7

                  lg:flex
                  xl:gap-8
                "
              >
                {desktopLinks.map(link => {
                  const isActive =
                    link.menu && activeMenu === link.menu;

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onMouseEnter={() =>
                        setActiveMenu(link.menu ?? null)
                      }
                      onFocus={() =>
                        setActiveMenu(link.menu ?? null)
                      }
                      className={`
                        group
                        relative
                        flex
                        items-center
                        gap-1
                        py-5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.09em]
                        transition-colors
                        duration-300

                        ${
                          megaMenuOpen
                            ? "text-black/65 hover:text-black"
                            : "text-white/75 hover:text-white"
                        }

                        ${
                          isActive
                            ? megaMenuOpen
                              ? "text-black"
                              : "text-white"
                            : ""
                        }
                      `}
                    >
                      {link.label}

                      {link.menu && (
                        <ChevronDown
                          className={`
                            size-3
                            transition-transform
                            duration-300

                            ${
                              isActive
                                ? "rotate-180"
                                : ""
                            }
                          `}
                          strokeWidth={1.8}
                        />
                      )}

                      <span
                        className={`
                          absolute
                          inset-x-0
                          bottom-[12px]
                          h-px
                          origin-left
                          transition-transform
                          duration-300

                          ${
                            megaMenuOpen
                              ? "bg-black"
                              : "bg-white"
                          }

                          ${
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }
                        `}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* CTA */}
              <div
                className="hidden lg:block"
                onMouseEnter={() => setActiveMenu(null)}
              >
                <Link
                  href="#membership"
                  className="
                    join-cta-red
                    group
                    relative
                    inline-flex
                    h-[42px]
                    min-w-[140px]
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    border
                    border-[#d3131b]
                    bg-[#090909]
                    px-5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.11em]
                    text-[#ef2a2a]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:scale-[1.04]
                  "
                >
                  <span className="relative z-[2] text-[#ef2a2a]">
                    Join XFIT
                  </span>

                  <ArrowUpRight
                    className="relative z-[2] size-3.5 text-[#ef2a2a] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.1}
                  />
                </Link>
              </div>

              {/* Mobile menu */}
              <button
                type="button"
                aria-label={
                  menuOpen ? "Close menu" : "Open menu"
                }
                aria-expanded={menuOpen}
                onClick={() =>
                  setMenuOpen(current => !current)
                }
                className="relative z-[70] grid size-10 place-items-center lg:hidden"
              >
                {menuOpen ? (
                  <X
                    className="size-5"
                    strokeWidth={1.7}
                  />
                ) : (
                  <Menu
                    className="size-5"
                    strokeWidth={1.7}
                  />
                )}
              </button>
            </div>
          </Container>
        </div>

        {/* Desktop mega menu */}
        <AnimatePresence mode="wait">
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{
                opacity: 0,
                y: -12,
                clipPath: "inset(0 0 100% 0)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
              }}
              exit={{
                opacity: 0,
                y: -8,
                clipPath: "inset(0 0 100% 0)",
              }}
              transition={{
                duration: 0.32,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="
                absolute
                inset-x-0
                top-full
                z-10
                hidden
                bg-[#f5f4f1]
                pb-7
                pt-5
                text-[#151515]
                shadow-[0_28px_70px_rgba(0,0,0,0.18)]

                lg:block
              "
            >
              <Container>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-black/40">
                    Explore XFIT / {megaMenus[activeMenu].label}
                  </p>

                  <Link
                    href={
                      activeMenu === "gym"
                        ? "#gym"
                        : activeMenu === "training"
                          ? "#training"
                          : "#membership"
                    }
                    className="group flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.12em] text-black/45 transition-colors hover:text-black"
                  >
                    View all

                    <ArrowRight
                      className="size-3 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-3 xl:gap-4">
                  {megaMenus[activeMenu].cards.map(
                    (card, index) => (
                      <motion.div
                        key={card.title}
                        initial={{
                          opacity: 0,
                          y: 14,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.04 + index * 0.05,
                          duration: 0.35,
                        }}
                      >
                        <Link
                          href={card.href}
                          onClick={() =>
                            setActiveMenu(null)
                          }
                          className="
                            group
                            relative
                            block
                            h-[240px]
                            overflow-hidden
                            bg-[#222]

                            xl:h-[270px]
                          "
                        >
                          <Image
                            src={card.image}
                            alt=""
                            fill
                            sizes="33vw"
                            className="
                              object-cover
                              transition-transform
                              duration-[800ms]
                              ease-out
                              group-hover:scale-[1.045]
                            "
                          />

                          <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/25" />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />

                          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                            <div>
                              <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-white/65">
                                {card.eyebrow}
                              </p>

                              <h3
                                className="
                                  mt-1
                                  text-[clamp(1.8rem,2.4vw,2.7rem)]
                                  font-black
                                  uppercase
                                  leading-[0.88]
                                  tracking-[-0.055em]
                                  text-white
                                "
                              >
                                {card.title}
                              </h3>
                            </div>
                          </div>

                          <div
                            className="
                              absolute
                              bottom-5
                              right-5
                              grid
                              size-12
                              place-items-center
                              rounded-full
                              border
                              border-white
                              text-white
                              transition-all
                              duration-300

                              group-hover:bg-white
                              group-hover:text-black
                            "
                          >
                            <ArrowRight
                              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                              strokeWidth={1.7}
                            />
                          </div>
                        </Link>
                      </motion.div>
                    )
                  )}
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-[60] bg-[#111111] text-white lg:hidden"
          >
            <div className="flex min-h-[100svh] flex-col px-5 pb-6 pt-[96px]">
              <nav
                aria-label="Mobile navigation"
                className="flex flex-1 flex-col justify-center"
              >
                {desktopLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{
                      opacity: 0,
                      y: 28,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        0.12 + index * 0.055,
                      duration: 0.55,
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={link.href}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex items-center justify-between py-4"
                    >
                      <span className="text-[clamp(2.35rem,12vw,4rem)] font-black uppercase leading-[0.88] tracking-[-0.065em]">
                        {link.label}
                      </span>

                      <ArrowUpRight
                        className="size-5 text-white/35"
                        strokeWidth={1.4}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 grid grid-cols-2 gap-5 border-t border-white/15 pt-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">
                <div>
                  Nkowankowa
                  <br />
                  Limpopo
                </div>

                <div className="text-right">
                  Mon – Fri
                  <br />
                  06:00 – 20:00
                </div>
              </div>

              <Link
                href="#membership"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  mt-6
                  flex
                  h-14
                  items-center
                  justify-between
                  border
                  border-[#d3131b]
                  bg-[#090909]
                  px-5
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.08em]
                  text-[#ef2a2a]
                  shadow-[0_0_20px_rgba(211,19,27,0.22)]
                "
              >
                <span className="text-[#ef2a2a]">Join XFIT</span>

                <ArrowUpRight className="size-4 text-[#ef2a2a]" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
