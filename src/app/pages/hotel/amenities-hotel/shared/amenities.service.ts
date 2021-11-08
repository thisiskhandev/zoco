import { Injectable } from '@angular/core';
import { Environment } from 'environments/environment';
//import { Headers, Http, Response } from '@angular/http';
//import { ToastsManager } from 'ng2-toastr';
import { AmenitiesEnum } from './amenities-enum';
import { AmenitiesModel } from './amenities-model';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class AmenitiesService extends AbstractService {

  private genDescURLToSave = Environment.genDescApiUrl;
  messageErrorUpdate : string = AmenitiesEnum.messageErrorUpdateAmenities;
  messageSuccessFullUpdate : string = AmenitiesEnum.messageSuccessFullUpdateAmenities;
  messageErrorSave : string = AmenitiesEnum.messageErrorSaveAmenities;
  messageSuccessFullSave : string = AmenitiesEnum.messageSuccessFullSaveAmenities;
  apiUrl: string = Environment.amenitiesApiUrl;

  getItemsSubsection() {    
    try{
      this.selectedErrorMessage = AmenitiesEnum.getItemsErrorMessage;
      return this.http.get(Environment.itemsAmenities, ).map((res:any) => res);
    }
    catch(e){
      this.handleError(e);
    }
  }
  
  showError(messageError){   
    //this.toastr.error(messageError);
  }

}
