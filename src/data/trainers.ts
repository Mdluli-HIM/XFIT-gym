/**
 * XFIT trainers. PLACEHOLDERS: replace with the real trainers.
 *
 * To add a real trainer: set `name`, `specialty`, put their photo in
 * public/images/trainers/ (lowercase file name, e.g. thabo.jpg) and set
 * `photo: "/images/trainers/thabo.jpg"`, then set `placeholder: false`.
 * Leave `photo: null` to show the neutral silhouette.
 */
export type Trainer = {
  id: string;
  name: string;
  specialty: string;
  photo: string | null;
  placeholder: boolean;
};

export const trainers: Trainer[] = [
  {
    id: "trainer-1",
    name: "Trainer name: coming soon",
    specialty: "Specialty: coming soon",
    photo: null,
    placeholder: true,
  },
  {
    id: "trainer-2",
    name: "Trainer name: coming soon",
    specialty: "Specialty: coming soon",
    photo: null,
    placeholder: true,
  },
  {
    id: "trainer-3",
    name: "Trainer name: coming soon",
    specialty: "Specialty: coming soon",
    photo: null,
    placeholder: true,
  },
];

// Google listing shows "Private lessons" as a service.
export const privateLessonsNote =
  "Private lessons available. Ask at reception.";
