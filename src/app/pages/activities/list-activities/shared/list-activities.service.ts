import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { ListActivitiesEnum } from './list-activities-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class ListActivitiesService extends AbstractService {

  getListActivities() {
    try{
      this.selectedErrorMessage = ListActivitiesEnum.getActivityErrorMessage;
      return this.http.get(Environment.activitiesApiUrl).map((res:any) => res);
    }
    catch(e){
      this.handleError(e);
    }
  }

  showError(messageError){   
    //this.toastr.error(messageError);
  }

}
