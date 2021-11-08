import { Component, OnInit, ViewChild, Input, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ContactInfoEnum, DataContactInfo } from './shared/contact-info.enum';
import { ContactInfoModel } from './shared/contact-info.model';
import { CustomValidator } from '@shared/customValidator';
import { Utilities } from '@shared/utilities';
import { GenericModel } from '@shared/generic-model';
import { PhoneComponent } from '@commons/phone/phone.component';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent extends AbstractGenericFormComponent implements OnInit {

  @Input("maxContacts") maxContacts;
  @ViewChild (PhoneComponent) phoneComponent;
  @ViewChildren(PhoneComponent) phonesList: QueryList<PhoneComponent>;
  contactInfoActEnum = ContactInfoEnum;
  typeContactOptions: Array<GenericModel>;
  maxPhoneItems = ContactInfoEnum.maxPhoneItems;
  customValidator = CustomValidator;
  
  constructor(private formBuilder: FormBuilder, private cdRef:ChangeDetectorRef) { 
    super();
  }

  ngOnInit() {
    this.typeContactOptions = DataContactInfo.typeContactInfoArray;
    this.initForm();
  }

  ngAfterViewInit() {
    if(!this.model){
      this.model = new Array <ContactInfoModel>();
      this.model.push(new ContactInfoModel());
      Utilities.log('ngAfterViewInit: ', this.model);
    }
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);  
  }

  addContact(event) {
    if (event) {
      event.stopPropagation();
    }
    this.model.push(new ContactInfoModel());
  }

  removeContact(index : number) {
    this.model.splice(index, this.utilities.one);
    this.phonesList.toArray()[index].removePhone(this.utilities.emptyLength);
  }
  
  ngAfterViewChecked() {
    this.cdRef.detectChanges();    
    this.phonesList.changes.subscribe((comps: QueryList <PhoneComponent>) => {
      for(let i=0; i<comps.toArray().length; i++) {
        // TODO: Se debe agregar el componente a la forma si se desea validar el llenado correcto this.formGroup.addControl(ContactInfoEnum.phones+i, comps.toArray()[i].formGroup); 
        // y luego borrarlo del form si se borra un contacto.
        this.phonesList.toArray()[i].formGroup.setParent(this.formGroup);                
      }
    });
  }
  
  onSubmit() {
    this.transformGroupToModel();
  }

  transformGroupToModel(): void {
    this.model.forEach((contact, i) => {   
      contact.phoneNumber = this.phonesList.toArray()[i].onSubmit();
    });
  }
}
