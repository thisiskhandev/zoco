import { Injectable } from '@angular/core';
import { Environment } from '../../../../../../environments/environment';
//import { Headers, Http, Response } from '@angular/http';
//import { ToastsManager } from 'ng2-toastr';
import { InternetEnum } from './internet-enum';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class InternetService extends AbstractService {
    
    getInternetType() {
        try{
          this.selectedErrorMessage = InternetEnum.getInternetTypeErrorMessage;
          return this.http.get(Environment.internetConnectTypeUrl, ).map((res:any) => res);
        }
        catch(e){
          this.handleError(e);
        }
    }

    getInternetPlaces() {
        try{
          this.selectedErrorMessage = InternetEnum.getInternetPlacesErrorMessage;
          return this.http.get(Environment.internetPlacesUrl, ).map((res:any) => res);
        }
        catch(e){
          this.handleError(e);
        }
    }

    showError(messageError){   
        //this.toastr.error(messageError);
    }
}