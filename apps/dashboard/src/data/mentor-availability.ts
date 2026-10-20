export type Slot = { id: string; start: number; end: number };

export type DaySchedule = {
  name: string;
  enabled: boolean;
  slots: Slot[];
};

export const MIN_TIME = 6 * 60;
export const MAX_TIME = 22 * 60;

export const DEFAULT_SCHEDULE: DaySchedule[] = [
  {
    name: "Monday",
    enabled: true,
    slots: [
      { id: "mon-1", start: 540, end: 720 },
      { id: "mon-2", start: 840, end: 1020 },
    ],
  },
  {
    name: "Tuesday",
    enabled: true,
    slots: [
      { id: "tue-1", start: 540, end: 720 },
      { id: "tue-2", start: 840, end: 1080 },
    ],
  },
  { name: "Wednesday", enabled: false, slots: [] },
  {
    name: "Thursday",
    enabled: true,
    slots: [
      { id: "thu-1", start: 600, end: 780 },
      { id: "thu-2", start: 900, end: 1080 },
    ],
  },
  {
    name: "Friday",
    enabled: true,
    slots: [{ id: "fri-1", start: 540, end: 720 }],
  },
  {
    name: "Saturday",
    enabled: true,
    slots: [{ id: "sat-1", start: 600, end: 720 }],
  },
  { name: "Sunday", enabled: false, slots: [] },
];

export const TIME_ZONES = [
  { value: "ist", label: "(GMT+5:30) India Standard Time (IST)" },
  { value: "utc", label: "(GMT+0:00) Coordinated Universal Time (UTC)" },
  { value: "et", label: "(GMT-5:00) Eastern Time (ET)" },
  { value: "pt", label: "(GMT-8:00) Pacific Time (PT)" },
];
