import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  static format: string = 'YYYY-MM-DD HH:mm:ss';

  transform(theDate: moment.Moment | Date | string, defaultVal: string = 'n/a'): string {
    if (!moment(theDate).isValid()) {
      return defaultVal;
    }

    return moment(theDate).format(DateFormatPipe.format).toUpperCase();
  }
}

export const CustomPipes = {
  DateFormatPipe
};
