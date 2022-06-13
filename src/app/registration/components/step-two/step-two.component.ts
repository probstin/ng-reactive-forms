import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html'
})
export class StepTwoComponent implements OnInit {

  @Input() registration: any;

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      projectName: [null, Validators.required]
    })
  }

}
