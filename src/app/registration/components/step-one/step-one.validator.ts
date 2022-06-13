import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { RegistrationService } from "../../services/registration.service";

export class StepOneValidator {

    static createValidator(registrationService: RegistrationService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return registrationService
                .validateRegistrationNumber(control.value)
                .pipe(map((result: boolean) => result ? { duplicateNumber: true } : null));
        }
    }
}