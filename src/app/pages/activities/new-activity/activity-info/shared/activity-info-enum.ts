import { GenericModel } from "@shared/generic-model";

export enum ActivityInfoEnum {
    textMaxSize = 180,
    sizeVector = 14,

    name = 'name',
    duration = 'duration',
    timeOption = 'timeOption',
    destination = 'destination',
    schedule = 'schedule',
    highlightTypes = 'highlightTypes',

    valueOne = 1,

    getHighlightsTypesErrorMessage = 'There was an error trying to get Highlights types List',
    cityName = 'name',
    cityIataCode = 'iata_code',
}

export class DataActivityInfo {
    static timeOptionArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'Hours', '' ),
        GenericModel.createGenericModel( 2, 'Days', '' ),
    ];

    static typeScheduleArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'Day', '' ),
        GenericModel.createGenericModel( 2, 'Night', '' ),
        GenericModel.createGenericModel( 3, 'All Day', '' ),
    ];

    static highlightsArray: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'Transport included', '' ),
        GenericModel.createGenericModel( 2, 'Meals included', '' ),
    ];
}