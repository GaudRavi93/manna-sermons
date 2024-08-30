import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ago'
})
export class AgoPipe implements PipeTransform {

  transform(t: string): string {
    const time = Date.now() - (Date.parse(t) as number);
    const min = 1000 * 60;
    const hour = 60 * min;
    const day = 24 * hour;

    return time > day ? Math.floor(time / day) + ' days' :
      time > hour ? Math.floor(time / hour) + ' hours' : Math.floor(time / min) + ' mins';
  }

}
