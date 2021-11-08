import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { Observable, of } from 'rxjs';
import { DataTaxesSetup } from '@commons/taxes-setup/shared/taxes-setup-enum';

@Injectable()
export class TaxesSetupService extends AbstractService {

  getPercentaje() {
    return of(DataTaxesSetup.percentageArray);
  }

}
