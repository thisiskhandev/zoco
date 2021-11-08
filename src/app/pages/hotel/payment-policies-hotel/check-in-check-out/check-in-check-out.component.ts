import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CheckInCheckOutEnum } from './shared/check-in-check-out.enum';
import { CheckInCheckOutModel } from './shared/check-in-check-out.model';
import { CheckInCheckOutValidator } from './shared/check-in-check-out.validator';
import { TimePickerModel } from './shared/time-picker.model';
import { CheckInCheckOutService } from './shared/check-in-check-out.service';
import { GenericModel } from '@shared/generic-model';
import { Utilities } from '@shared/utilities';
import { CustomValidator } from '@shared/customValidator';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';


@Component({
  selector: 'app-check-in-check-out',
  templateUrl: './check-in-check-out.component.html',
  styleUrls: ['./check-in-check-out.component.css'],
  providers: [ CheckInCheckOutService ]
})
export class CheckInCheckOutComponent extends AbstractGenericFormComponent implements OnInit  {

  @Input() model : CheckInCheckOutModel;
  fromTimeOptions: Array<GenericModel>;
  toTimeOptions: Array<GenericModel>;
  checkInCheckOutEnum: CheckInCheckOutEnum;
  time = {hour: 13, minute: 30};
  
  constructor(private formBuilder: FormBuilder, private checkInCheckOutService: CheckInCheckOutService) { 
    super();
  }

  ngOnInit() {
    this.utilities = new Utilities();
    this.checkInCheckOutEnum = new CheckInCheckOutEnum();
    this.getFromTimeOptions();
    this.getToTimeOptions();
    this.initTimePickers();
    this.initForm();
  }
 
  initForm(): void {    
    this.formGroup = this.formBuilder.group( { 
      checkInFromTimeId: [ this.model.checkInFromTimeId === null ? null : this.model.checkInFromTimeId , Validators.compose([ Validators.required])],
      checkInToTimeId: [ this.model.checkInToTimeId === null ? null : this.model.checkInToTimeId , Validators.compose([ Validators.required])],

      checkOutFromTimeId: [ this.model.checkOutFromTimeId === null ? null : this.model.checkOutFromTimeId , Validators.compose([ Validators.required])],
      checkOutToTimeId: [ this.model.checkOutFromTimeId === null ? null : this.model.checkOutToTimeId , Validators.compose([ Validators.required])],

      checkInFromTime: [ this.model.checkInFromTime === null ? null : this.model.checkInFromTime , Validators.compose([ ])],
      checkInToTime: [ this.model.checkInToTime === null ? null : this.model.checkInToTime , Validators.compose([ ])],

      checkOutFromTime: [ this.model.checkOutFromTime === null ? null : this.model.checkOutFromTime , Validators.compose([ ])],
      checkOutToTime: [ this.model.checkOutToTime  === null ? null : this.model.checkOutToTime , Validators.compose([ ])],
    },
     {
      validator: [CheckInCheckOutValidator.checkInSpecificValueIsInsideRange.bind(this), CheckInCheckOutValidator.checkOutSpecificValueIsInsideRange.bind(this)]
    } 
  );
  }

  getFromTimeOptions(): void {
    this.fromTimeOptions = this.checkInCheckOutEnum.fromTimeOptions;
  }

  getToTimeOptions(): void {
    this.toTimeOptions = this.checkInCheckOutEnum.toTimeOptions;
  }

  initTimePickers(): void {
    this.model.initTimePickerFromCheckIn  = this.checkInCheckOutService.getInitTimePickerFromCheckIn();
    this.model.initTimePickerToCheckIn = this.checkInCheckOutService.getInitTimePickerToCheckIn();
    this.model.initTimePickerFromCheckOut = this.checkInCheckOutService.getInitTimePickerFromCheckOut(); 
    this.model.initTimePickerToCheckOut = this.checkInCheckOutService.getInitTimePickerToCheckOut();
  }

  transformGroupToModel(): void {
    let attribute;
    let timePickerModel: TimePickerModel;
    if(this.isOtherOption(this.checkInCheckOutEnum.checkInFromTimeId)){
      attribute = this.formGroup.get(this.checkInCheckOutEnum.checkInFromTime)  as FormArray;
      timePickerModel = (attribute.value as TimePickerModel)
      this.model.checkInFromTime = TimePickerModel.convertToString(timePickerModel);
    }else {
      attribute = this.formGroup.get(this.checkInCheckOutEnum.checkInFromTimeId)  as FormArray;
      this.model.checkInFromTime = this.fromTimeOptions.find(x => x.id == Number(attribute.value)).name;
    }

    if(this.isOtherOption(this.checkInCheckOutEnum.checkInToTimeId)){
      attribute = this.formGroup.get(this.checkInCheckOutEnum.checkInToTime)  as FormArray;
      timePickerModel = (attribute.value as TimePickerModel)
      this.model.checkInToTime = TimePickerModel.convertToString(timePickerModel);
    }else {
      attribute = this.formGroup.get(this.checkInCheckOutEnum.checkInToTimeId)  as FormArray;
      this.model.checkInToTime = this.toTimeOptions.find(x => x.id == Number(attribute.value)).name;
    }

    if(this.isOtherOption(this.checkInCheckOutEnum.checkOutFromTimeId)){
      attribute = this.formGroup.get(this.checkInCheckOutEnum.checkOutFromTime)  as FormArray;
      timePickerModel = (attribute.value as TimePickerModel)
      this.model.checkOutFromTime = TimePickerModel.convertToString(timePickerModel);
    }else {
      attribute = this.formGroup.get(this.checkInCheckOutEnum.checkOutFromTimeId)  as FormArray;
      this.model.checkOutFromTime = this.fromTimeOptions.find(x => x.id == Number(attribute.value)).name;
    }

    if(this.isOtherOption(this.checkInCheckOutEnum.checkOutToTimeId)){
      attribute = this.formGroup.get(this.checkInCheckOutEnum.checkOutToTime)  as FormArray;
      timePickerModel = (attribute.value as TimePickerModel)
      this.model.checkOutToTime = TimePickerModel.convertToString(timePickerModel);
    }else {
      attribute = this.formGroup.get(this.checkInCheckOutEnum.checkOutToTimeId)  as FormArray;
      this.model.checkOutToTime = this.toTimeOptions.find(x => x.id == Number(attribute.value)).name;
    }

  }

  onSubmit(): CheckInCheckOutModel {
    this.transformGroupToModel();
    return this.model;
  }

  isOtherOption(field: string): boolean {
    const timeControl = this.formGroup.get(field)  as FormArray;
    return (timeControl.value === CheckInCheckOutEnum.fromAndToTimeOtherOptionId );
  }

  checkInFromTimeIsGreaterThanCheckInToTime(): boolean {
    return this.formGroup.invalid &&  this.formGroup.hasError(CheckInCheckOutEnum.checkInFromTimeIsGreaterThanCheckInToTimeError);
  }

  checkOutFromTimeIsGreaterThanCheckOutToTime(): boolean {
    return  this.formGroup.invalid &&  this.formGroup.hasError(CheckInCheckOutEnum.checkOutFromTimeIsGreaterThanCheckOutToTimeError);
  }

}

