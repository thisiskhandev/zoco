import {AbstractControl, ValidationErrors, Validator, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray  } from '@angular/forms';
import { Directive } from '@angular/core';
import { Utilities } from '@shared/utilities';
import { BreakfastModel } from './breakfast-model';
import { BreakfastEnum } from './breakfast-enum';

@Directive({
  selector: '[breakfast-validator]',
})
export class BreakfastValidator {

  static checkIsPriceNeeded(formGroup: FormGroup) {

    if (formGroup.get(BreakfastEnum.breakfastType).value === true 
    && (!formGroup.get(BreakfastEnum.breakfastPrice).valid
    || !formGroup.get(BreakfastEnum.breakfastPrice).value)) {
      
          return {
            priceIsNeeded: true 
          };
        }
    }


    static hasAnyBreakfastSelected(group: AbstractControl): ValidationErrors {      
      let checkboxes = group.value as Array<any>;
      let isAnySelected: boolean = false;
      checkboxes.forEach(checkbox => {

        if(checkbox.breakfastType){
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
}
