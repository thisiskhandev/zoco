import { GenericModel } from "@shared/generic-model";
import { Utilities } from "@shared/utilities";

export class ViewActivityInfoModel {
    activityId : number;
    duration : string;
    activityType: string;
    highlights : string;
    langs: string;
    pickUpHour : string;   
    pickUpLocation: string;
    schedule: string;

    constructor() {
        this.activityId = null;
        this.duration = null;
        this.activityType = null;
        this.highlights = '';
        this.langs = '';
        this.pickUpHour = null;
        this.pickUpLocation = null;
        this.schedule = null;
    }

    setData(){}
}