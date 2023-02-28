import moment from 'moment/min/moment-with-locales';
import {IDateService} from './Date.interface';

class DateService implements IDateService {
  constructor(private $format: string) {}

  private maxDateFromAge(minAge: number): string {
    return moment().subtract(minAge, 'y').format(this.$format);
  }

  private minDateFromAge(
    maxDate: string,
    minAge: number,
    maxAge: number,
  ): string {
    return moment(maxDate)
      .startOf('year')
      .subtract(maxAge - minAge, 'y')
      .format(this.$format);
  }

  getCurrent(minDate: string, date?: Date): string {
    return moment(date ? date : minDate).format(this.$format);
  }

  getDateRange(
    minAge: number,
    maxAge: number,
  ): {maxDate: string; minDate: string} {
    const maxDate = this.maxDateFromAge(minAge);
    const minDate = this.minDateFromAge(maxDate, minAge, maxAge);

    return {
      maxDate,
      minDate,
    };
  }

  getYears(minYear: number, maxYear: number): string[] {
    const length = maxYear - minYear + 1;
    if (maxYear < minYear) {
      throw Error('Max year can not be less than Min year');
    }

    return Array.from({length}, (v, i) => (maxYear - i).toString());
  }

  formatBirthday(date: string) {
    return moment(date, this.$format).format(this.$format);
  }

  formatServerBirthday(data: Date) {
    return moment(data).format(this.$format);
  }

  formatFlight(date: Date) {
    return moment(date).format('Do MMM, HH:mm A');
  }

  statisticFormat(date: Date) {
    return moment(date).format('DD MMMM');
  }

  flightPickerDate(date: Date) {
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const markedDate = moment(date).format(this.$format);
    const formatedDate = moment(date).format('MMMM Do');

    return {
      hour,
      minute,
      markedDate,
      formatedDate,
    };
  }

  fromMinutesToTime(minutes: number) {
    return `${Math.floor(minutes / 60)}h ${Math.floor(minutes % 60)}m`;
  }
}

export default DateService;
