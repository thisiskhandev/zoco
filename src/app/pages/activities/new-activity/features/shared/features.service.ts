import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { Observable, of } from 'rxjs';
import { DataFeaturesActivities, FeaturesEnum } from './features-enum';
import { Environment } from 'environments/environment';

@Injectable()
export class FeaturesService extends AbstractService {

  getActivities() {
    try{
      this.selectedErrorMessage = FeaturesEnum.getItemsErrorMessage;
      return this.http.get(Environment.activityTypeApiUrl, ).map((res:any) => res);
    }
    catch(e){
      this.handleError(e);
    }
  }

  getLocation() {
    return of(DataFeaturesActivities.locationArray);
  }

}
