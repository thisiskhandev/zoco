import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AddressInfoEnum } from './shared/address-info.enum';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';


@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css']
})
export class AddressInfoComponent extends AbstractGenericFormComponent implements OnInit {

  addressInfoEnum = AddressInfoEnum;
  
  constructor(private formBuilder: FormBuilder) {
    super();
   }

   ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }
}
