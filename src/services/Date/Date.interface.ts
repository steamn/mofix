export interface IDateService {
  getDateRange: (
    minAge: number,
    maxAge: number
  ) => { maxDate: string; minDate: string }
  getYears: (minYear: number, maxYear: number) => string[]
  getCurrent: (minDate: string, date?: Date) => string
}
