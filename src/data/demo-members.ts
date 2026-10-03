export type MembershipStatus =
  | "active"
  | "payment_due"
  | "inactive";

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

export const demoMembers: DemoMember[] = [
  {
    id: "member-001",
    memberNumber: "XFIT-1001",
    pin: "2468",
    name: "Mpho Nkuna",
    plan: "Monthly Membership",
    status: "active",
    paymentDueDate: "2026-10-28",
    joinedAt: "2026-04-12",
    monthlyGoal: 12,
    visitsThisMonth: 8,
    totalVisits: 43,
    currentStreakWeeks: 4,
    lastVisit: "2026-10-02",
    recentVisits: [
      { date: "2026-10-02", time: "17:42" },
      { date: "2026-09-30", time: "18:11" },
      { date: "2026-09-27", time: "08:06" },
      { date: "2026-09-24", time: "17:28" },
      { date: "2026-09-21", time: "18:02" },
    ],
  },

  {
    id: "member-002",
    memberNumber: "XFIT-1002",
    pin: "1357",
    name: "Karabo Malatji",
    plan: "Monthly Membership",
    status: "payment_due",
    paymentDueDate: "2026-09-28",
    joinedAt: "2026-02-04",
    monthlyGoal: 12,
    visitsThisMonth: 4,
    totalVisits: 61,
    currentStreakWeeks: 1,
    lastVisit: "2026-09-27",
    recentVisits: [
      { date: "2026-09-27", time: "07:54" },
      { date: "2026-09-22", time: "18:22" },
    ],
  },

  {
    id: "member-003",
    memberNumber: "XFIT-1003",
    pin: "8642",
    name: "Lerato Hlungwani",
    plan: "Monthly Membership",
    status: "inactive",
    paymentDueDate: "2026-09-01",
    joinedAt: "2025-12-09",
    monthlyGoal: 12,
    visitsThisMonth: 0,
    totalVisits: 72,
    currentStreakWeeks: 0,
    lastVisit: "2026-08-24",
    recentVisits: [
      { date: "2026-08-24", time: "17:38" },
    ],
  },
];

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
