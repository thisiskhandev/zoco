import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { Observable, of } from 'rxjs';
import { ActivityInfoEnum, DataActivityInfo } from './activity-info-enum';
import { Environment } from 'environments/environment';


@Injectable()
export class ActivityInfoService extends AbstractService {

  getTimeOption() {
    return of(DataActivityInfo.timeOptionArray);
  }

  getSchedule() {
    return of(DataActivityInfo.typeScheduleArray);
  }

  getHighlightTypes() {
    return of(DataActivityInfo.highlightsArray);
  }

  getCitys(keyword): Observable<any> {
    if (keyword) {
      return this.http.get(Environment.searchLocationApiUrl + keyword);
    } else {
      return of([]);
    }
  }

}
