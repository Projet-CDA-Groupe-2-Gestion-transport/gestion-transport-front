import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function minNumberFieldsRequired(fieldNames: string[], minRequired = 1): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control && control.value)) {
      return null;
    }

    const filledFieldsCount = fieldNames
      .map(field => control.get(field)?.value)
      .filter(value => value !== null && value !== undefined && value !== '')
      .length;

    if (filledFieldsCount < minRequired) {
      return {minNumberFieldsRequired: true};
    }
    return null;
  };
}
