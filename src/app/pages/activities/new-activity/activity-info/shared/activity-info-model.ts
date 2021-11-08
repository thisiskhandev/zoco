import { GenericFormModel } from "@shared/generic-form-model";

export class ActivityInfoModel implements GenericFormModel {
    id : number;
    name : string;
    duration : number;
    timeOption: string;
    destination : string;
    schedule : string;
    validFrom : string;
    validUntil : string;
    highlightTypes : Array<number>;

    constructor() {
        this.id = null;
        this.name = null;
        this.duration = null;
        this.timeOption = null;
        this.destination = null;
        this.schedule = null;
        this.validFrom = null;
        this.validUntil = null;
        this.highlightTypes = [];
    }

    setData() {}
}