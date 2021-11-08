import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeneralInfoEnum } from './shared/general-info-enum';
import { CustomValidator } from '@shared/customValidator';
import { PhoneComponent } from '@commons/phone/phone.component';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent extends AbstractGenericFormComponent implements OnInit {

  generalInfoEnum = GeneralInfoEnum;
  maxPhoneItems = GeneralInfoEnum.maxPhoneItems;
  @ViewChild (PhoneComponent) phoneComponent;
  customValidator = CustomValidator;

  constructor(private formBuilder: FormBuilder) { 
    super();
  }

  ngOnInit() {
    
    this.initForm();
  }

  ngAfterViewInit() {
    this.formGroup.addControl(GeneralInfoEnum.phones, this.phoneComponent.formGroup);
    this.phoneComponent.formGroup.setParent(this.formGroup); 
  } 

  initForm() {
    this.initEmptyForm(this.formBuilder); 
  }

  onSubmit() {
    this.transformGroupToModel();
  }

  transformGroupToModel(): void {
    this.model.phoneNumber = this.phoneComponent.onSubmit();
  }

}
