import { Injectable } from '@angular/core';
import { CancellationFeesEnum } from  './cancellation-fees.enum';
import { AbstractService } from '@shared/abstract.service';
import { Environment } from 'environments/environment';

@Injectable()
export class CancellationFeesService extends AbstractService { 

  getGracePeriodOptions() {
    try {
      this.selectedErrorMessage = CancellationFeesEnum.getGracePeriodOptionsErrorMessage;
      return this.http.get(Environment.gracePeriodOptionsApiUrl, { headers: this.getHeaders() } ).map((res:any) => res);
    }
    catch(e) {
      this.handleError(e);
    }
  }

}