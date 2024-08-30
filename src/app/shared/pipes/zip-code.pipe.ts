import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zipCode'
})
export class ZipCodePipe implements PipeTransform {

  transform(value: string): string {
    return value.length < 7 ? value : value.slice(0, 6);
  }

}
