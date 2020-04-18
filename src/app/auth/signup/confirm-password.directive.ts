import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

function validatePassword(): ValidatorFn {
  return (control: AbstractControl) => {
    let isValid = false;
    if (control && control instanceof FormGroup) {
      const group = control as FormGroup;
      if (group.controls.password && group.controls.confirmPassword) {
        isValid = group.controls.password.value === group.controls.confirmPassword.value;
      }
    }
    if (isValid) {
      return null;
    } else {
      return { passwordCheck: 'failed' };
    }
  };
}

@Directive({
  selector: '[appCheckPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CheckPasswordDirective, multi: true }]
})
export class CheckPasswordDirective implements Validator {
  private valFn: any;

  constructor() {
    this.valFn = validatePassword();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.valFn(c);
  }

}
