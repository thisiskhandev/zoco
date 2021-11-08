import { GenericFormModel } from "@shared/generic-form-model";
import { ExcludeTaxesModel } from "@commons/exclude-taxes/shared/exclude-taxes-model";
import { ExtraChargesPricesModel } from "../extra-charges-prices/shared/extra-charges-prices-model";

export class RateSetupTransferModel implements GenericFormModel {
    
    id : number;
    transferId : number;
    origin : string;
    destination : string;
    vehicle : string;
    service : string;
    peopleNumber : number;
    bagsNumber : number;
    handbagsNumber : number;
    price : number;
    parkingPrice : number;
    totalPrice : number;
    excludeTaxes : ExcludeTaxesModel;
    extraChargesPrices : Array<ExtraChargesPricesModel>;

    constructor() {
        this.id = null;
        this.transferId = null;
        this.origin = null;
        this.destination = null;
        this.vehicle = null;
        this.service = null;
        this.peopleNumber = null;
        this.bagsNumber = null;
        this.handbagsNumber = null;
        this.price = null;
        this.parkingPrice = null;
        this.totalPrice = null;
        this.excludeTaxes = new ExcludeTaxesModel();
        this.extraChargesPrices = new Array<ExtraChargesPricesModel>();
    }

    setData(data) {        
    }
}