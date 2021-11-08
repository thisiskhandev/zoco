import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { DriversTransferEnum } from './drivers-transfer.enum';
import { Environment } from 'environments/environment';
import { Utilities } from '@shared/utilities';

@Injectable()
export class DriversTransferService extends AbstractService {
  
  messageErrorUpdate : string = DriversTransferEnum.messageErrorUpdate;
  messageSuccessFullUpdate : string = DriversTransferEnum.messageSuccessFullUpdate;
  messageErrorSave : string = DriversTransferEnum.messageErrorSave;
  messageSuccessFullSave : string = DriversTransferEnum.messageSuccessFullSave;
  apiUrl: string = Environment.driversTransferApiUrl;


  getCarCategories() {
    try {
      Utilities.log('ejecutando servicio');
      this.selectedErrorMessage = DriversTransferEnum.messageErrorGetCarCategoriesList;
      return this.http.get(Environment.carCategoriesApiUrl, ).map((res:any) => res);
    }
    catch(e) {
      this.handleError(e);
    }
  }

}
