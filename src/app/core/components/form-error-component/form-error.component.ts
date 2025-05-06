import {Component, input} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (shouldShowErrors()) {
      @for (error of errorMessage(); track $index) {
        <span class="small text-danger">{{ error }}</span>
      }
    }
  `
})
export class FormErrorComponent {
  control = input.required<AbstractControl | FormControl | null>();
  errorMessages = input<{ [key: string]: string }>({
    'required': 'Ce champs est obligatoire',
    'minlength': 'La longueur minimale n\'est pas respectée',
    'maxlength': 'La longueur maximale est dépassée',
    'pattern': 'Le format est invalide',
    'email': 'L\'email est invalide',
  });

  shouldShowErrors(): boolean {
    const controlValue = this.control();
    return controlValue !== null && controlValue !== undefined ?
      (controlValue.invalid && (controlValue.dirty || controlValue.touched)) :
      false;
  }

  errorMessage(): string[] {
    const controlValue = this.control();
    if (!controlValue || !controlValue.errors) {
      return [];
    }

    return Object.keys(controlValue.errors)
      .map(key => {
        if (this.errorMessages() && this.errorMessages()[key]) {
          return this.errorMessages()[key];
        }

        return `${key}`;
      });
  }
}
