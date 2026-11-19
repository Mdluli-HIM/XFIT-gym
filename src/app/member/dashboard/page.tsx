"use client";

import {
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import {
  BadgeCheck,
  CalendarClock,
  ChevronRight,
  CreditCard,
  Flame,
  History,
  LogOut,
  QrCode,
  Trophy,
} from "lucide-react";

import {
  createMemberQrPayload,
  demoLogout,
  getCurrentDemoMember,
} from "@/lib/member-demo";
import { getMembershipState } from "@/data/demo-members";

const statusDisplay = {
  active: {
    label: "Active",
    card: "Valid",
    icon: "text-[#32cf74]",
    dot: "bg-[#71ff9f]",
  },
  payment_due: {
    label: "Payment due",
    card: "Payment due",
    icon: "text-[#ffbd45]",
    dot: "bg-[#ffbd45]",
  },
  expired: {
    label: "Expired",
    card: "Expired",
    icon: "text-[#ef2a32]",
    dot: "bg-black",
  },
} as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(
    new Date(`${value}T12:00:00`)
  );
}

function subscribeToClient() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function MemberDashboardPage() {
  const router = useRouter();

  const isClient = useSyncExternalStore(
    subscribeToClient,
    getClientSnapshot,
    getServerSnapshot
  );

  const member = isClient
    ? getCurrentDemoMember()
    : null;

  useEffect(() => {
    if (isClient && !member) {
      router.replace("/member/login");
    }
  }, [isClient, member, router]);

  const consistency = useMemo(() => {
    if (!member) return 0;

    return Math.min(
      100,
      Math.round(
        (member.visitsThisMonth /
          member.monthlyGoal) *
          100
      )
    );
  }, [member]);

  function handleLogout() {
    demoLogout();
    router.replace("/member/login");
  }

  if (!isClient || !member) {
    return (
      <main className="grid min-h-[100svh] place-items-center bg-[#0b0b0b] text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
          Loading XFIT...
        </p>
      </main>
    );
  }

  const status =
    statusDisplay[getMembershipState(member)];

  return (
    <main className="min-h-[100svh] bg-[#0d0d0d] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.07em]"
          >
            XFIT
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-bold">
                {member.name}
              </p>
              <p className="mt-0.5 text-[8px] uppercase tracking-[0.12em] text-white/35">
                {member.memberNumber}
              </p>
            </div>

            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="grid size-10 place-items-center border border-white/10 text-white/50 transition hover:border-white/25 hover:text-white"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-8 md:py-12 lg:px-12">
        {/* Greeting */}
        <div className="border-b border-white/10 pb-8 md:flex md:items-end md:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#ef2a32]">
              Member dashboard
            </p>

            <h1 className="mt-4 text-[clamp(3.2rem,13vw,6rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
              Keep
              <br />
              showing up.
            </h1>
          </div>

          <p className="mt-6 max-w-[300px] text-sm leading-6 text-white/40 md:mt-0">
            Track your consistency, membership
            status and access your digital XFIT
            card.
          </p>
        </div>

        {/* Membership status */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="border border-white/10 bg-[#151515] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                Membership
              </span>

              <BadgeCheck
                className={`size-5 ${status.icon}`}
              />
            </div>

            <p className="mt-7 text-2xl font-black uppercase tracking-[-0.045em]">
              {status.label}
            </p>

            <p className="mt-2 text-xs text-white/35">
              {member.plan}
            </p>
          </div>

          <div className="border border-white/10 bg-[#151515] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                Next payment
              </span>

              <CalendarClock className="size-5 text-[#ef2a32]" />
            </div>

            <p className="mt-7 text-2xl font-black uppercase tracking-[-0.045em]">
              {formatDate(
                member.paymentDueDate
              )}
            </p>

            <p className="mt-2 text-xs text-white/35">
              Membership due date
            </p>
          </div>

          <div className="border border-white/10 bg-[#151515] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                Member since
              </span>

              <CreditCard className="size-5 text-white/40" />
            </div>

            <p className="mt-7 text-2xl font-black uppercase tracking-[-0.045em]">
              {formatDate(member.joinedAt)}
            </p>

            <p className="mt-2 text-xs text-white/35">
              {member.memberNumber}
            </p>
          </div>
        </div>

        {/* Stats */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#ef2a32]">
                Consistency
              </p>

              <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.055em]">
                Your training
              </h2>
            </div>

            <span className="text-xs text-white/30">
              This month
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="min-h-[180px] bg-[#ef2a32] p-5 text-white">
              <Trophy className="size-5" />

              <p className="mt-10 text-5xl font-black tracking-[-0.07em]">
                {member.visitsThisMonth}
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/70">
                Visits this month
              </p>
            </div>

            <div className="min-h-[180px] border border-white/10 bg-[#151515] p-5">
              <History className="size-5 text-white/45" />

              <p className="mt-10 text-5xl font-black tracking-[-0.07em]">
                {member.totalVisits}
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                Total visits
              </p>
            </div>

            <div className="min-h-[180px] border border-white/10 bg-[#151515] p-5">
              <Flame className="size-5 text-[#ef2a32]" />

              <p className="mt-10 text-5xl font-black tracking-[-0.07em]">
                {member.currentStreakWeeks}
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                Week streak
              </p>
            </div>

            <div className="min-h-[180px] border border-white/10 bg-[#151515] p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                Monthly goal
              </p>

              <p className="mt-10 text-5xl font-black tracking-[-0.07em]">
                {consistency}%
              </p>

              <div className="mt-4 h-1 overflow-hidden bg-white/10">
                <div
                  className="h-full bg-[#ef2a32]"
                  style={{
                    width: `${consistency}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Access card + history */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="relative overflow-hidden bg-[#ef2a32] p-6 md:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-20 text-[18rem] font-black leading-none text-black/[0.08]"
            >
              X
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-white/60">
                    Digital access
                  </p>

                  <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.055em]">
                    Gym card
                  </h2>
                </div>

                <QrCode className="size-6" />
              </div>

              <div className="mt-7 rounded-sm bg-white p-4">
                <QRCodeSVG
                  value={createMemberQrPayload(
                    member.id
                  )}
                  size={240}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#090909"
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-black uppercase">
                    {member.name}
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/60">
                    {member.memberNumber}
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.1em]">
                    <span
                      className={`size-1.5 rounded-full ${status.dot}`}
                    />
                    {status.card}
                  </span>
                </div>
              </div>

              <p className="mt-6 border-t border-white/25 pt-4 text-[10px] leading-4 text-white/65">
                Present this QR code at reception
                when entering XFIT.
              </p>
            </div>
          </section>

          <section className="border border-white/10 bg-[#151515]">
            <div className="flex items-center justify-between border-b border-white/10 p-5 md:p-6">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#ef2a32]">
                  Attendance
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.045em]">
                  Recent check-ins
                </h2>
              </div>

              <History className="size-5 text-white/30" />
            </div>

            <div>
              {member.recentVisits.map(
                visit => (
                  <div
                    key={`${visit.date}-${visit.time}`}
                    className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5 last:border-b-0 md:px-6"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-semibold">
                          {formatDate(
                            visit.date
                          )}
                        </p>

                        <p className="mt-1 text-[10px] text-white/30">
                          XFIT Nkowankowa
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-white/50">
                        {visit.time}
                      </span>

                      <ChevronRight className="size-4 text-white/20" />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
