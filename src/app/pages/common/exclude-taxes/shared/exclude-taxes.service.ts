import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { Observable, of } from 'rxjs';
import { DataExcludeRates } from './exclude-taxes-enum';

@Injectable()
export class ExcludeTaxesService extends AbstractService {
  
  getTaxes() {
    return of( DataExcludeRates.taxesArray);    
  }
  
}
