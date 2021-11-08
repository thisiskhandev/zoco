import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PoliciesPaymentEnum } from './shared/policies-payment-enum';
import { PoliciesPaymentModel } from './shared/policies-payment-model';
import { FormBuilder } from '@angular/forms';
import { TaxesSetupComponent } from '@commons/taxes-setup/taxes-setup.component';
import { PaymentMethodsComponent } from '@commons/payment-methods/payment-methods.component';
import { AgeRangeComponent } from './age-range/age-range.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { PoliciesPaymentService } from './shared/policies-payment.service';

@Component({
  selector: 'app-policies-payment-activities',
  templateUrl: './policies-payment-activities.component.html',
  styleUrls: ['./policies-payment-activities.component.css']
})
export class PoliciesPaymentActivitiesComponent extends AbstractGenericParentComponent implements OnInit {

  @Input() activityId: number;
  @ViewChild (TaxesSetupComponent) taxesSetupComponent : TaxesSetupComponent;
  @ViewChild (PaymentMethodsComponent) paymentMethodsComponent : PaymentMethodsComponent;
  @ViewChild (AgeRangeComponent) ageRangeComponent : AgeRangeComponent;
  policiesPaymentEnum = PoliciesPaymentEnum;

  constructor(private formBuilder: FormBuilder, private service : PoliciesPaymentService) {
    super();
   }

  ngOnInit() {
    this.model = new PoliciesPaymentModel();
    this.formGroup = this.formBuilder.group( {
    });
  }

  ngAfterViewInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group( {
    });

    this.formGroup.addControl(PoliciesPaymentEnum.taxesSetup, this.taxesSetupComponent.formGroup);
    this.taxesSetupComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(PoliciesPaymentEnum.paymentMethods, this.paymentMethodsComponent.formGroup);
    this.paymentMethodsComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(PoliciesPaymentEnum.ageRange, this.ageRangeComponent.formGroup);
    this.ageRangeComponent.formGroup.setParent(this.formGroup);
  }

  onSubmit() {
    this.model.activityId = this.activityId;
    return this.service.save(this.model);
  }

}
