import { Injectable } from '@angular/core';
import { Environment } from 'environments/environment';
import { ListHotelEnum } from './list-hotel-enum';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class ListHotelService extends AbstractService {

  getListHotels() {
    try{
      this.selectedErrorMessage = ListHotelEnum.getListHotelErrorMessage;
      return this.http.get(Environment.hotelApiUrl, ).map((res:any) => res);
    }
    catch(e){
      this.handleError(e);
    }
  }

  deleteHotel(id) {
    try{
      this.selectedErrorMessage = ListHotelEnum.deleteHotelErrorMessage;
      return this.http.delete(Environment.deleteHotelApiUrl + id, ).map((res:any) => res);
    }
    catch(e){
      this.handleError(e);
    }
  }
  
  showError(messageError){   
    //this.toastr.error(messageError);
  }

}
