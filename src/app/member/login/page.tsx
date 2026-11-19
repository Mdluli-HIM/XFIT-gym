"use client";

import {
  FormEvent,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { demoLogin } from "@/lib/member-demo";
import { demoAdminLogin } from "@/lib/admin-demo";

type LoginMode = "member" | "admin";

export default function MemberLoginPage() {
  const router = useRouter();

  const [mode, setMode] =
    useState<LoginMode>("member");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [pin, setPin] = useState("");

  const [error, setError] = useState("");

  function changeMode(nextMode: LoginMode) {
    setMode(nextMode);
    setAccountNumber("");
    setPin("");
    setError("");
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (mode === "member") {
      const member = demoLogin(
        accountNumber,
        pin
      );

      if (!member) {
        setError(
          "Member number or PIN is incorrect."
        );
        return;
      }

      router.push("/member/dashboard");
      return;
    }

    const admin = demoAdminLogin(
      accountNumber,
      pin
    );

    if (!admin) {
      setError(
        "Admin number or PIN is incorrect."
      );
      return;
    }

    router.push("/admin/scan");
  }

  const isMember = mode === "member";

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#090909] text-white">
      {/* XFIT background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(190,18,20,0.28),transparent_34%),linear-gradient(110deg,#090909_0%,#0d0808_48%,#170606_100%)]" />

        <div className="absolute -left-[12%] bottom-[-10%] h-[85vh] w-[62vw] opacity-[0.38] sm:left-[-5%] md:opacity-[0.52] lg:left-[4%] lg:w-[48vw]">
          <Image
            src="/images/hero/hero-athlete.png"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 768px) 70vw, 48vw"
            className="object-contain object-bottom"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/25 to-black/65" />

        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 py-6 md:px-8 lg:px-12">
        {/* Top */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>

          <Link
            href="/"
            className="text-xl font-black tracking-[-0.07em]"
          >
            XFIT
          </Link>
        </div>

        {/* Content */}
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left copy */}
          <div className="hidden lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ef2a32]">
              XFIT Access
            </p>

            <h1 className="mt-5 max-w-[700px] text-[clamp(5rem,7vw,8.5rem)] font-black uppercase leading-[0.76] tracking-[-0.08em]">
              Your gym.
              <br />
              Your access.
              <br />
              Your progress.
            </h1>
          </div>

          {/* Login panel */}
          <div className="mx-auto w-full max-w-[470px] lg:mx-0 lg:ml-auto">
            {/* Role switch */}
            <div className="mb-8 grid grid-cols-2 border border-white/10 bg-black/25 p-1">
              <button
                type="button"
                onClick={() =>
                  changeMode("member")
                }
                className={`flex h-11 items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.11em] transition ${
                  isMember
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <UserRound className="size-3.5" />
                Member
              </button>

              <button
                type="button"
                onClick={() =>
                  changeMode("admin")
                }
                className={`flex h-11 items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.11em] transition ${
                  !isMember
                    ? "bg-[#ef2a32] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <ShieldCheck className="size-3.5" />
                Admin
              </button>
            </div>

            <div className="mb-9">
              <div
                className={`mb-7 grid size-12 place-items-center border ${
                  isMember
                    ? "border-[#e11c25]/40 bg-[#e11c25]/10 text-[#ef2a32]"
                    : "border-[#ef2a32]/50 bg-[#ef2a32]/15 text-[#ff4248]"
                }`}
              >
                {isMember ? (
                  <LockKeyhole className="size-5" />
                ) : (
                  <ShieldCheck className="size-5" />
                )}
              </div>

              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#ef2a32] lg:hidden">
                XFIT Access
              </p>

              <h2 className="mt-3 text-[3.5rem] font-black uppercase leading-[0.8] tracking-[-0.07em] lg:text-[4.2rem]">
                {isMember ? (
                  <>
                    Member
                    <br />
                    login.
                  </>
                ) : (
                  <>
                    Admin
                    <br />
                    login.
                  </>
                )}
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-white/45">
                {isMember
                  ? "Access your membership, attendance, payment status and digital gym card."
                  : "Access the XFIT member validation scanner and reception tools."}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <label className="block">
                <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.12em] text-white/40">
                  {isMember
                    ? "Member number"
                    : "Admin number"}
                </span>

                <input
                  value={accountNumber}
                  onChange={event =>
                    setAccountNumber(
                      event.target.value
                    )
                  }
                  placeholder={
                    isMember
                      ? "XFIT-1001"
                      : "ADMIN-001"
                  }
                  autoComplete="username"
                  className="h-14 w-full border border-white/15 bg-white/[0.05] px-4 text-sm uppercase text-white outline-none backdrop-blur-md transition placeholder:text-white/20 focus:border-[#ef2a32]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.12em] text-white/40">
                  PIN
                </span>

                <input
                  value={pin}
                  onChange={event =>
                    setPin(event.target.value)
                  }
                  placeholder="••••"
                  type="password"
                  inputMode="numeric"
                  autoComplete="current-password"
                  maxLength={4}
                  className="h-14 w-full border border-white/15 bg-white/[0.05] px-4 text-sm text-white outline-none backdrop-blur-md transition placeholder:text-white/20 focus:border-[#ef2a32]"
                />
              </label>

              {error && (
                <p className="text-sm text-[#ff4b52]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group flex h-14 w-full items-center justify-between bg-[#ef2028] px-5 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#ff2b33]"
              >
                {isMember
                  ? "Login to XFIT"
                  : "Open Admin Scanner"}

                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-8 border border-white/10 bg-black/30 p-4 backdrop-blur-md">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#ef2a32]">
                Demo access
              </p>

              <div className="mt-3 flex items-center justify-between text-xs text-white/45">
                <span>
                  {isMember
                    ? "Member"
                    : "Admin"}
                </span>

                <span className="font-mono text-white/75">
                  {isMember
                    ? "XFIT-1001"
                    : "ADMIN-001"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-white/45">
                <span>PIN</span>

                <span className="font-mono text-white/75">
                  {isMember
                    ? "2468"
                    : "9090"}
                </span>
              </div>
            </div>

            <p className="mt-5 text-[10px] leading-4 text-white/25">
              Demo only. Authentication is
              currently stored locally in this
              browser.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
