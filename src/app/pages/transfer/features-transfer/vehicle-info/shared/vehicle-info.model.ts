import { GenericFormModel } from "@shared/generic-form-model";

export class VehicleInfoModel implements GenericFormModel {
    id: number;
    index: number;
    category:  number;
    categoryName: string;
    type:      number;
    typeDescription: string;
    brand:     string;
    modelType:     string;
    capacity:  number;
    quantity:  number;
    isPrivate: number;
    ownedBy:   number;
    ownedDescription : string;

    constructor(){
        this.id = null;
        this.index = null;
        this.category = null;
        this.categoryName = null;
        this.type = null;
        this.typeDescription = null;
        this.brand = null;
        this.modelType = null;
        this.capacity = null;
        this.quantity = null;
        this.isPrivate = null;
        this.ownedBy = null;
        this.ownedDescription = null;
    }

    setData() {
    }
}
