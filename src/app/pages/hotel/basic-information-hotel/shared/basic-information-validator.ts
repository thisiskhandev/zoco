import {AbstractControl, ValidationErrors } from '@angular/forms';
import { Utilities } from '@shared/utilities';
import { Directive } from '@angular/core';
import { HotelService } from '../../shared/hotel.service';
@Directive({
    selector: '[basic-information-validator]',
    providers: [ HotelService ]
  })

export class BasicInformationValidator {

  private hotelService: HotelService

  constructor() {


  } 

    static hasAnySelected(group: AbstractControl): ValidationErrors {
      
      let checkboxes = group.value as Array<boolean>;
      let isAnySelected: boolean = false;
      checkboxes.forEach(checkbox => {
        if(checkbox){
          isAnySelected = true;
          return;
        }
      });


      if(!isAnySelected) {
        return {
          isNonSelected: true
        };
      }
    }

    static isNameAvailable(hotelService: HotelService): ValidationErrors {
      return (control: AbstractControl) => {
        return hotelService.isEstablishmentNameAvailable(control.value).map(isEstablishmentNameAvailable => {
          let isEstablishmentNameAvailableString = String(isEstablishmentNameAvailable);
          return (isEstablishmentNameAvailableString === Utilities.trueString) ? {} : { EstablishNameIsNotAvailable: true };
        });
      };
    }
}