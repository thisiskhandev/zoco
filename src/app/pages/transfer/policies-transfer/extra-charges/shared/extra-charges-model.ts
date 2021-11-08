import { Utilities } from "@shared/utilities";
import { GenericFormModel } from "@shared/generic-form-model";

export class ExtraChargesModel implements GenericFormModel {
    id : number;
    hasExtraCharges : string;
    extraCharges: Array<number>;

    constructor() {
        this.id = null;
        this.hasExtraCharges = Utilities.falseString;
        this.extraCharges = [];
    }

    setData() {}
}