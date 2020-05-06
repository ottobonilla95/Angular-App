import { ValidatorFn, AbstractControl } from "@angular/forms";

export function passwordMatch(password: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return password !== control.value
      ? { mismatch: { value: control.value } }
      : null;
  };
}
