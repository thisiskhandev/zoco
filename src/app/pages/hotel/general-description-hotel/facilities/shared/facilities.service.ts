import { Injectable } from '@angular/core';
import { Environment } from '../../../../../../environments/environment';
//import { Headers, Http, Response } from '@angular/http';
//import { ToastsManager } from 'ng2-toastr';
import { FacilitiesEnum } from './facilities-enum';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class FacilitiesService extends AbstractService {

    getFacilities() {
        try{
            this.selectedErrorMessage = FacilitiesEnum.getFacilitiesErrorMessage;
            return this.http.get(Environment.facilitiesApiUrl, ).map((res:any) => res);
        }
        catch(e){
          this.handleError(e);
        }
    }

    showError(messageError){   
        //this.toastr.error(messageError);
    }
}
