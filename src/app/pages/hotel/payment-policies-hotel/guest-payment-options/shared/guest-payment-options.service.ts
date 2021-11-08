import { Injectable } from '@angular/core';
import { GuestPaymentOptionsEnum } from './guest-payment-options-enum';
import { AbstractService } from '@shared/abstract.service';
import { Environment } from 'environments/environment';

@Injectable()
export class GuestPaymentOptionsService extends AbstractService {

    getCreditCardsTypes() {
        try {
          this.selectedErrorMessage = GuestPaymentOptionsEnum.getCreditCardsTypesErrorMessage;
          return this.http.get(Environment.creditTypesApiUrl, { headers: this.getHeaders() }).map((res:any) => res);
        }
        catch(e) {
          this.handleError(e);
        }
    }

}