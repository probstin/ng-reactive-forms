import { Component, Input } from '@angular/core';

const steps = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
];

export enum StepDirection {
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS'
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  @Input() isUserSystemManager: boolean = false;

  steps = steps;
  isCompanyGoogle: boolean = false; // TODO: event bus
  registration: any;
  step: number = 1;
  activeIndex: number = 0;
  stepDirection = StepDirection;

  // ====================
  // step interactions
  // ====================

  companySelected(company: string) {
    this.isCompanyGoogle = (company === 'GOOGLE');
  }

  nextStep(project: any): void {
    this.registration = { ...this.registration, ...project };
    console.log(this.registration);
    this._changeStep(StepDirection.NEXT);
  }

  previousStep(project: any): void {
    console.log(project);
    this._changeStep(StepDirection.PREVIOUS);
  }

  // ====================
  // helpers
  // ====================

  private _changeStep(stepDirection: StepDirection): void {
    const currentIndex = this.activeIndex;

    if (stepDirection === StepDirection.NEXT && this.steps[currentIndex + 1])
      this.activeIndex++;

    if (stepDirection === StepDirection.PREVIOUS && this.steps[currentIndex - 1])
      this.activeIndex--;
  }

}
