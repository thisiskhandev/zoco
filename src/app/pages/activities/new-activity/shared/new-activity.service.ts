import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { NewActivityEnum } from './new-activity-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class NewActivityService extends AbstractService {

  messageErrorUpdate : string = NewActivityEnum.messageErrorUpdate;
  messageSuccessFullUpdate : string = NewActivityEnum.messageSuccessfullUpdate;
  messageErrorSave : string = NewActivityEnum.messageErrorSave;
  messageSuccessFullSave : string = NewActivityEnum.messageSuccessfullSave;
  apiUrl: string = Environment.activityApiUrl;

  showError(messageError){   
    //this.toastr.error(messageError);
  }

}
