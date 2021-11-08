import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { ViewDetailsActivityEnum } from './view-details-activity-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class ViewDetailsActivityService extends AbstractService {

  getDetails(id: string) {
    try {
      this.selectedErrorMessage = ViewDetailsActivityEnum.activityErrorMessage;

      return this.http.get(Environment.activityCompleteInfoApiUrl + id, ).map((res:any) => res);

    }catch (e) {
      this.handleError(e);
    }
  }

  showError(messageError) {
    //this.toastr.error(messageError);
  }

}
