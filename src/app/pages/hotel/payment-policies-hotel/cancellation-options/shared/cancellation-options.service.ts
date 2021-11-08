import { Injectable } from '@angular/core';
import { CancellationOptionsEnum } from './cancellation-options.enum';
import { AbstractService } from '@shared/abstract.service';
import { Environment } from 'environments/environment';

@Injectable()
export class CancellationOptionsService extends AbstractService { 

    getCancellationDays() {
        try {
          this.selectedErrorMessage = CancellationOptionsEnum.getCancellationDaysErrorMessage;
          return this.http.get(Environment.cancellationDaysApiUrl, ).map((res:any) => res);
        }
        catch(e) {
          this.handleError(e);
        }
    }

}