import { Injectable } from '@angular/core';
//import { ToastsManager } from 'ng2-toastr';
//import { Headers, Http, Response } from '@angular/http';
import { Environment } from '../../../../../../environments/environment';
import { BreakfastEnum } from './breakfast-enum';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class BreakfastService extends AbstractService {

  getBreakfastTypes() {
    try {
      this.selectedErrorMessage = BreakfastEnum.messageErrorGetBreakfastTypes;
      
      return this.http.get(Environment.breakfastTypeApiUrl, { headers: this.getHeaders() } ).map((res:any) => res);
    }
    catch(e) {
      this.handleError(e);
    }
  }

}
