import {ParkingEnum} from './parking-enum';
import { GenericFormModel } from '@shared/generic-form-model';

export class ParkingModel implements GenericFormModel {
    id: number;
    hasParking: string;
    parkingAccess: string;
    parkingLocation: string;
    parkingCondition: string;
    parkingPrice: string;

    constructor() {
        this.hasParking = null;
        this.parkingAccess = null;
        this.parkingLocation = null;
        this.parkingCondition = null;
        this.parkingPrice = null;
    }

    setData(data: any) : void {
        
    }
}
