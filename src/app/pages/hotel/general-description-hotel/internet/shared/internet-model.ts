import { GenericFormModel } from "@shared/generic-form-model";
import { InternetEnum } from "./internet-enum";

export class InternetModel implements GenericFormModel {
    id: number;
    hasInternet: string;
    internetConnectType: string;
    internetPlaces: string;
    internetPrice: string;
    payInternet: string;

    constructor() {
        this.id = null;
        this.hasInternet = null;
        this.internetConnectType = null;
        this.internetPlaces = null;
        this.internetPrice = null;
        this.payInternet = null;
    }

    setData(data: any): void {
    }
}