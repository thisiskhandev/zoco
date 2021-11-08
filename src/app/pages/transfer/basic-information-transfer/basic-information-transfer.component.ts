import { Component, OnInit, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BasicInformationTransferModel } from './shared/basic-information-transfer.model';
import { BasicInformationTransferEnum } from './shared/basic-information-transfer.enum';
import { AddressInfoComponent } from './address-info/address-info.component';
import { ContactPhonesComponent } from './contact-phones/contact-phones.component';
import { NameDetailsComponent } from './name-details/name-details.component';
import { ContactInfoComponent } from '@commons/contact-info/contact-info.component';
import { TransferService } from "./shared/transfer.service";
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { Utilities } from '@shared/utilities';
import { PhoneComponent } from '@commons/phone/phone.component';
import { PhoneEnum } from '@commons/phone/shared/phone-enum';

@Component({
  selector: 'app-basic-information-transfer',
  templateUrl: './basic-information-transfer.component.html',
  styleUrls: ['./basic-information-transfer.component.css'],
  providers: [ TransferService ]
})
export class BasicInformationTransferComponent extends AbstractGenericParentComponent implements OnInit,  AfterViewInit  {

  basicInformationTransferEnum = BasicInformationTransferEnum;
  maxContacts = BasicInformationTransferEnum.maxContacts;
  @ViewChild (NameDetailsComponent) nameDetailsComponent;
  @ViewChild (AddressInfoComponent) addressInfoComponent;
  @ViewChild (ContactPhonesComponent) contactPhoneComponent;
  @ViewChild (ContactInfoComponent) contactInfoComponent;


  constructor(private formBuilder: FormBuilder, private transferService: TransferService) {
    super();
   }

  ngOnInit(): void {
    this.model = new BasicInformationTransferModel();
    this.formGroup = this.formBuilder.group( {
      id: [this.model.id]
    });
  }

  ngAfterViewInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group( {
    });

    this.formGroup.addControl(BasicInformationTransferEnum.nameDetails , this.nameDetailsComponent.formGroup);
    this.nameDetailsComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(BasicInformationTransferEnum.addressInfo , this.addressInfoComponent.formGroup);
    this.addressInfoComponent.formGroup.setParent(this.formGroup);
 

    this.formGroup.addControl(BasicInformationTransferEnum.contactInfo , this.contactPhoneComponent.formGroup);
    this.contactPhoneComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(BasicInformationTransferEnum.contactInfoActComponent , this.contactInfoComponent.formGroup);
    this.contactInfoComponent.formGroup.setParent(this.formGroup);
  }
  

  transformGroupToModel(): void {
    this.contactPhoneComponent.onSubmit();
    this.contactInfoComponent.onSubmit();
  }

  onSubmit() {
    this.transformGroupToModel();
    let result = this.transferService.saveBasicInfo(this.model);
    result.then(res => { 
      this.model.id = (res) ? res.id: this.model.id; 
      this.setStructuredPhoneData();
    });
    return result;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == BasicInformationTransferEnum.completeInfoVariableName && this.completeInfo) {
        this.model.setData(this.completeInfo.basicInfo);
        this.setStructuredPhoneData();
        Utilities.log('Basic Info Cargado: ',this.model);
        break;
      }
    }
  }  

  setStructuredPhoneData(): void {
    let structuredPhone: Array<string> = PhoneComponent.separateCodeAndPhoneNumbers(this.model.contactPhones.officePhone);
    this.model.contactPhones.countryCallingCodeOfficePhone = structuredPhone[this.utilities.emptyLength]+PhoneEnum.minus+structuredPhone[this.utilities.one];
    this.model.contactPhones.officePhoneNumber = structuredPhone[this.utilities.two];
    
    structuredPhone = (this.model.contactPhones.twentyFourHourPhone)  ? PhoneComponent.separateCodeAndPhoneNumbers(this.model.contactPhones.twentyFourHourPhone) 
                  : null;
    this.model.contactPhones.countryCallingCodeTwentyFourHourPhone = (structuredPhone) ? structuredPhone[this.utilities.emptyLength]+PhoneEnum.minus+structuredPhone[this.utilities.one]
                  : null;
    this.model.contactPhones.twentyFourHourPhoneNumber = (structuredPhone) ? structuredPhone[this.utilities.two]
                  : null;
  }

}
