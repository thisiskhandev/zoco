import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { ExtraBedEnum } from './extra-bed-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class ExtraBedService extends AbstractService {

getChildrenAges() {
  try{
    this.selectedErrorMessage = ExtraBedEnum.getItemsErrorMessage;
    return this.http.get(Environment.childrenAgesCatalogues, ).map((res:any) => res);
  }
  catch(e){
    this.handleError(e);
  }
}

showError(messageError){   
  //this.toastr.error(messageError);
}

}
