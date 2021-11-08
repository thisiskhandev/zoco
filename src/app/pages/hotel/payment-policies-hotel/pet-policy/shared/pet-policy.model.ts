import { PetPolicyEnum } from './pet-policy.enum';
import { GenericFormModel } from '@shared/generic-form-model';

export class PetPolicyModel implements GenericFormModel {
    id : number;
    canYouBringPets: number = null;
    petCharge: number = null;

    constructor() {
        this.id = null;
        this.canYouBringPets = null;
        this.petCharge = null;
    }

    setData() {}
}