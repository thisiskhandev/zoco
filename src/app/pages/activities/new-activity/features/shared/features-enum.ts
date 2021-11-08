import { GenericModel } from "@shared/generic-model";

export enum FeaturesEnum {
    inputMaxSize = 20,

    type = 'type',
    language = 'language',
    pickUp = 'pickUp',
    pickTo = 'pickTo',
    location = 'location',

    getItemsErrorMessage = 'There was an error trying to get type of activity',
}

export class DataFeaturesActivities {

    static locationArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'Guest Hotel', '' ),
        GenericModel.createGenericModel( 2, 'Activity Place', '' ),
    ];
    
}