export type MembershipStatus =
  | "active"
  | "payment_due"
  | "expired";

export type DemoMember = {
  id: string;
  memberNumber: string;
  pin: string;
  name: string;
  plan: string;
  status: MembershipStatus;
  paymentDueDate: string;
  joinedAt: string;
  monthlyGoal: number;
  visitsThisMonth: number;
  totalVisits: number;
  currentStreakWeeks: number;
  lastVisit: string;
  recentVisits: {
    date: string;
    time: string;
  }[];
};

/**
 * Demo dates are calculated relative to TODAY (in the visitor's
 * browser), so the demo always shows the same three cases:
 *   XFIT-1001  active      (payment due in 12 days)
 *   XFIT-1002  payment due (5 days overdue)
 *   XFIT-1003  expired     (lapsed 45 days ago)
 *
 * HYDRATION SAFETY: these dates depend on "today", so they must only be
 * rendered in the browser. The dashboard and scanner show a "Loading"
 * screen on the server and only read members after mounting
 * (useSyncExternalStore client check). Keep it that way: never render
 * these dates (or Intl date formatting) in server-rendered HTML.
 */
function daysFromToday(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const demoMembers: DemoMember[] = [
  {
    id: "member-001",
    memberNumber: "XFIT-1001",
    pin: "2468",
    name: "Mpho Nkuna",
    plan: "Monthly Membership",
    status: "active",
    paymentDueDate: daysFromToday(12),
    joinedAt: daysFromToday(-220),
    monthlyGoal: 12,
    visitsThisMonth: 8,
    totalVisits: 43,
    currentStreakWeeks: 4,
    lastVisit: daysFromToday(-1),
    recentVisits: [
      { date: daysFromToday(-1), time: "17:42" },
      { date: daysFromToday(-3), time: "18:11" },
      { date: daysFromToday(-6), time: "08:06" },
      { date: daysFromToday(-9), time: "17:28" },
      { date: daysFromToday(-12), time: "18:02" },
    ],
  },

  {
    id: "member-002",
    memberNumber: "XFIT-1002",
    pin: "1357",
    name: "Karabo Malatji",
    plan: "Monthly Membership",
    status: "payment_due",
    paymentDueDate: daysFromToday(-5),
    joinedAt: daysFromToday(-290),
    monthlyGoal: 12,
    visitsThisMonth: 4,
    totalVisits: 61,
    currentStreakWeeks: 1,
    lastVisit: daysFromToday(-6),
    recentVisits: [
      { date: daysFromToday(-6), time: "07:54" },
      { date: daysFromToday(-11), time: "18:22" },
    ],
  },

  {
    id: "member-003",
    memberNumber: "XFIT-1003",
    pin: "8642",
    name: "Lerato Hlungwani",
    plan: "Monthly Membership",
    status: "expired",
    paymentDueDate: daysFromToday(-45),
    joinedAt: daysFromToday(-345),
    monthlyGoal: 12,
    visitsThisMonth: 0,
    totalVisits: 72,
    currentStreakWeeks: 0,
    lastVisit: daysFromToday(-53),
    recentVisits: [
      { date: daysFromToday(-53), time: "17:38" },
    ],
  },
];

/**
 * The membership state shown on the dashboard AND used by the scanner.
 * An "active" member whose due date has passed counts as payment due.
 */
export function getMembershipState(
  member: DemoMember
): MembershipStatus {
  if (member.status !== "active") {
    return member.status;
  }

  const dueEndOfDay = new Date(
    `${member.paymentDueDate}T23:59:59`
  );

  return dueEndOfDay.getTime() < Date.now()
    ? "payment_due"
    : "active";
}

export function getDemoMemberById(id: string) {
  return demoMembers.find(member => member.id === id);
}

export function getDemoMemberByNumber(
  memberNumber: string
) {
  return demoMembers.find(
    member =>
      member.memberNumber.toLowerCase() ===
      memberNumber.trim().toLowerCase()
  );
}
