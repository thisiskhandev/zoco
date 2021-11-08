import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicInfoActivitiesEnum } from './shared/basic-info-act-enum';
import { BasicInfoModel } from './shared/basic-info-model';
import { FormBuilder } from '@angular/forms';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ContactInfoComponent } from '@commons/contact-info/contact-info.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { Utilities } from '@shared/utilities';
import { BasicInfoActService } from './shared/basic-info-act.service';

@Component({
  selector: 'app-basic-information-activities',
  templateUrl: './basic-information-activities.component.html',
  styleUrls: ['./basic-information-activities.component.css'],
  providers: [ BasicInfoActService ]
})
export class BasicInformationActivitiesComponent extends AbstractGenericParentComponent implements OnInit {

  basicInfoActivitiesEnum = BasicInfoActivitiesEnum;
  maxContacts = BasicInfoActivitiesEnum.maxContacts;
  @ViewChild (GeneralInfoComponent) generalInfoComponent;
  @ViewChild (ContactInfoComponent) contactInfoActComponent;

  constructor(private formBuilder: FormBuilder, private basicInfoActService: BasicInfoActService) { 
    super();
  }

  ngOnInit() {
    this.model = new BasicInfoModel();
    this.formGroup = this.formBuilder.group( {
    });
  }

  ngAfterViewInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group( {
    });
    this.formGroup.addControl(BasicInfoActivitiesEnum.generalInfo, this.generalInfoComponent.formGroup);
    this.generalInfoComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(BasicInfoActivitiesEnum.contactInfo, this.contactInfoActComponent.formGroup);
    this.contactInfoActComponent.formGroup.setParent(this.formGroup);
  }

  onSubmit() {  
    this.transformGroupToModel(); 
    Utilities.log('model - basic info - act: ',this.model);

    let promises = this.basicInfoActService.save(this.model);
    promises.then(res => { 
        this.model.id = (res) ? res.id : this.model.id;
    });

    return promises;
  }

  transformGroupToModel() {
    this.generalInfoComponent.onSubmit();
    this.contactInfoActComponent.onSubmit();
  }

}
