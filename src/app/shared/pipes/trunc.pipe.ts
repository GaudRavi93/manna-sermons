import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(t: string): string {
    return !t ? null : t.length > 120 ? t.substr(0, 120) + '...' : t;
  }

}
