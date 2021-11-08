import { Component, OnInit, Input } from '@angular/core';
import { ExtraChargesPricesEnum } from './shared/extra-charges-prices-enum';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { GenericModel } from '@shared/generic-model';
import { ExtraChargesPricesModel } from './shared/extra-charges-prices-model';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-extra-charges-prices',
  templateUrl: './extra-charges-prices.component.html',
  styleUrls: ['./extra-charges-prices.component.css']
})
export class ExtraChargesPricesComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : Array<ExtraChargesPricesModel>;
  extraChargesPricesEnum = ExtraChargesPricesEnum;

  constructor(private formBuilder: FormBuilder) { 
    super();    
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group( {
      priceCharge : this.formBuilder.array([]), 
    });
  }

  charges(chargesList){
    let len = this.model.length;
    for(let i=Number(ExtraChargesPricesEnum.valueZero); i<len; i++)
      this.model.pop();

    (<FormArray>this.formGroup.get(ExtraChargesPricesEnum.price)).controls = [];

    for(let i=Number(ExtraChargesPricesEnum.valueZero); i<chargesList.length; i++) {
      (<FormArray>this.formGroup.get(ExtraChargesPricesEnum.price)).push(new FormControl());
      let object = new ExtraChargesPricesModel();
      object.policiesId = chargesList[i].transfer_policies_id;
      object.extraChargesCatalogueId = chargesList[i].extra_charges_catalogue_id;
      object.policiesExtraChargeId = chargesList[i].transfer_policies_extra_charge_id;
      object.nameCharge = chargesList[i].name;
      this.model.push(object);
    }
  }
  
}
