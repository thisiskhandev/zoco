import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { RateSetupTransferEnum } from './rate-setup-transfer-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class RateSetupTransferService extends AbstractService {

  messageErrorUpdate : string = RateSetupTransferEnum.messageErrorUpdate;
  messageSuccessFullUpdate : string = RateSetupTransferEnum.messageSuccessFullUpdate;
  messageErrorSave : string = RateSetupTransferEnum.messageErrorSave;
  messageSuccessFullSave : string = RateSetupTransferEnum.messageSuccessFullSave;
  apiUrl: string = Environment.rateTransferApiUrl;

}
