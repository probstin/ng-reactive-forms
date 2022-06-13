import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, mergeMap, Subject, takeUntil, tap } from 'rxjs';
import { RegistrationService } from '../../services/registration.service';
import { StepOneValidator } from './step-one.validator';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html'
})
export class StepOneComponent implements OnInit, OnDestroy {

  @Input() registration: any;
  @Input() isCompanyGoogle: boolean = false;
  @Input() isUserSystemManager: boolean = false;

  @Output() companySelected = new EventEmitter<string>();
  @Output() formSubmitted = new EventEmitter<any>();

  registrationForm!: FormGroup;
  companies = ['GOOGLE', 'TWITTER', 'META', 'AWS'];

  private _destroyed$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  // ====================
  // lifecycle
  // ====================

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      company: [null, Validators.required],
      registrationNumber: [null],
      managerOverride: [false],
      projectName: [null]
    });

    this.companyControl
      .valueChanges
      .pipe(takeUntil(this._destroyed$))
      .subscribe(company => {
        this._setValidators(company);
        this.companySelected.emit(company);
      });

    this.registrationNumberControl
      .statusChanges
      .pipe(
        takeUntil(this._destroyed$),
        tap(() => this.projectNameControl.setValue(null)),
        filter(() => (this.registrationNumberControl.value && this.registrationNumberControl.valid)),
        map(() => +this.registrationNumberControl.value),
        mergeMap((registrationNumber: number) => this.registrationService.getRegistrationInfo(registrationNumber))
      )
      .subscribe(({ projectName }) => {
        this.projectNameControl.setValue(projectName);
        this.managerOverrideControl.setValue(false);
      });

    // if there's registration info from the parent...
    const existingRegistration = this.registration;
    if (existingRegistration) {
      this.registrationForm.patchValue(existingRegistration);
    }
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  // ====================
  // form submission
  // ====================

  onSubmit(): void {
    if (this.registrationForm.invalid && !this.managerOverrideControl.value === true) return;
    const formValue = this.registrationForm.getRawValue();
    this.formSubmitted.emit(formValue);
  }

  // ====================
  // form helpers
  // ====================

  private _setValidators(company: any) {
    if (company === 'GOOGLE' && this.managerOverrideControl.value !== true) {
      this.registrationNumberControl.setValidators([Validators.required, Validators.minLength(6)]);
      this.registrationNumberControl.setAsyncValidators(StepOneValidator.createValidator(this.registrationService));
    } else {
      this.registrationNumberControl.setValidators(null);
      this.registrationNumberControl.setAsyncValidators(null);
    }
    this.registrationNumberControl.setValue(null);
    this.registrationNumberControl.updateValueAndValidity();
  }

  get companyControl(): FormControl { return this.registrationForm.get('company') as FormControl; }
  get registrationNumberControl(): FormControl { return this.registrationForm.get('registrationNumber') as FormControl; }
  get managerOverrideControl(): FormControl { return this.registrationForm.get('managerOverride') as FormControl; }
  get projectNameControl(): FormControl { return this.registrationForm.get('projectName') as FormControl; }

}
