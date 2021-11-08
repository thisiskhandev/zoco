import { Component, OnInit, Input } from '@angular/core';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { WaitTimeEnum } from './shared/wait-time-enum';
import { FormBuilder } from '@angular/forms';
import { WaitTimeModel } from './shared/wait-time-model';

@Component({
  selector: 'app-wait-time',
  templateUrl: './wait-time.component.html',
  styleUrls: ['./wait-time.component.css']
})
export class WaitTimeComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : WaitTimeModel;
  waitTimeEnum = WaitTimeEnum;

  constructor(private formBuilder: FormBuilder) { 
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
  }

}
