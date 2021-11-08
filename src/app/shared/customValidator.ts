import {AbstractControl, ValidationErrors, Validator } from '@angular/forms';

import { Directive } from '@angular/core';
import { Utilities } from '@shared/utilities';

@Directive({
    selector: '[custom-validator]',
  })

export class CustomValidator {
    static numberRegExp = /^([0-9])*$/;
    static numberRegExpString = '^([0-9])*$';
    static emailRegexp = /^[A-za-z0-9._-]+@[A-za-z0-9-]+(\.+[A-za-z]{2,3}){1,3}$/;
    static emailRegexpString = '^[A-za-z0-9._-]+@[A-za-z0-9-]+(\.+[A-za-z]{2,3}){1,3}$';
    static numberMajorZeroRegExp = '[1-9][0-9]*$';
    
    static customEmailValidator(control: AbstractControl): ValidationErrors {
        
        if (control.value && !CustomValidator.emailRegexp.test(control.value)) {
          return { invalidemail: true };
        }
     }

    static cellphoneValidator(control: AbstractControl): ValidationErrors {
      const cellphone = /^([0-9])*$/;
      const specialCharacters = /[$&+,:;=?@#\|'<>\^\*\(\)|-|\.%!]/; //
      if (control.value && !cellphone.test(control.value)||(control.value && specialCharacters.test(control.value))) {
        return { invalidcellphone: true };
      }
    }
    
    static namesValidator(control: AbstractControl): ValidationErrors {
      const name = /[A-Za-z0-9\-\ \u00d1\u00f1Á-ÿ]{1,25}$/;
      if (control.value && !name.test(control.value)) {
        return { invalidname: true };
      }
    }

    static countryValidator(control: AbstractControl): ValidationErrors {
      const country = /(^[A-Za-z\s]{2,15}$)|((^[A-Za-z]{2,10})[-][A-Za-z]{2,10}$)|((^[A-Za-z]{2,10}) [A-Za-z]{2,10}$)/;
      if (control.value && !country.test(control.value)) {
        return { invalidcountry: true };
      }
    }

    static minLengthArray(min: number) {
      return (c: AbstractControl): {[key: string]: any} => {
          if (c.value.length >= min)
              return null;
  
          return { 'minLengthArray': {valid: false }};
      }
    }

    static onlyNumberValidator(control: AbstractControl): ValidationErrors {
      
      if (control.value && !CustomValidator.numberRegExp.test(control.value)) {
        return { invalidNumber: true };
      }
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

    static valueGreaterZeroValidator(control: AbstractControl): ValidationErrors {
      if(control.value && control.value == 0)
        return { invalidValue: true };
    }

    static valueGreaterStringZeroValidator(control: AbstractControl): ValidationErrors {
      if(control.value && control.value == Utilities.emptyLengthString)
        return { invalidValue: true };
    }

}