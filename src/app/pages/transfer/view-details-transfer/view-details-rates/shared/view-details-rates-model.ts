import { ViewDetailsRatesEnum } from "./view-details-rates-enum";

export class ViewDetailsRatesModel {
    listRates : Array <ListViewDetailsRatesModel>;
    
    constructor() {
        this.listRates = [];
    }

    setData(data){
        data.forEach (item =>
        {   let object = new ListViewDetailsRatesModel();
            object.setData(item);
            this.listRates.push(object);
        })
    }
}

export class ListViewDetailsRatesModel {
    id : number;
    vehicle : string;
    origin : string;
    destination : string;
    serviceMode : string;
    people : number;
    taxes : string;
    extraCharges : string;
    parkingPrice: string;
    totalPrice : string;
    
    constructor() {
        this.id = null;
        this.vehicle = null;
        this.origin = null;
        this.destination = null;
        this.serviceMode = null;
        this.people = null;
        this.taxes = null;
        this.extraCharges = null;
        this.parkingPrice = null;
        this.totalPrice = null;
    }

    setData(data){
        this.id = data.id;
        this.vehicle = data.vehicle.name;
        this.origin = data.origin;
        this.destination = data.destination;
        this.serviceMode = data.service.name;
        this.people = data.peopleNumber;
        this.taxes = data.excludeTaxes ? ViewDetailsRatesEnum.yes : ViewDetailsRatesEnum.no;
        this.extraCharges = data.extraChargesPrices ? ViewDetailsRatesEnum.yes: ViewDetailsRatesEnum.no;
        this.parkingPrice = data.price;
        this.totalPrice = this.parkingPrice;
    }
}