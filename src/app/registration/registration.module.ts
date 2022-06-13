import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng.module';
import { StepFourComponent } from './components/step-four/step-four.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepThreeComponent } from './components/step-three/step-three.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  exports: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
