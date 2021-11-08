import { ExcludeTaxesModel } from "@commons/exclude-taxes/shared/exclude-taxes-model";
import { GenericFormModel } from "@shared/generic-form-model";

export class RatesActivitiesModel implements GenericFormModel {
    id : number;
    activityId : number;
    ratesList : Array <RatesActivitiesItemModel>;

    constructor() {
        this.id = null;
        this.activityId = null;
        this.ratesList = [];
    }

    setData() {}
}

export class RatesActivitiesItemModel {

    subActivityId : number;    
    nameSubActivity : string;
    idPersonType : number;
    namePersonType : string;
    price : number;
    excludeTaxes : ExcludeTaxesModel;

    constructor() {
        this.subActivityId = null;
        this.nameSubActivity = null;
        this.idPersonType = null;
        this.namePersonType = null;
        this.price = null;
        this.excludeTaxes = new ExcludeTaxesModel();
    }
}