import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ContactDetailEnum } from './shared/contactdetail-enum';
import { FormBuilder, FormArray, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { HotelService } from '../../shared/hotel.service';
import { ContactDetailModel } from './shared/contactdetail-model';
import { Utilities } from '@shared/utilities';
import { CustomValidator } from '@shared/customValidator';
import { BasicInformationEnum } from '../shared/basic-information-enum';
// import { PhoneComponent } from '@commons/phone/phone.component';
import { AbstractHotelGenericFormComponent } from '@hotel/shared/abstract-hotel-generic-form.component';
import { CountryService } from '../shared/country.service';
import { GenericContactDetailModel } from './shared/generic-contact-model';
import { GenericContactComponent } from './generic-contact/generic-contact.component';


@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.css'],
  providers: [ HotelService, CountryService ]
})
export class ContactdetailComponent extends AbstractHotelGenericFormComponent implements OnInit, AfterViewInit {

  // @ViewChild (PhoneComponent) phoneComponent;

  BasicInformationEnum: typeof BasicInformationEnum = BasicInformationEnum;
  ContactDetailEnum: typeof ContactDetailEnum = ContactDetailEnum;
  maxPhoneItems = ContactDetailEnum.maxPhoneItems;
  modelAux: any;
  prefix: Array<string> = ["cc", "ca", "cp", "cr"];
  CCmodel: any;
  CAmodel: any;
  CPmodel: any;
  CRmodel: any;
  CDmodel: any;

  ref: GenericContactComponent;


  constructor(private formBuilder: FormBuilder, private hotelService: HotelService, private contactdetailService: CountryService) { 
    super();    
    this.model = new ContactDetailModel();
    this.CCmodel = {};
    this.CAmodel = {};
    this.CPmodel = {};
    this.CRmodel = {};
    this.CDmodel = {};

    this.initForm();
  }

  ngOnInit() {

    this.viewChildComponentsStatus = new Array<boolean>();

    for(let i = 0; i < ContactDetailEnum.childComponentQuantity; i++) {
      this.viewChildComponentsStatus.push(false);
    }
  }

  ngAfterViewInit() {
    // this.formGroup.addControl(ContactDetailEnum.phone, this.phoneComponent.formGroup);
    // this.phoneComponent.formGroup.setParent(this.formGroup); 
  }  

  initForm() {
    this.formGroup = this.formBuilder.group( {
      isCompanyManagement: [this.model.isCompanyManagement, Validators.required],
      haveChannelManager: [this.model.haveChannelManager, Validators.required],
      companyManagementName: [this.model.companyManagementName],
      channelManagerName: [this.model.channelManagerName],
    });

    for(let prefix of this.prefix) {
      this.setModel(prefix);
    }

    this.formListener();
  }

  formListener(): void {
    this.formGroup.valueChanges.subscribe( () => {
      this.isFormValid();
    });
  }

  setValid(validPosition: number, value: boolean): void {
    this.viewChildComponentsStatus[validPosition] = value;
    
    this.isFormValid();
  }

  isFormValid(): boolean {

    console.log("this.formGroup.valid NORMAL normalll");
    console.log(this.formGroup.valid);

    console.log("this.viewChildComponentsStatus normalll");
    console.log(this.viewChildComponentsStatus);

    console.log("this.isEveryChildComponentValid normalll");
    console.log(this.isEveryChildComponentValid());

    if( (this.formGroup.valid) && (this.isEveryChildComponentValid()) ) {
      console.log("entre if emitir");

      this.isValid.emit(true);

      return true;
    }
    else {
      console.log("entre else emitir");

      this.isValid.emit(false);

      return false;
    }
  }

  setModel(prefix: string): void {
    for(let attribute in this.model) {
      if(attribute.indexOf(prefix) != -1) {
        if(prefix === this.ContactDetailEnum.comercialContact) {
          this.CCmodel[attribute] = this.model[attribute];
        }
        else if(prefix === this.ContactDetailEnum.administrativeContact) {
          this.CAmodel[attribute] = this.model[attribute];
        }
        else if(prefix === this.ContactDetailEnum.payContact) {
          this.CPmodel[attribute] = this.model[attribute];
        }
        else if(prefix === this.ContactDetailEnum.reservationContact) {
          this.CRmodel[attribute] = this.model[attribute];
        }
      }
    }
  }

