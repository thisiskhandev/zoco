import { ViewActivityInfoModel } from "../view-activity-info/shared/view-activity-info-model";
import { ViewSubActivityInfoModel, SubActivityRatesModel } from "../view-sub-activity-info/shared/view-sub-activity-info-model";
import { ViewGeneralInfoModel } from "../view-general-info/shared/view-general-info-model";
import { GenericModel } from "@shared/generic-model";
import { ViewDetailsActivityEnum } from "./view-details-activity-enum";
import { Utilities } from "@shared/utilities";


export class ViewDetaisActivityModel {
    nameActivity : string;
    viewActivityInfo : ViewActivityInfoModel;
    viewSubActivityInfoList : Array<ViewSubActivityInfoModel>;
    viewGeneralInfo : ViewGeneralInfoModel;

    constructor(){
        this.nameActivity = null;
        this.viewActivityInfo = new ViewActivityInfoModel();
        this.viewSubActivityInfoList = new Array<ViewSubActivityInfoModel>();
        this.viewGeneralInfo = new ViewGeneralInfoModel();
    }

    setData(data : any){
        if(data.activities) {
            if(data.activities.activityInfo) {
                this.nameActivity = data.activities.activityInfo.name;
                this.viewActivityInfo.activityId = data.activities.activityId;
                this.viewActivityInfo.duration = data.activities.activityInfo.duration + ViewDetailsActivityEnum.space + data.activities.activityInfo.timeOption.description;

                if(data.activities.activityInfo.highlightTypes) {
                    this.viewActivityInfo.highlights = this.concatString(data.activities.activityInfo.highlightTypes.length, data.activities.activityInfo.highlightTypes);
                }

                this.viewActivityInfo.schedule = data.activities.activityInfo.schedule.description;
            }
            if(data.activities.features) {
                this.viewActivityInfo.activityType = data.activities.features.type.description;
                this.viewActivityInfo.langs = this.concatString(data.activities.features.langs.length, data.activities.features.langs);

                if(data.activities.features.pickTo && data.activities.features.pickUp)
                    this.viewActivityInfo.pickUpHour = data.activities.features.pickUp + ViewDetailsActivityEnum.unionHour + data.activities.features.pickTo;
                else {
                    this.viewActivityInfo.pickUpHour = data.activities.features.pickUp ? data.activities.features.pickUp : data.activities.features.pickTo;
                }
                
                this.viewActivityInfo.pickUpLocation = data.activities.features.location.description;
            }
            this.fillSubActivityInfo(data);
            this.fillGeneralInfo(data);
        }
    }

    fillSubActivityInfo(data : any){
        if(data.activities.itinerary && data.activities.itinerary.subActivitiesList) {
            data.activities.itinerary.subActivitiesList.forEach(element => {
                const object = new ViewSubActivityInfoModel();
                object.id = element.id;
                object.name = element.subActivityName;
                object.date = element.date;
                object.startTime = element.startTime;
                object.endTime = element.endTime;
                object.details = element. details;

                if(element.ratesList) {
                    element.ratesList.forEach(item => {
                        const rate = new SubActivityRatesModel();
                        rate.id = item.id;
                        rate.name = item.nameSubActivity;
                        rate.personType = item.namePersonType;
                        rate.price = item.price;
                        object.rates.push(rate);
                    })
                }

                this.viewSubActivityInfoList.push(object); 
            })            
        }
    }

    fillGeneralInfo(data : any) {
        if(data.activities.generalDescription) {
            this.viewGeneralInfo.description = data.activities.generalDescription.description;
            this.viewGeneralInfo.tips = data.activities.generalDescription.tips;
        }
    }

    concatString(size : number, source : any ) {
        let destination = '';

        for(let i=0; i<size; i++){
            if(size > ViewDetailsActivityEnum.valueOne && i < size-ViewDetailsActivityEnum.valueOne)
                destination = destination + source[i].description + ViewDetailsActivityEnum.stringSeparator;
            else
                destination = destination + source[i].description;
        }
        return destination;
    }

}