interface IDates {
  departureDate: Date | null;
  returnDate?: Date | null;
}

interface PropsCalendar {
  startDate: Date | null;
  endDate: Date | null;
  select: (day: Date) => void;
  calendarFormat: number;
}

export type { IDates, PropsCalendar };
