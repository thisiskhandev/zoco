import { Injectable } from '@angular/core';
import { Environment } from '../../../../../environments/environment';
//import { Headers, Http, Response } from '@angular/http';
import { AbstractService } from '@shared/abstract.service';
import { ListTransferEnum } from './list-transfer-enum';

@Injectable()
export class ListTransferService extends AbstractService {

  getTransferList() {
    try {
      this.selectedErrorMessage = ListTransferEnum.getListTransferErrorMessage;
      return this.http.get(Environment.transferApiUrl, ).map((res:any) => res);
    }catch (e) {
      this.handleError(e);
    }
  }

  showError(messageError) {
    //this.toastr.error(messageError);
  }

}
