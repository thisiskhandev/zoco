import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactPhonesEnum } from  './shared/contact-phones.enum';
import { CountryService } from '../../../hotel/basic-information-hotel/shared/country.service';
import { PhoneEnum } from '@commons/phone/shared/phone-enum';
import { CustomValidator } from '@shared/customValidator';
import { PhoneComponent } from '@commons/phone/phone.component';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-contact-phones',
  templateUrl: './contact-phones.component.html',
  styleUrls: ['./contact-phones.component.css'],
  providers: [  CountryService ]
})
export class ContactPhonesComponent extends AbstractGenericFormComponent implements OnInit {

  countries: Array<any>;
  contactInfoEnum = ContactPhonesEnum;
  phoneEnum = PhoneEnum;
  customValidator = CustomValidator;
  
  constructor(private formBuilder: FormBuilder,
    private countryService: CountryService) {
    super();
  }

  ngOnInit() {
    this.getCountries();
    this.initForm();
  }

  getCountries(): void {
    this.countries = [];
    this.countryService.getPaises().subscribe(val => val.forEach(country => {
      if(country.callingCodes[ContactPhonesEnum.firstCallingCode]) {
        this.countries.push({'callingCode': country.callingCodes[PhoneEnum.valueZero], 'countryName': country.name,  'iataCode': country.alpha2Code  });
      }
    }));
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }

  transformGroupToModel(): void {
    this.model.officePhone = PhoneComponent.unifyCodeAndPhoneNumbers(this.model.countryCallingCodeOfficePhone, this.model.officePhoneNumber);
    this.model.twentyFourHourPhone =  PhoneComponent.unifyCodeAndPhoneNumbers(this.model.countryCallingCodeTwentyFourHourPhone, this.model.twentyFourHourPhoneNumber);
  }

  onSubmit(): void {
    this.transformGroupToModel();
  }

}
