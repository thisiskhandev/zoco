import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { PoliciesPaymentEnum } from './policies-payment-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class PoliciesPaymentService extends AbstractService {

  messageErrorUpdate : string = PoliciesPaymentEnum.messageErrorUpdate;
  messageSuccessFullUpdate : string = PoliciesPaymentEnum.messageSuccessfullUpdate;
  messageErrorSave : string = PoliciesPaymentEnum.messageErrorSave;
  messageSuccessFullSave : string = PoliciesPaymentEnum.messageSuccessfullSave;
  apiUrl: string = Environment.policiesActivityApiUrl;

  showError(messageError){   
    //this.toastr.error(messageError);
  }

}
