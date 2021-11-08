import { Injectable } from '@angular/core';
//import { ToastsManager } from 'ng2-toastr';
//import { Headers, Http, Response } from '@angular/http';
import { Environment } from '../../../../../environments/environment';
import { GeneralDescriptionHotel } from '../shared/general-description-hotel-model';
import { GeneralDescriptionEnum } from './general-description-enum';
//import { ToastyConfig, ToastyService } from 'ng2-toasty';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class GeneralDescriptionHotelService extends AbstractService {

  private genDescURLToSave = Environment.genDescApiUrl;
  messageErrorUpdate : string = GeneralDescriptionEnum.messageErrorUpdate;
  messageSuccessFullUpdate : string = GeneralDescriptionEnum.messageSuccessfullUpdate;
  messageErrorSave : string = GeneralDescriptionEnum.messageErrorSave;
  messageSuccessFullSave : string = GeneralDescriptionEnum.messageSuccessfullSave;
  apiUrl: string = Environment.genDescApiUrl;

  showError(messageError){   
    //this.toastr.error(messageError);
  }

}
