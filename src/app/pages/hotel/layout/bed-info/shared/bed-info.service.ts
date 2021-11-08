import { Injectable, ViewContainerRef } from '@angular/core';
//import { Headers, Http, Response } from '@angular/http';
import { BedInfoEnum } from './bed-info-enum';
import { BedInfoModel } from './bed-info-model';
//import 'rxjs/add/operator/toPromise';
import { Environment } from '../../../../../../environments/environment';
//import { ToastsManager } from 'ng2-toastr';
import { isSuccess } from 'angular-in-memory-web-api';
import { AbstractService } from '@shared/abstract.service';


@Injectable()
export class BedInfoService extends AbstractService { 


    getBedMeasures() {
        try {
          this.selectedErrorMessage = BedInfoEnum.getBedMeasuresErrorMessage;
          return this.http.get(Environment.itemMeasureCatalogues, ).map((res:any) => res);
        }
        catch(e) {
          this.handleError(e);
        }
    }
}