import { Utilities } from "@shared/utilities";
import { GenericFormModel } from "@shared/generic-form-model";

export class TaxesSetupModel implements GenericFormModel {
    id : number;
    vatTax : string;
    percentageVat : number;
    cityTax: string;
    amountCityTax : number;

    constructor(){
        this.id = null;
        this.vatTax = Utilities.falseString;
        this.percentageVat = null;
        this.cityTax = Utilities.falseString;
        this.amountCityTax = null;
    }

    setData() {}
}