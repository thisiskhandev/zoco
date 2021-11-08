import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { PoliciesTransferEnum } from './policies-transfer-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class PoliciesTransferService extends AbstractService {
  messageErrorUpdate : string = PoliciesTransferEnum.messageErrorUpdate;
  messageSuccessFullUpdate : string = PoliciesTransferEnum.messageSuccessfullUpdate;
  messageErrorSave : string = PoliciesTransferEnum.messageErrorSave;
  messageSuccessFullSave : string = PoliciesTransferEnum.messageSuccessfullSave;
  apiUrl: string = Environment.transferPoliciesApiUrl;

  showError(messageError){   
    //this.toastr.error(messageError);
  }
}
