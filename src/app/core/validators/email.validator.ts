import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null;
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(control.value);
    return !isValid ? { email: true } : null;
  };
}
