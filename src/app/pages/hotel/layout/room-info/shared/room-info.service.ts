import { Injectable, ViewContainerRef } from '@angular/core';
//import { Headers, Http, Response } from '@angular/http';
import { RoomInfoEnum } from './room-info-enum';
import { RoomInfoModel } from './room-info-model';
//import 'rxjs/add/operator/toPromise';
import { Environment } from '../../../../../../environments/environment';
//import { ToastsManager } from 'ng2-toastr';
import { isSuccess } from 'angular-in-memory-web-api';
import { AbstractService } from '@shared/abstract.service';


@Injectable()
export class RoomInfoService extends AbstractService { 

    getRoomTypes() {
        try {
          this.selectedErrorMessage = RoomInfoEnum.getRoomTypesErrorMessage;
          return this.http.get(Environment.roomTypeCatalogues, ).map((res:any) => res);
        }
        catch(e) {
          this.handleError(e);
        }
    }

    getRoomName() {
        try {
          this.selectedErrorMessage = RoomInfoEnum.getRoomNamesErrorMessage;
          return this.http.get(Environment.roomNameApiUrl, ).map((res:any) => res);
        }
        catch(e) {
          this.handleError(e);
        }
    }
    

}