import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NameDetailsEnum } from './shared/name-details.enum';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-name-details',
  templateUrl: './name-details.component.html',
  styleUrls: ['./name-details.component.css']
})
export class NameDetailsComponent extends AbstractGenericFormComponent implements OnInit {

  nameDetailsEnum = NameDetailsEnum;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }
}
