import { Injectable } from '@angular/core';
import {Environment } from 'environments/environment';

import { AbstractService } from '@shared/abstract.service';
import { Utilities } from '@shared/utilities';
import { ViewDetailsTransferEnum } from './view-details-transfer-enum';

@Injectable()
export class ViewDetailsTransferService extends AbstractService {

  getDetails(id: string) {
    try {
      this.selectedErrorMessage = ViewDetailsTransferEnum.getDetailTransferErrorMessage;
      return this.http.get(Environment.transferCompleteInfoUrl+ Utilities.urlRouteSeparator + id).map((res:any) => res);
    } catch (e) {
      this.handleError(e);
    }
  }

  showError(messageError) {
    //this.toastr.error(messageError);
  }
 
}