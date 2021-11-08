import { GenericFormModel } from "@shared/generic-form-model";

export class AgeRangeModel implements GenericFormModel {
    id : number;
    infantAgeFrom : number;
    infantAgeUp : number;
    childrenAgeFrom : number;
    childrenAgeUp : number;
    adultAge : number;

    constructor() {
        this.id = null;
        this.infantAgeFrom = null;
        this.infantAgeUp = null;
        this.childrenAgeFrom = null;
        this.childrenAgeUp = null;
        this.adultAge = null;
    }

    setData() {}
}