import { FormBuilder, FormArray, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

import { AbstractHotelGenericFormComponent } from '@hotel/shared/abstract-hotel-generic-form.component';
import { BasicInformationEnum } from '@hotel/basic-information-hotel/shared/basic-information-enum';
import { ContactDetailEnum } from '../shared/contactdetail-enum';
import { CustomValidator } from '@shared/customValidator';
import { GenericContactDetailModel } from '../shared/generic-contact-model';


// Services
import { CountryService } from '@hotel/basic-information-hotel/shared/country.service';

@Component({
  selector: 'app-generic-contact',
  templateUrl: './generic-contact.component.html',
  styleUrls: ['./generic-contact.component.css'],
  providers: [CountryService]
})
export class GenericContactComponent extends AbstractHotelGenericFormComponent implements OnInit, OnChanges{

  @Input() model: any;
  @Input() contactName: string;
  @Input() prefix: string;

  @Output() form = new EventEmitter<any>();

  formFieldsArray: Array<any> = [ContactDetailEnum.home_address, ContactDetailEnum.country, ContactDetailEnum.state, ContactDetailEnum.city, ContactDetailEnum.zip];
  BasicInformationEnum: typeof BasicInformationEnum = BasicInformationEnum;
  ContactDetailEnum: typeof ContactDetailEnum = ContactDetailEnum;
  maxPhoneItems = ContactDetailEnum.maxPhoneItems;
  phonesModel: Object = {};
  modelAux: any;
  countries: any;
  states: any;
  phoneCountries: Array<any>;


  constructor(private formBuilder: FormBuilder, private contactdetailService: CountryService) { 
    super();
  }

  ngOnInit(): void { 
    this.initForm();

    this.getCountries();
    this.getPhoneCountries();

    this.viewChildComponentsStatus = new Array<boolean>();

    for(let i = 0; i < ContactDetailEnum.genericChildComponentQuantity; i++) {
      this.viewChildComponentsStatus.push(false);
    }
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group( {
      name: [this.model[`${this.prefix}_name`], Validators.compose([Validators.required, Validators.maxLength(ContactDetailEnum.responsibleNameInputMaxSize)])],
      last_name: [this.model[`${this.prefix}_last_name`], Validators.compose([Validators.required, Validators.maxLength(ContactDetailEnum.responsibleNameInputMaxSize)])],
      email: [this.model[`${this.prefix}_email`], Validators.compose([ Validators.required, CustomValidator.customEmailValidator, Validators.maxLength(ContactDetailEnum.emailInputMaxSize)])],
      different_address: [this.model[`${this.prefix}_different_address`], Validators.required],
      home_address: [this.model[`${this.prefix}_home_address`]],
      country: [this.model[`${this.prefix}_country`]],
      state: [this.model[`${this.prefix}_state`]],
      city: [this.model[`${this.prefix}_city`]],
      zip: [this.model[`${this.prefix}_zip`]],
    });

    //this.formListener();
  }

  formListener(): void {
    this.formGroup.valueChanges.subscribe( () => {
      this.isFormValid();
    });
  }

  setFormGroupFields(fieldName: string): void {
    for(let formFroupFieldName of this.formFieldsArray) {
      if (this.formGroup.get(fieldName).value === ContactDetailEnum.trueString) {
        let control: AbstractControl = new FormControl();
      
        this.formGroup.addControl(formFroupFieldName, control);

        this.formGroup.controls[formFroupFieldName].setValidators(Validators.required);
      }
      else {
        let control: AbstractControl = new FormControl();

        this.formGroup.removeControl(formFroupFieldName);
      
        this.formGroup.addControl(formFroupFieldName, control);
      }
    }
    this.isFormValid();
  }

  setValid(validPosition: number, value: boolean): void {
    this.viewChildComponentsStatus[validPosition] = value;
    
    this.isFormValid();
  }

  isFormValid(): void {
    if( (this.formGroup.valid) && (this.isEveryChildComponentValid()) ) {
      this.onSubmit();
      this.isValid.emit(true);
    }
    else {
      this.isValid.emit(false);
    }
  }

  onSubmit(): void {
    if(this.formGroup.valid) {
      this.setModelAux();

      this.transformGroupToModel();

      console.log("this.model");
      console.log(this.model);
      
      this.form.emit(this.model);
    }
  }

  setModelAux(): void {
    this.modelAux = new GenericContactDetailModel;

    // if(this.formGroup.get(ContactDetailEnum.different_address).value === ContactDetailEnum.falseString) {
    //   for(let attribute of this.formFieldsArray) {
    //     delete this.modelAux[attribute];
    //   }
    // }
  }

  transformGroupToModel(): void {
    console.log("this.formGroup GGGGGGGGGGGGGGGGG");
    console.log(this.formGroup);
    console.log(this.modelAux);

    if(this.formGroup.dirty) {  
      let formField: AbstractControl;

      for(let attribute in this.modelAux) {
        let formControlName: string = attribute;
        attribute = `${this.prefix}_${attribute}`;
        
        formField = this.formGroup.get(formControlName) as FormArray;

        console.log("formControlName GGGGGGGGGGGGGGGGGG");
        console.log(formControlName);

        console.log("attribute GGGGGGGGGGGGGGGGGG");
        console.log(attribute);

        console.log("formField GGGGGGGGGGGGGGGGG");
        console.log(formField);

        if(formField.dirty) {
          if(typeof formField.value != "object") {
            this.model[attribute] = formField.value;
          }
          else if( Array.isArray(formField.value) ) {
            this.pushArrayInModel(formField, attribute);
          }
          
          this.resetFormField(formField, attribute);
        }
        else {
          delete this.model[attribute];
        }
      }
    } 
    else {
      for(let attribute in this.model) {
         delete this.model[attribute];
      }
        console.log("Invalid form or has not been modified. CONTACT DETAIL GENERIC COMPONENT");
        console.log(this.formGroup);
    }

    if(Object.entries(this.phonesModel).length != 0) {
      for(let property in this.phonesModel) {
        this.model[property] = this.phonesModel[property];
      }
    }
  }

  getPhoneCountries() {
    this.phoneCountries = [];
    this.contactdetailService.getPaises().subscribe((val:any) => 
      { 
        val.forEach(country => {
          const countryArray = country as Array<string>;
          if(country.callingCodes[0]) {
            if(country.name != "Canada") {
              this.phoneCountries.push({'callingCode': country.callingCodes[0], 'countryName': country.name, 'iataCode': country.alpha2Code  });
            }
            else {
              country.callingCodes[0] = 11;
              this.phoneCountries.push({'callingCode': country.callingCodes[0], 'countryName': country.name, 'iataCode': country.alpha2Code  });
            }
          }
        });
    });
  }

  setPhone(phone: any, prefix: string) {
    let property: string = `${this.prefix}_${prefix}phone_number`;
    let value: string = `+${phone.callingCode}-${phone.phone}`;

    this.phonesModel[property] = value;
  }  

  resetAddresFields(): void {
    let fields: Array<string> = [`home_address`, `country`, `state`, `city`, `zip`];

    for(let field of fields)
      if(this.formGroup.controls[field].dirty)
        this.formGroup.controls[field].reset();
  }

  resetFormField(formField: AbstractControl, control: string): void {
    let formControlName = control.replace(`${this.prefix}_`, '');

    formField.reset();
    formField.setValue(this.model[control]);
    this.formGroup.setControl(formControlName, formField);
  }

  pushArrayInModel(formField: AbstractControl, control: string): void {
    this.model[control] = [];

    for(let i = 0; i < formField.value.length; i++) {
      this.model[control].push(formField.value[i]);
    }
  }

  getCountries() {
    this.contactdetailService.getCountries().subscribe(
      (response: any) => {
        this.countries = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getStates(countryID: string) {
    this.contactdetailService.getStatesByCountry(countryID).subscribe(
      (response: any) => {
        this.states = response;
      },
      error => {
        console.log(error);
      }
    );

    this.onSubmit();
  }
}

