import { Utilities } from "@shared/utilities";
import { GenericFormModel } from "@shared/generic-form-model";

export class ExcludeTaxesModel implements GenericFormModel {
    id : number;
    excludeTax : string = Utilities.falseString;
    typeTax: Array <number>;

    constructor() {
        this.id = null;
        this.excludeTax = Utilities.falseString;
        this.typeTax = [];
    }

    setData() {}
}
