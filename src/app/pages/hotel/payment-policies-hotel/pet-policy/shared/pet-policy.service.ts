import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { PetPolicyEnum } from './pet-policy.enum';
import { Environment } from 'environments/environment';

@Injectable()
export class PetPolicyService extends AbstractService {

  getPetsAllow() {
    try{
      this.selectedErrorMessage = PetPolicyEnum.getPetsAllowedErrorMessage;
      return this.http.get(Environment.petsAllowedCatalogues, { headers: this.getHeaders() }  ).map((res:any) => res);
    }
    catch(e){
      this.handleError(e);
    }
  }

  getPetsCharge() {
    try{
      this.selectedErrorMessage = PetPolicyEnum.getPetChargesErrorMessage;
      return this.http.get(Environment.petsChargesCatalogues, { headers: this.getHeaders() }  ).map((res:any) => res);
    }
    catch(e){
      this.handleError(e);
    }
  }

  showError(messageError){   
    //this.toastr.error(messageError);
  }
}
