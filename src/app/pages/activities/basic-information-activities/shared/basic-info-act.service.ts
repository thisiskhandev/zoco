import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { BasicInfoModel } from './basic-info-model';
import { Utilities } from '@shared/utilities';
import { Environment } from 'environments/environment';
import { BasicInfoActivitiesEnum } from './basic-info-act-enum';

@Injectable()
export class BasicInfoActService extends AbstractService {

  messageErrorUpdate : string =       BasicInfoActivitiesEnum.updateBasicInfoErrorMessage;
  messageSuccessFullUpdate : string = BasicInfoActivitiesEnum.updateBasicInfoSuccessfullMessage;
  messageErrorSave : string =         BasicInfoActivitiesEnum.saveBasicInfoErrorMessage;
  messageSuccessFullSave : string =   BasicInfoActivitiesEnum.saveBasicInfoSuccessfullMessage;
  apiUrl: string = Environment.activitiesApiUrl;
  
}
