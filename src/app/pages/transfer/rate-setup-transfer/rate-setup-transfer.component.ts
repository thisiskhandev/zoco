import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RateSetupTransferEnum, DataRateSetupTransfer } from './shared/rate-setup-transfer-enum';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { RateSetupTransferModel } from './shared/rate-setup-transfer-model';
import { GenericModel } from '@shared/generic-model';
import { Utilities } from '@shared/utilities';
import { CustomValidator } from '@shared/customValidator';
import { ExcludeTaxesComponent } from '@commons/exclude-taxes/exclude-taxes.component';
import { ExtraChargesPricesComponent } from './extra-charges-prices/extra-charges-prices.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { RateSetupTransferService } from './shared/rate-setup-transfer.service';

@Component({
  selector: 'app-rate-setup-transfer',
  templateUrl: './rate-setup-transfer.component.html',
  styleUrls: ['./rate-setup-transfer.component.css']
})
export class RateSetupTransferComponent extends AbstractGenericParentComponent implements OnInit {

  @ViewChild (ExcludeTaxesComponent) excludeTaxesComponent;
  @ViewChild (ExtraChargesPricesComponent) extraChargesPricesComponent;
  @Input() transferId : number;
  @Input() vehiclesOptions : Array<GenericModel>;
  rateSetupTransferEnum = RateSetupTransferEnum;
  customValidator = CustomValidator;  
  serviceOptions : Array<GenericModel>;
  peopleNumberOptions : Array<GenericModel>;
  bagsNumberOptions : Array<GenericModel>;
  handbagsNumberOptions : Array<GenericModel>;

  constructor(private formBuilder: FormBuilder, private service:RateSetupTransferService) { 
    super();
    this.model = new RateSetupTransferModel();    
  }

  ngOnInit() {
    this.serviceOptions = DataRateSetupTransfer.serviceArray;
    this.peopleNumberOptions = this.bagsNumberOptions = this.handbagsNumberOptions = this.fillVector();    
    this.initForm();
  }

  fillVector() {
    let vector = [];
    for (let i=Number(RateSetupTransferEnum.valueOne); i<=RateSetupTransferEnum.sizeVector; i++)
      vector.push(i);

    return vector;
  }

  ngAfterViewInit() {    
    this.formGroup.addControl(RateSetupTransferEnum.excludeTax, this.excludeTaxesComponent.formGroup);
    this.excludeTaxesComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(RateSetupTransferEnum.extraChargesPrice, this.extraChargesPricesComponent.formGroup);
    this.extraChargesPricesComponent.formGroup.setParent(this.formGroup);
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
  }

  onSubmit() {
    this.model.transferId = this.transferId;
    return this.service.save(this.model);    
  }

  sendCharges(extraCharges) {
    this.extraChargesPricesComponent.charges(extraCharges);
  }

}
