import { Injectable } from '@angular/core';
import { FeaturesTransferEnum } from './features-transfer.enum';
//import 'rxjs/add/operator/toPromise';
import { Environment } from 'environments/environment';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class TransferFeaturesService extends AbstractService {

  private transferFeaturesUrlToSave = Environment.transferFeaturesApiUrl;
  messageErrorUpdate : string = FeaturesTransferEnum.updateTransferFeaturesErrorMessage;
  messageSuccessFullUpdate : string = FeaturesTransferEnum.updateTransferFeaturesSuccessfullMessage;
  messageErrorSave : string = FeaturesTransferEnum.saveTransferFeaturesErrorMessage;
  messageSuccessFullSave : string = FeaturesTransferEnum.saveTransferFeaturesSuccessfullMessage;
  apiUrl: string = Environment.transferFeaturesApiUrl;

  showError(messageError){   
    //this.toastr.error(messageError);
  }
}
