import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from '@shared/abstract.service';
import { ExtraChargesEnum } from './extra-charges-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class ExtraChargesService extends AbstractService {

  getExtraCharges() {
    try {
      this.selectedErrorMessage = ExtraChargesEnum.getErrorMessage;
      return this.http.get(Environment.extraChargesTransferApiUrl, ).map((res:any) => res);
    }
    catch(e) {
      this.handleError(e);
    }
  }

}
