import { GenericFormModel } from "@shared/generic-form-model";

export class ItineraryModel implements GenericFormModel {
    id : number;
    subActivitiesList: Array <SubActivityModel>;
    
    constructor() {
        this.id = null;
        this.subActivitiesList = [];
    }

    setData() {}
}

export class SubActivityModel {    
    subActivityName : string;
    date: string;
    startTime : string;
    endTime : string;
    details : string;

    constructor() {
        this.subActivityName = null;
        this.date = null;
        this.startTime = null;
        this.endTime = null;
        this.details = null;        
    }
}