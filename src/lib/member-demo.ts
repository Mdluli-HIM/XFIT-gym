import {
  demoMembers,
  getDemoMemberById,
} from "@/data/demo-members";

export const MEMBER_SESSION_KEY =
  "xfit-demo-member-session";

type MemberQrPayload = {
  type: "xfit-member-access";
  version: 1;
  memberId: string;
};

export function demoLogin(
  memberNumber: string,
  pin: string
) {
  const member = demoMembers.find(
    item =>
      item.memberNumber.toLowerCase() ===
        memberNumber.trim().toLowerCase() &&
      item.pin === pin.trim()
  );

  if (!member) {
    return null;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      MEMBER_SESSION_KEY,
      member.id
    );
  }

  return member;
}

export function demoLogout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(MEMBER_SESSION_KEY);
  }
}

export function getCurrentDemoMember() {
  if (typeof window === "undefined") {
    return null;
  }

  const memberId = window.localStorage.getItem(
    MEMBER_SESSION_KEY
  );

  if (!memberId) {
    return null;
  }

  return getDemoMemberById(memberId) ?? null;
}

export function createMemberQrPayload(
  memberId: string
) {
  const payload: MemberQrPayload = {
    type: "xfit-member-access",
    version: 1,
    memberId,
  };

  return JSON.stringify(payload);
}

export function parseMemberQrPayload(
  value: string
): MemberQrPayload | null {
  try {
    const data = JSON.parse(value) as Partial<MemberQrPayload>;

    if (
      data.type !== "xfit-member-access" ||
      data.version !== 1 ||
      typeof data.memberId !== "string"
    ) {
      return null;
    }

    return data as MemberQrPayload;
  } catch {
    return null;
  }
}
