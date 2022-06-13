import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';

@NgModule({
  exports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule,
    CheckboxModule,
    DynamicDialogModule,
    StepsModule,
    MenuModule
  ]
})
export class PrimengModule { }