  eventManagement(model: any, prefix: string) {

    if(prefix === this.ContactDetailEnum.comercialContact) {
      for(let attribute in model) {
        this.CCmodel[attribute] = model[attribute];
      }
    }
    else if(prefix === this.ContactDetailEnum.administrativeContact) {
      for(let attribute in model) {
        this.CAmodel[attribute] = model[attribute];
      }
    }
    else if(prefix === this.ContactDetailEnum.payContact) {
      for(let attribute in model) {
        this.CPmodel[attribute] = model[attribute];
      }
    }
    else if(prefix === this.ContactDetailEnum.reservationContact) {
      for(let attribute in model) {
        this.CRmodel[attribute] = model[attribute];
      }
    }

    console.log("this.CCmodel");
    console.log(this.CCmodel);

    console.log("this.CAmodel");
    console.log(this.CAmodel);

    console.log("this.CPmodel");
    console.log(this.CPmodel);

    console.log("this.CRmodel");
    console.log(this.CRmodel);

    console.log("this.model");
    console.log(this.model);

  }

  fillModel(model: any): void {
    for(let attribute in model) {
      this.model[attribute] = model[attribute];
    }
  }

  applyOffset(): boolean {
    if( this.formGroup.get('haveChannelManager').value === 'true' && !this.formGroup.get('isCompanyManagement').value ) {
      return true;
    }

    if(this.formGroup.get('haveChannelManager').value === 'true' && this.formGroup.get('isCompanyManagement').value === 'false' ) {
      return true;
    }
    
    return false;
  }

  onSubmit() {
    if(this.isFormValid()) {
      
      this.setModelAux();
      
      this.transformGroupToModel();
    }
  }

  setModelAux(): void {
    this.modelAux = {
      isCompanyManagement: "",
      companyManagementName: "",
      haveChannelManager: "",
      channelManagerName: ""
    }

    if(this.formGroup.get(ContactDetailEnum.isCompanyManagement).value === ContactDetailEnum.falseString) {
      delete this.modelAux[ContactDetailEnum.companyManagementName];
    }

    if(this.formGroup.get(ContactDetailEnum.haveChannelManager).value === ContactDetailEnum.falseString) {
      delete this.modelAux[ContactDetailEnum.channelManagerName];
    }
  }

  // The control is reset to put "dirty = false", while preserving the initial value
  resetFormField(formField: AbstractControl, control: string): void {
    formField.reset();
    formField.setValue(this.CDmodel[control]);
    this.formGroup.setControl(control, formField);
  }

  pushArrayInModel(formField: AbstractControl, control: string): void {

    this.CDmodel[control] = [];

    for(let i = 0; i < formField.value.length; i++)
      this.CDmodel[control].push(formField.value[i]);
  
  }
  
  transformGroupToModel(): void {

    if(this.formGroup.dirty) {  
      let formField: AbstractControl;

      for(let attribute in this.modelAux) {
          formField = this.formGroup.get(attribute) as FormArray;
          
          if(formField.dirty) {
            if(typeof formField.value != "object") {
              this.CDmodel[attribute] = formField.value;
            }
            else if( Array.isArray(formField.value) ) {
              this.pushArrayInModel(formField, attribute);
            }
            
            this.resetFormField(formField, attribute);
          }
          else {
            delete this.CDmodel[attribute];
          }
      }
    } 
    else {
      this.CDmodel = {};

      console.log("Invalid form or has not been modified. CONTACT DETAIL");
      console.log(this.formGroup);
    }

    this.model = {};

    this.fillModel(this.CCmodel);

    this.fillModel(this.CAmodel);

    this.fillModel(this.CPmodel);

    this.fillModel(this.CRmodel);

    this.fillModel(this.CDmodel);

    this.clearModels();
  }

  clearModels(): void {
    this.CCmodel = {};
    this.CAmodel = {};
    this.CPmodel = {};
    this.CRmodel = {};
    this.CDmodel = {};
  }
  
  // Agregar/añadir o quitar controles al formGroup
  setFormGroupFields(fieldName: string, formFroupFieldName: string): void {
    if (this.formGroup.get(fieldName).value === Utilities.trueString) {
      let control: AbstractControl = new FormControl();
      
      this.formGroup.addControl(formFroupFieldName, control);

      this.formGroup.controls[formFroupFieldName].setValidators( [Validators.required, Validators.maxLength(ContactDetailEnum.inputMaxSize)] );
    } 
    else {
      let control: AbstractControl = new FormControl();

      this.formGroup.removeControl(formFroupFieldName);
    
      this.formGroup.addControl(formFroupFieldName, control);
    }
  }
}