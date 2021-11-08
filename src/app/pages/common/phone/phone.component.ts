import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter} from '@angular/core';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { CountryService } from './shared/country.service';
import { PhoneEnum } from './shared/phone-enum';
import { Utilities } from '@shared/utilities';
import { CustomValidator } from '@shared/customValidator';
import { Console } from 'console';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent extends AbstractGenericFormComponent implements OnInit, OnChanges {

  // @Input() maxPhoneItems;.
  @Input() maxPhoneItems;
  @Input() phones: Array<string>;
  @Input() labelName: string;
  @Input() countries: Array<any>;
  
  @Output() phone = new EventEmitter<AbstractControl>();

  //countries: Array<any>;
  phoneEnum = PhoneEnum;
  selectUndefinedOptionValue:any;

  nameme: string = "US";

  constructor(private formBuilder: FormBuilder, private countryService: CountryService) {
    super();
  }

  ngOnInit() {
    //this.getCountries();
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
	  for (let name in changes) {
	    if(name == PhoneEnum.phonesInput && this.phones && this.phones.length > this.utilities.emptyLength) {
	      this.initForm();
	      break;
	    }
	  }
	}

  initForm() {
    this.formGroup = this.formBuilder.group( {
      phones: this.formBuilder.array([]),
    })

    if(this.phones && this.phones.length > PhoneEnum.valueZero) {
      this.fillPhones();
    } else { 
      let event: Event;
      this.addPhone(event);
    }

    this.formListener();
  }

  formListener(): void {
    this.formGroup.valueChanges.subscribe( () => {
      this.isValid.emit(this.formGroup.valid);

      this.sendForm();
    });
  }

  sendForm() {
    let formulario: FormGroup = this.formGroup.get(PhoneEnum.phonesInput) as FormGroup;

    if(formulario.valid) {
      this.phone.emit(formulario.controls[0].value);
    }
  }

  onSubmit() {
    this.transformGroupToModel();
    return this.phones;
  }

  transformGroupToModel() {
    this.phones = [];

    let phoneList = this.formGroup.get(PhoneEnum.phonesInput)  as FormArray;

    phoneList.value.forEach(phone => {
        let phoneNumberToSave = PhoneEnum.plus + phone.callingCode as string + PhoneEnum.minus;
        phoneNumberToSave += (phone.phone as string);

        this.phones.push(phoneNumberToSave);
       }); 
  }

  getPhones(): FormGroup {
    return this.formGroup.get(PhoneEnum.phonesInput) as FormGroup;
  }

  addPhone($event): void {
    if ($event) {
      $event.stopPropagation();
    }
    const phones = this.formGroup.get(PhoneEnum.phonesInput) as FormArray;
    if (phones.length < this.maxPhoneItems) {
      phones.push(this.formBuilder.group({
        callingCode: ['',  Validators.required],
        phone: ['',
        Validators.compose([Validators.required, CustomValidator.cellphoneValidator,
          Validators.maxLength(PhoneEnum.phoneNumberMaxSize)])]
      }));
    }
  }

  fillPhones(): void {
    const phonesFG = this.formGroup.get(PhoneEnum.phonesInput) as FormArray;
    const structuredPhoneNumber: Array<string> = PhoneComponent.separateCodeAndPhoneNumbers(this.phones);
    
    phonesFG.push(this.formBuilder.group({
      callingCode: [structuredPhoneNumber[0],  Validators.required],
      phone: [structuredPhoneNumber[this.utilities.one],
      Validators.compose([Validators.required, CustomValidator.cellphoneValidator,
        Validators.maxLength(PhoneEnum.phoneNumberMaxSize)])]
    }));
  }

  static separateCodeAndPhoneNumbers(phoneNumber: any): Array<string> {
    let structuredPhoneNumber: Array<string> = new Array<string>();
    let utilities = new Utilities();
    if(phoneNumber && phoneNumber.phone_number) {
      structuredPhoneNumber = phoneNumber.phone_number.split(PhoneEnum.minus);
      structuredPhoneNumber[utilities.emptyLength] = structuredPhoneNumber[utilities.emptyLength].slice(PhoneEnum.valueOne);
    } else if (phoneNumber) {
      structuredPhoneNumber = phoneNumber.split(PhoneEnum.minus);
      structuredPhoneNumber[utilities.emptyLength] = structuredPhoneNumber[utilities.emptyLength].slice(PhoneEnum.valueOne);
    }
    return structuredPhoneNumber;
  }

  static unifyCodeAndPhoneNumbers(codeNumber: string, phoneNumber: string): string {
    return PhoneEnum.plus + codeNumber  + PhoneEnum.minus + phoneNumber;
  }

  removePhone(i) {
    const phones = this.formGroup.get(PhoneEnum.phonesInput) as FormArray;
    phones.removeAt(i);
  }

  cleanPhones(): void {
  (<FormArray>this.formGroup.get(PhoneEnum.phonesInput)).controls.forEach(element => {
    element.get(PhoneEnum.callingCode).setValue('');
    element.get(PhoneEnum.phone).setValue('');
    element.get(PhoneEnum.callingCode).markAsUntouched();
    element.get(PhoneEnum.phone).markAsUntouched();
  });}

}
