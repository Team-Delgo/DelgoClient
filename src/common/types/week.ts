export interface weekDayType {
  Mon: string;
  Tue: string;
  Wed: string;
  Thu: string;
  Fri: string;
  Sat: string;
  Sun: string;
  [prop: string]: any;
}

export const weekDay: weekDayType = {
  Mon: '월',
  Tue: '화',
  Wed: '수',
  Thu: '목',
  Fri: '금',
  Sat: '토',
  Sun: '일',
};
