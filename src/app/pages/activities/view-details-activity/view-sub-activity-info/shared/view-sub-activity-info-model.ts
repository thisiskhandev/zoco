export class ViewSubActivityInfoModel {
    id : number;
    name : string;
    date : string;
    startTime : string;
    endTime : string;
    details: string;
    rates: Array<SubActivityRatesModel>;

    constructor() {
        this.id = null;
        this.name = null;
        this.date = null;
        this.startTime = null;
        this.endTime = null;
        this.details = null;
        this.rates = [];
    }
}

export class SubActivityRatesModel {
    id : number;
    name : string;
    personType : string;
    price : number;

    constructor() {
        this.id = null;
        this.name = null;
        this.personType = null;
        this.price = null;
    }
}