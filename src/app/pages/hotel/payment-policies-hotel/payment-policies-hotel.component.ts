import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { PaymentPoliciesHotelEnum } from './shared/payment-policies-hotel-enum';
import { PaymentPoliciesHotelModel } from './shared/payment-policies-hotel-model';
import { PaymentPoliciesHotelService } from './shared/payment-policies-hotel.service';
import { CancellationOptionsComponent } from './cancellation-options/cancellation-options.component';
import { CancellationFeesComponent } from './cancellation-fees/cancellation-fees.component';
import { CheckInCheckOutComponent } from './check-in-check-out/check-in-check-out.component';
import { GuestPaymentOptionsComponent } from './guest-payment-options/guest-payment-options.component';
import { ChildrenPolicyComponent } from './children-policy/children-policy.component';
import { PetPolicyComponent } from './pet-policy/pet-policy.component';
import { FormBuilder } from '@angular/forms';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';

@Component({
  selector: 'app-payment-policies-hotel',
  templateUrl: './payment-policies-hotel.component.html',
  styleUrls: ['./payment-policies-hotel.component.css']
})
export class PaymentPoliciesHotelComponent extends AbstractGenericParentComponent implements OnInit,  AfterViewInit  {

  @Input() establishmentId: number;
  @ViewChild (GuestPaymentOptionsComponent)  guestPaymentOptionsComponent;  
  @ViewChild (CancellationOptionsComponent) cancellationOptionsComponent;
  @ViewChild (CancellationFeesComponent)  cancellationFeesComponent;
  @ViewChild (CheckInCheckOutComponent)  checkInCheckOutComponent;
  @ViewChild (ChildrenPolicyComponent)  childrenPolicyComponent;
  @ViewChild (PetPolicyComponent)  petPolicyComponent;
  paymentPoliciesHotelEnum = PaymentPoliciesHotelEnum;

  constructor(private formBuilder: FormBuilder, private paymentPoliciesHotelService: PaymentPoliciesHotelService) {
    super();
   }

   ngOnInit(): void {
      this.model = new PaymentPoliciesHotelModel();
      this.initEmptyForm(this.formBuilder);    
  }

  ngAfterViewInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup.addControl(PaymentPoliciesHotelEnum.guestPaymentOptions , this.guestPaymentOptionsComponent.formGroup);
    this.guestPaymentOptionsComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(PaymentPoliciesHotelEnum.cancellationOptions , this.cancellationOptionsComponent.formGroup);
    this.cancellationOptionsComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(PaymentPoliciesHotelEnum.cancellationFees , this.cancellationFeesComponent.formGroup);
    this.cancellationFeesComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(PaymentPoliciesHotelEnum.checkInCheckOut , this.checkInCheckOutComponent.formGroup);
    this.checkInCheckOutComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(PaymentPoliciesHotelEnum.childrenPolicy , this.childrenPolicyComponent.formGroup);
    this.childrenPolicyComponent.formGroup.setParent(this.formGroup);
    
    this.formGroup.addControl(PaymentPoliciesHotelEnum.petPolicy , this.petPolicyComponent.formGroup);
    this.petPolicyComponent.formGroup.setParent(this.formGroup);
  }

  onSubmit() {
    this.model.hotelServiceId = this.establishmentId;
    this.guestPaymentOptionsComponent.onSubmit();
    this.model.checkInCheckOutInfo = this.checkInCheckOutComponent.onSubmit();
    this.model.childrenPolicy = this.model.childrenPolicy.childAllowed;
    return this.paymentPoliciesHotelService.save(this.model);
  }

}
