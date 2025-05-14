import * as moment from 'moment-timezone';
export function addHours(date: Date, hours: number, timeZone: string = 'UTC'): Date {
  let totalHours = hours;

  if (timeZone === 'Europe/Paris') {
    totalHours += 2; 
  }

  return moment.tz(date, timeZone).add(totalHours, 'hours').toDate();
}