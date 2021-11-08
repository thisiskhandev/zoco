import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { Observable, of } from 'rxjs';
import { DataPaymentMethods } from './payment-methods-enum';
import { Environment } from 'environments/environment';
import { Utilities } from '@shared/utilities';

@Injectable()
export class PaymentMethodsService extends AbstractService {

  getCardTypes() {
    return of( DataPaymentMethods.typeCardArray);
  }

  getCards(id : number, errorMessage : string) {
    try {
      this.selectedErrorMessage = errorMessage;
      return this.http.get(Environment.cardTypesApiUrl + id, ).map((res:any) => res);
    }
    catch(e) {
      this.handleError(e);
    }
  }
  
}
