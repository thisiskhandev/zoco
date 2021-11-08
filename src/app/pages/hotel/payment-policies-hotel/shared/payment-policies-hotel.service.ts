import { Injectable } from '@angular/core';
import { PaymentPoliciesHotelEnum } from './payment-policies-hotel-enum';
import { AbstractService } from '@shared/abstract.service';
import { Environment } from 'environments/environment';

@Injectable()
export class PaymentPoliciesHotelService extends AbstractService {

  messageErrorUpdate : string = PaymentPoliciesHotelEnum.updatePoliciesPaymentErrorMessage;
  messageSuccessFullUpdate : string = PaymentPoliciesHotelEnum.updatePoliciesPaymentSuccessfullMessage;
  messageErrorSave : string = PaymentPoliciesHotelEnum.savePoliciesPaymentErrorMessage;
  messageSuccessFullSave : string = PaymentPoliciesHotelEnum.savePoliciesPaymentSuccessfullMessage;
  apiUrl: string = Environment.savePoliciesPaymentApiUrl;
  
}