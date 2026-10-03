"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Camera,
  CircleAlert,
  RefreshCw,
  ScanLine,
  ShieldX,
  LogOut,
} from "lucide-react";

import {
  getDemoMemberById,
  getDemoMemberByNumber,
  type DemoMember,
} from "@/data/demo-members";

import {
  createMemberQrPayload,
  parseMemberQrPayload,
} from "@/lib/member-demo";

import {
  demoAdminLogout,
  getCurrentDemoAdmin,
} from "@/lib/admin-demo";

type ScanState =
  | "valid"
  | "payment_due"
  | "inactive"
  | "invalid";

type ValidationResult = {
  state: ScanState;
  member?: DemoMember;
  title: string;
  message: string;
};

function validateMember(
  member?: DemoMember
): ValidationResult {
  if (!member) {
    return {
      state: "invalid",
      title: "Invalid card",
      message:
        "This QR code does not match an XFIT member.",
    };
  }

  const paymentDate = new Date(
    `${member.paymentDueDate}T23:59:59`
  );

  if (
    member.status === "payment_due" ||
    (member.status === "active" &&
      paymentDate.getTime() < Date.now())
  ) {
    return {
      state: "payment_due",
      member,
      title: "Payment due",
      message:
        "Membership requires payment before entry.",
    };
  }

  if (member.status === "inactive") {
    return {
      state: "inactive",
      member,
      title: "Membership inactive",
      message:
        "This membership is currently inactive.",
    };
  }

  return {
    state: "valid",
    member,
    title: "Access approved",
    message:
      "Membership is active. Member may enter.",
  };
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

export default function AdminScanPage() {
  const router = useRouter();

  const isClient = useSyncExternalStore(
    subscribeToClient,
    getClientSnapshot,
    getServerSnapshot
  );

  const admin = isClient
    ? getCurrentDemoAdmin()
    : null;

  useEffect(() => {
    if (isClient && !admin) {
      router.replace("/member/login");
    }
  }, [admin, isClient, router]);

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const controlsRef =
    useRef<{ stop: () => void } | null>(
      null
    );

  const [scanning, setScanning] =
    useState(false);

  const [cameraError, setCameraError] =
    useState("");

  const [result, setResult] =
    useState<ValidationResult | null>(null);

  const [manualMember, setManualMember] =
    useState("");

  function validateQr(rawValue: string) {
    const payload =
      parseMemberQrPayload(rawValue);

    if (!payload) {
      setResult(validateMember(undefined));
      return;
    }

    setResult(
      validateMember(
        getDemoMemberById(payload.memberId)
      )
    );
  }

  async function startScanner() {
    setCameraError("");
    setResult(null);

    controlsRef.current?.stop();

    try {
      const { BrowserQRCodeReader } =
        await import("@zxing/browser");

      const reader =
        new BrowserQRCodeReader();

      if (!videoRef.current) return;

      setScanning(true);

      const controls =
        await reader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          scanResult => {
            if (!scanResult) return;

            controlsRef.current?.stop();
            setScanning(false);

            validateQr(
              scanResult.getText()
            );
          }
        );

      controlsRef.current = controls;
    } catch {
      setScanning(false);
      setCameraError(
        "Camera could not start. Check browser camera permission."
      );
    }
  }

  function stopScanner() {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setScanning(false);
  }

  function manualValidation() {
    const member =
      getDemoMemberByNumber(manualMember);

    setResult(validateMember(member));
  }

  function testMember(
    memberNumber: string
  ) {
    const member =
      getDemoMemberByNumber(memberNumber);

    if (!member) return;

    validateQr(
      createMemberQrPayload(member.id)
    );
  }

  if (!isClient || !admin) {
    return (
      <main className="grid min-h-[100svh] place-items-center bg-[#0b0b0b] text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
          Checking admin access...
        </p>
      </main>
    );
  }

  const resultStyles = {
    valid: {
      border: "border-[#36d277]/35",
      bg: "bg-[#36d277]/10",
      text: "text-[#53e88d]",
      Icon: BadgeCheck,
    },
    payment_due: {
      border: "border-[#ffb020]/35",
      bg: "bg-[#ffb020]/10",
      text: "text-[#ffbd45]",
      Icon: CircleAlert,
    },
    inactive: {
      border: "border-[#ef2a32]/35",
      bg: "bg-[#ef2a32]/10",
      text: "text-[#ff4b52]",
      Icon: ShieldX,
    },
    invalid: {
      border: "border-[#ef2a32]/35",
      bg: "bg-[#ef2a32]/10",
      text: "text-[#ff4b52]",
      Icon: ShieldX,
    },
  };

  return (
    <main className="min-h-[100svh] bg-[#0b0b0b] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.07em]"
          >
            XFIT
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <ScanLine className="size-4 text-[#ef2a32]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-white/45">
                Admin access scanner
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                demoAdminLogout();
                router.replace("/member/login");
              }}
              aria-label="Log out admin"
              className="grid size-10 place-items-center border border-white/10 text-white/45 transition hover:border-[#ef2a32]/50 hover:text-[#ef2a32]"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 md:px-8 md:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
        <section>
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#ef2a32]">
            Entry validation
          </p>

          <h1 className="mt-3 text-[clamp(3.2rem,12vw,6.5rem)] font-black uppercase leading-[0.78] tracking-[-0.075em]">
            Scan member
            <br />
            access.
          </h1>

          <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-white/10 bg-[#151515]">
            <video
              ref={videoRef}
              muted
              playsInline
              className="h-full w-full object-cover"
            />

            {!scanning && (
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="mx-auto grid size-14 place-items-center rounded-full border border-white/15">
                    <Camera className="size-5 text-white/40" />
                  </div>

                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
                    Camera stopped
                  </p>
                </div>
              </div>
            )}

            {scanning && (
              <>
                <div className="pointer-events-none absolute inset-[12%] border border-[#ef2a32]/70" />

                <div className="scanner-line pointer-events-none absolute left-[12%] right-[12%] top-[25%] h-px bg-[#ef2a32] shadow-[0_0_12px_rgba(239,42,50,0.9)]" />

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em]">
                  Point camera at member QR
                </div>
              </>
            )}
          </div>

          {cameraError && (
            <p className="mt-3 text-xs text-[#ff4b52]">
              {cameraError}
            </p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={startScanner}
              className="flex h-12 items-center justify-center gap-2 bg-[#ef2a32] text-[10px] font-black uppercase tracking-[0.1em]"
            >
              <ScanLine className="size-4" />
              Start scan
            </button>

            <button
              onClick={stopScanner}
              className="flex h-12 items-center justify-center gap-2 border border-white/15 text-[10px] font-black uppercase tracking-[0.1em] text-white/55"
            >
              Stop camera
            </button>
          </div>
        </section>

        <aside className="lg:pt-24">
          {result ? (
            <div
              className={`border p-6 ${resultStyles[result.state].border} ${resultStyles[result.state].bg}`}
            >
              {(() => {
                const Icon =
                  resultStyles[
                    result.state
                  ].Icon;

                return (
                  <Icon
                    className={`size-8 ${resultStyles[result.state].text}`}
                  />
                );
              })()}

              <p
                className={`mt-7 text-[9px] font-black uppercase tracking-[0.13em] ${resultStyles[result.state].text}`}
              >
                Scan result
              </p>

              <h2 className="mt-2 text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em]">
                {result.title}
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
                {result.message}
              </p>

              {result.member && (
                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-xl font-bold">
                    {result.member.name}
                  </p>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
                    {
                      result.member
                        .memberNumber
                    }
                  </p>

                  <dl className="mt-5 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-white/35">
                        Plan
                      </dt>
                      <dd>
                        {
                          result.member
                            .plan
                        }
                      </dd>
                    </div>

                    <div className="flex justify-between">
                      <dt className="text-white/35">
                        Visits
                      </dt>
                      <dd>
                        {
                          result.member
                            .totalVisits
                        }
                      </dd>
                    </div>

                    <div className="flex justify-between">
                      <dt className="text-white/35">
                        Payment due
                      </dt>
                      <dd>
                        {
                          result.member
                            .paymentDueDate
                        }
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              <button
                onClick={() => {
                  setResult(null);
                  startScanner();
                }}
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 bg-white text-[10px] font-black uppercase tracking-[0.1em] text-black"
              >
                <RefreshCw className="size-4" />
                Scan next member
              </button>
            </div>
          ) : (
            <div className="border border-white/10 bg-[#151515] p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-white/35">
                Waiting for scan
              </p>

              <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.055em]">
                Member validation
                appears here.
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/40">
                Scan the QR on the member
                dashboard to verify their
                membership status.
              </p>
            </div>
          )}

          {/* Manual fallback */}
          <div className="mt-4 border border-white/10 bg-[#151515] p-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
              Manual lookup
            </p>

            <div className="mt-4 flex">
              <input
                value={manualMember}
                onChange={event =>
                  setManualMember(
                    event.target.value
                  )
                }
                placeholder="XFIT-1001"
                className="h-12 min-w-0 flex-1 border border-white/10 bg-black/20 px-4 text-xs uppercase outline-none focus:border-[#ef2a32]"
              />

              <button
                onClick={manualValidation}
                className="h-12 bg-white px-5 text-[9px] font-black uppercase tracking-[0.1em] text-black"
              >
                Validate
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <button
                onClick={() =>
                  testMember(
                    "XFIT-1001"
                  )
                }
                className="border border-white/10 p-3 text-[8px] font-bold uppercase tracking-[0.08em] text-white/40"
              >
                Active
              </button>

              <button
                onClick={() =>
                  testMember(
                    "XFIT-1002"
                  )
                }
                className="border border-white/10 p-3 text-[8px] font-bold uppercase tracking-[0.08em] text-white/40"
              >
                Due
              </button>

              <button
                onClick={() =>
                  testMember(
                    "XFIT-1003"
                  )
                }
                className="border border-white/10 p-3 text-[8px] font-bold uppercase tracking-[0.08em] text-white/40"
              >
                Inactive
              </button>
            </div>
          </div>

          <p className="mt-4 text-[9px] leading-4 text-white/20">
            Demo scanner only. Production
            access will require authenticated
            staff and server-side validation.
          </p>
        </aside>
      </div>
    </main>
  );
}
