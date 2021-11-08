import { Injectable } from '@angular/core';
import { CheckInCheckOutEnum } from './check-in-check-out.enum';
import { TimePickerModel } from './time-picker.model';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class CheckInCheckOutService extends AbstractService {

  checkInCheckOutEnum: CheckInCheckOutEnum = new CheckInCheckOutEnum();

  getInitTimePickerFromCheckIn(): TimePickerModel {
    let otherOptions: TimePickerModel = new TimePickerModel();

    otherOptions.hour = this.checkInCheckOutEnum.timePickerFromCheckInInitHour; 
    otherOptions.minute = this.checkInCheckOutEnum.timePickerInitMinute; 

    return otherOptions;
  }

  getInitTimePickerToCheckIn(): TimePickerModel {
    let otherOptions: TimePickerModel = new TimePickerModel();

    otherOptions.hour = this.checkInCheckOutEnum.timePickerToCheckInInitHour; 
    otherOptions.minute = this.checkInCheckOutEnum.timePickerInitMinute; 

    return otherOptions;
  }

  getInitTimePickerFromCheckOut(): TimePickerModel {
    let otherOptions: TimePickerModel = new TimePickerModel();

    otherOptions.hour = this.checkInCheckOutEnum.timePickerFromCheckOutInitHour; 
    otherOptions.minute = this.checkInCheckOutEnum.timePickerInitMinute; 

    return otherOptions;
  }

  getInitTimePickerToCheckOut(): TimePickerModel {
    let otherOptions: TimePickerModel = new TimePickerModel();

    otherOptions.hour = this.checkInCheckOutEnum.timePickerToCheckOutInitHour; 
    otherOptions.minute = this.checkInCheckOutEnum.timePickerInitMinute; 

      return otherOptions;
  }


}