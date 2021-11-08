import { GenericFormModel } from "@shared/generic-form-model";
import { ActivityInfoModel } from "../activity-info/shared/activity-info-model";
import { FeaturesModel } from "../features/shared/features-model";
import { GeneralDescriptionModel } from "../general-description/shared/general-description-model";
import { ItineraryModel } from "../itinerary/shared/itinerary-model";

export class NewActivityModel implements GenericFormModel {
    id : number;
    activityId : number;
    activityInfo : ActivityInfoModel;
    features : FeaturesModel;
    generalDescription : GeneralDescriptionModel;
    itinerary : ItineraryModel;

    constructor() {
        this.id = null;
        this.activityId = null;
        this.activityInfo = new ActivityInfoModel();
        this.features = new FeaturesModel();
        this.generalDescription = new GeneralDescriptionModel();
        this.itinerary = new ItineraryModel();
    }

    setData() {}
}