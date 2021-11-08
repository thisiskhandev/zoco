import { Injectable } from '@angular/core';
import { Environment } from '../../../../../../environments/environment';
//import { Headers, Http, Response } from '@angular/http';
//import { ToastsManager } from 'ng2-toastr';
import { ParkingEnum } from './parking-enum';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class ParkingService extends AbstractService {

  getParkingAccess() {
    try {
      this.selectedErrorMessage = ParkingEnum.getParkingAccessErrorMessage;
      return this.http.get(Environment.parkingAccessUrl, { headers: this.getHeaders() }).map((res:any) => res);
    }
    catch(e) {
      this.handleError(e);
    }
  }

  getParkingLocations() {
    try {
      this.selectedErrorMessage = ParkingEnum.getParkingLocationErrorMessage;
      return this.http.get(Environment.parkingLocationsUrl, { headers: this.getHeaders() }  ).map((res:any) => res);
    }
    catch(e) {
      this.handleError(e);
    }
  }

  getParkingConditions() {
    try {
      this.selectedErrorMessage = ParkingEnum.getParkingConditionsErrorMessage;
      return this.http.get(Environment.parkingConditionUrl, { headers: this.getHeaders() }  ).map((res:any) => res);
    }
    catch(e) {
      this.handleError(e);
    }
  }
  
  showError(messageError) {   
    //this.toastr.error(messageError);
  }
    
}