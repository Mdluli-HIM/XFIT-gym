/**
 * Every link to a part of the public site lives here, so the header,
 * phone menu and footer always agree. Links start with "/" so they also
 * work from other pages (e.g. /privacy).
 */
export type NavLink = {
  label: string;
  href: string;
};

export const sectionLinks = {
  gym: { label: "Gym", href: "/#gym" },
  training: { label: "Training", href: "/#training" },
  workouts: { label: "Workouts", href: "/#workouts" },
  trainers: { label: "Trainers", href: "/#trainers" },
  membership: { label: "Membership", href: "/#membership" },
  about: { label: "About", href: "/#about" },
  contact: { label: "Contact", href: "/#contact" },
} satisfies Record<string, NavLink>;

export const memberLoginLink: NavLink = {
  label: "Member login",
  href: "/member/login",
};

export const privacyLink: NavLink = {
  label: "Privacy",
  href: "/privacy",
};

/** Footer "Explore" list: every section on the home page, in page order. */
export const footerLinks: NavLink[] = [
  sectionLinks.gym,
  sectionLinks.training,
  sectionLinks.workouts,
  sectionLinks.trainers,
  sectionLinks.membership,
  sectionLinks.about,
  sectionLinks.contact,
];
