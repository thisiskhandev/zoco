import { Injectable } from '@angular/core';
import { Environment } from '../../../../../environments/environment';
//import { Headers, Http, Response } from '@angular/http';
import { DetailsHotelEnum } from './view-details-hotel-enum';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class ViewDetailsHotelService extends AbstractService {

  getDetails(id: string) {
    try {
      this.selectedErrorMessage = DetailsHotelEnum.getDetailHotelErrorMessage ;
      return this.http.get(Environment.hotelCompleteInfoApiUrl + id, ).map((res:any) => res);
    }catch (e) {
      this.handleError(e);
    }
  }

  showError(messageError) {
    //this.toastr.error(messageError);
  }

}
