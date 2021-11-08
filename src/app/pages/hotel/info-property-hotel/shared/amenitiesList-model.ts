import { AmenitiesEnum } from "@hotel/amenities-hotel/shared/amenities-enum";
import { Utilities } from "@shared/utilities";
import { GenericFormModel } from "@shared/generic-form-model";

export class AmenitiesList implements GenericFormModel {
    id : number;
    description : string;
    items : Array <number>;

    constructor() {
        this.id = AmenitiesEnum.valueZero;
        this.description = '';
        this.items = [];
    }

    setData() {
    }
}
