import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  getRegistrationInfo(registrationNumber: any) {
    console.log('HERERERERE')
    return of({ projectName: 'TESTERMAN' });
  }

  existingRegistrationNumbers = [123456, 789101];

  constructor() { }

  validateRegistrationNumber(value: any): Observable<boolean> {
    return of(this.existingRegistrationNumbers.some((a: any) => a == value))
      .pipe(delay(1000))
  }

}
