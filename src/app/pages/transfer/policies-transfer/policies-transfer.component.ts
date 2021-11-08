import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PoliciesTransferEnum } from './shared/policies-transfer-enum';
import { TaxesSetupComponent } from '@commons/taxes-setup/taxes-setup.component';
import { PoliciesTranferModel } from './shared/policies-transfer-model';
import { FormBuilder } from '@angular/forms';
import { PaymentMethodsComponent } from '@commons/payment-methods/payment-methods.component';
import { ExtraChargesComponent } from './extra-charges/extra-charges.component';
import { WaitTimeComponent } from './wait-time/wait-time.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { PoliciesTransferService } from './shared/policies-transfer.service';

@Component({
  selector: 'app-policies-transfer',
  templateUrl: './policies-transfer.component.html',
  styleUrls: ['./policies-transfer.component.css']
})
export class PoliciesTransferComponent extends AbstractGenericParentComponent implements OnInit {

  @ViewChild (TaxesSetupComponent) taxesSetupComponent : TaxesSetupComponent;
  @ViewChild (PaymentMethodsComponent) paymentMethodsComponent : PaymentMethodsComponent;
  @ViewChild (ExtraChargesComponent) extraChargesComponent : ExtraChargesComponent;
  @ViewChild (WaitTimeComponent) waitTimeComponent : WaitTimeComponent;
  @Input() transferId : number;
  policiesTransferEnum = PoliciesTransferEnum;

  constructor(private formBuilder: FormBuilder, private service : PoliciesTransferService) {
    super();
    this.model = new PoliciesTranferModel(); 
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group( {
    });
  }

  ngAfterViewInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group( {
    });

    this.formGroup.addControl(PoliciesTransferEnum.taxesSetup, this.taxesSetupComponent.formGroup);
    this.taxesSetupComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(PoliciesTransferEnum.paymentMethods, this.paymentMethodsComponent.formGroup);
    this.paymentMethodsComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(PoliciesTransferEnum.extraCharges, this.extraChargesComponent.formGroup);
    this.extraChargesComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(PoliciesTransferEnum.waitTime, this.waitTimeComponent.formGroup);
    this.waitTimeComponent.formGroup.setParent(this.formGroup);

  }

  onSubmit() {
    this.model.transferId = this.transferId;
    return this.service.save(this.model);
  }

}
