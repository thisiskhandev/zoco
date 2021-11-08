import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { Environment } from 'environments/environment';
import { SettingsTransferEnum } from './setting-transfer.enum';
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingTransferService extends AbstractService {

  private transferSettingsUrlToSave = Environment.transferFeaturesApiUrl;
  messageErrorUpdate: string = SettingsTransferEnum.updateTransferSettingsErrorMessage;
  messageSuccessFullUpdate: string = SettingsTransferEnum.updateTransferSettingsSuccessfullMessage;
  messageErrorSave: string = SettingsTransferEnum.saveTransferSettingsErrorMessage;
  messageSuccessFullSave: string = SettingsTransferEnum.saveTransferSettingsSuccessfullMessage;
  apiUrl: string = Environment.settingsTransferApiUrl;

  showError(messageError) {
    //this.toastr.error(messageError);
  }
}
