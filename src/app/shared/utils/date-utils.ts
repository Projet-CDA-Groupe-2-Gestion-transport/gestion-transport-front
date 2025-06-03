import moment from 'moment';


export function toLocalDateTime(date: Date): string {
  return moment(date).format("YYYY-MM-DDTHH:mm:ss");
}