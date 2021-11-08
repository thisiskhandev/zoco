import { FormGroup, FormArray  } from '@angular/forms';
import { Directive } from '@angular/core';
import { CheckInCheckOutEnum } from './check-in-check-out.enum';
import { CheckInCheckOutModel } from './check-in-check-out.model';
import { TimePickerModel } from './time-picker.model';

@Directive({
  selector: '[check-in-check-out-validator]',
})
export class CheckInCheckOutValidator {

  static checkInSpecificValueIsInsideRange(formGroup: FormGroup) {
    if(formGroup !== null) {
      const model = CheckInCheckOutValidator.transformGroupToModel(formGroup);

      if(Date.parse(CheckInCheckOutEnum.dateDummy+model.checkInFromTime) > Date.parse(CheckInCheckOutEnum.dateDummy+model.checkInToTime)) {
        return {
          checkInFromTimeIsGreaterThanCheckInToTime: true
        };
      }
    }
  }

  static checkOutSpecificValueIsInsideRange(formGroup: FormGroup) {
    if(formGroup !== null) {
      const model = CheckInCheckOutValidator.transformGroupToModel(formGroup);

      if(Date.parse(CheckInCheckOutEnum.dateDummy+model.checkOutFromTime) > Date.parse(CheckInCheckOutEnum.dateDummy+model.checkOutToTime)) {
        return {
          checkOutFromTimeIsGreaterThanCheckOutToTime: true
        };
      }
    }
  }

  static transformGroupToModel(formGroup: FormGroup): CheckInCheckOutModel {
    let model = new CheckInCheckOutModel();
    let hotelAttribute;
    let timePickerModel: TimePickerModel;
    let checkInCheckOutEnum: CheckInCheckOutEnum = new CheckInCheckOutEnum();

    if(CheckInCheckOutValidator.isOtherOption(checkInCheckOutEnum.checkInFromTimeId, formGroup)){
      hotelAttribute = formGroup.get(checkInCheckOutEnum.checkInFromTime)  as FormArray;
      if(hotelAttribute.value !== null) {
        timePickerModel = (hotelAttribute.value as TimePickerModel)
        model.checkInFromTime = TimePickerModel.convertToString(timePickerModel);
      } 
    }else {
      hotelAttribute = formGroup.get(checkInCheckOutEnum.checkInFromTimeId)  as FormArray;
    
      if(hotelAttribute.value !== null) {
        model.checkInFromTime =   checkInCheckOutEnum.fromTimeOptions.find(x => x.id == Number(hotelAttribute.value)).name;
      } 
    }

    if(CheckInCheckOutValidator.isOtherOption(checkInCheckOutEnum.checkInToTimeId, formGroup)){
      hotelAttribute = formGroup.get(checkInCheckOutEnum.checkInToTime)  as FormArray;
      if(hotelAttribute.value !== null) {
        timePickerModel = (hotelAttribute.value as TimePickerModel)
        model.checkInToTime = TimePickerModel.convertToString(timePickerModel);
      }
    }else {
      hotelAttribute = formGroup.get(checkInCheckOutEnum.checkInToTimeId)  as FormArray;
     
      if(hotelAttribute.value !== null) {
        model.checkInToTime = checkInCheckOutEnum.toTimeOptions.find(x => x.id == Number(hotelAttribute.value)).name;
      }  
    }

    if(CheckInCheckOutValidator.isOtherOption(checkInCheckOutEnum.checkOutFromTimeId, formGroup)){
      hotelAttribute = formGroup.get(checkInCheckOutEnum.checkOutFromTime)  as FormArray;
      if(hotelAttribute.value !== null) {
        timePickerModel = (hotelAttribute.value as TimePickerModel)
        model.checkOutFromTime = TimePickerModel.convertToString(timePickerModel);
      }
    } else {
      hotelAttribute = formGroup.get(checkInCheckOutEnum.checkOutFromTimeId)  as FormArray;
      
      if(hotelAttribute.value !== null) {
        model.checkOutFromTime = checkInCheckOutEnum.fromTimeOptions.find(x => x.id == Number(hotelAttribute.value)).name;
      }
    }

    if(CheckInCheckOutValidator.isOtherOption(checkInCheckOutEnum.checkOutToTimeId, formGroup)){
      hotelAttribute = formGroup.get(checkInCheckOutEnum.checkOutToTime)  as FormArray;
      
      if(hotelAttribute.value !== null) {
        timePickerModel = (hotelAttribute.value as TimePickerModel)
        model.checkOutToTime = TimePickerModel.convertToString(timePickerModel);
      }
    } else {
      hotelAttribute = formGroup.get(checkInCheckOutEnum.checkOutToTimeId)  as FormArray;
      
      if(hotelAttribute.value !== null) {
        model.checkOutToTime = checkInCheckOutEnum.toTimeOptions.find(x => x.id == Number(hotelAttribute.value)).name;
      }
    }
    return model;
  }

  static isOtherOption(field: string, formGroup: FormGroup): boolean {
    const timeControl = formGroup.get(field)  as FormArray;
    return (timeControl.value === CheckInCheckOutEnum.fromAndToTimeOtherOptionId );
  }


}