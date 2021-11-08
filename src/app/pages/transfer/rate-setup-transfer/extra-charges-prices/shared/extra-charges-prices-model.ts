import { GenericFormModel } from "@shared/generic-form-model";

export class ExtraChargesPricesModel implements GenericFormModel {
    id : number;
    policiesId : number;
    extraChargesCatalogueId : number;
    policiesExtraChargeId : number;    
    nameCharge : string;
    priceCharge : number;

    constructor() {
        this.id = null;
        this.policiesId = null;
        this.extraChargesCatalogueId = null;
        this.policiesExtraChargeId = null;        
        this.nameCharge = null;
        this.priceCharge = null;
    }

    setData() {}
}
