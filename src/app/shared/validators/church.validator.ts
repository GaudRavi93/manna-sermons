import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IUser } from '../models/user';

export function churchValidator(form: FormGroup, nofAff: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const data: IUser = form.value;
    const res = nofAff || nofAff && control.value.length > 0;

    return res ? null : { churchValidator: { value: control.value } };
  };
}
