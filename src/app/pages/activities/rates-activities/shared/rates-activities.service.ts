import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { Environment } from 'environments/environment';
import { RatesActivitiesEnum } from './rates-activities-enum';

@Injectable()
export class RatesActivitiesService extends AbstractService {
    
    messageErrorUpdate : string = RatesActivitiesEnum.messageErrorUpdate;
    messageSuccessFullUpdate : string = RatesActivitiesEnum.messageSuccessFullUpdate;
    messageErrorSave : string = RatesActivitiesEnum.messageErrorSave;
    messageSuccessFullSave : string = RatesActivitiesEnum.messageSuccessFullSave;
    apiUrl: string = Environment.rateActivityApiUrl;

}
